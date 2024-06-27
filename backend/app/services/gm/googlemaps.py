import math
from typing import TypedDict

import googlemaps

from app.crud.location import crud_get_first_location_by_travel, crud_get_ordered_locations_by_travel, \
    crud_get_last_location_by_travel
from app.models.travel import Travel


class GoogleMaps:
    INTERSTED_TYPES = (
        'museum',
        'cafe',
        'restaurant',
        'tourist_attraction',
        'lodging'
    )
    INTERSTED_TYPES_NAMES = {
        'museum': 'museum',
        'cafe': 'food',
        'restaurant': 'food',
        'tourist_attraction': 'attraction',
        'lodging': 'hotel',
    }

    def __init__(self, api_key: str):
        self.gmaps = googlemaps.Client(key=api_key)

    def find_nearest(self, latitude, longitude, my_type, radius=1000):
        places_result = self.gmaps.places_nearby(
            location=(latitude, longitude),
            radius=radius, type=my_type),
        places = []
        if 'results' in places_result:
            for place in places_result['results']:
                place_info = {
                    'name': place.get('name'),
                    'address': place.get('vicinity'),
                    'rating': place.get('rating'),
                    'user_ratings_total': place.get('user_ratings_total'),
                    'location': place.get('geometry', {}).get('location'),
                }
                places.append(place_info)

        return places

    def get_direction(self, travel: Travel):
        start_point = crud_get_first_location_by_travel(travel).to_tuple()
        end_point = crud_get_last_location_by_travel(travel).to_tuple()
        locations = [location.to_tuple() for location in
                     crud_get_ordered_locations_by_travel(travel)[1:-1]]
        directions = self.gmaps.directions(start_point, end_point, locations)
        route_coords = []
        for step in directions[0]['legs'][0]['steps']:
            polyline = step['polyline']['points']
            coords = googlemaps.convert.decode_polyline(polyline)
            route_coords.extend(coords)
        return route_coords

    @staticmethod
    def distance(lat1, lon1, lat2, lon2):
        R = 6371.0
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)

        dlon = lon2_rad - lon1_rad
        dlat = lat2_rad - lat1_rad

        a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(
            lat2_rad) * math.sin(dlon / 2) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def get_places_along_route(self, route_coords, search_radius=1000,
                               step_distance=1000):
        d = {}
        for my_type in self.INTERSTED_TYPES:
            places = []
            prev_coords = None
            for coords in route_coords:
                if prev_coords is not None:
                    dist = self.distance(prev_coords['lat'],
                                         prev_coords['lng'],
                                         coords['lat'], coords['lng'])
                    if dist >= step_distance:
                        places.extend(
                            self.find_nearest(coords['lat'],
                                              coords['lng'],
                                              my_type,
                                              search_radius))
                        prev_coords = coords
                else:
                    prev_coords = coords
            if not places and route_coords:
                places.extend(self.find_nearest(route_coords[-1]['lat'],
                                                route_coords[-1]['lng'],
                                                my_type,
                                                search_radius))
            my_type_name = self.INTERSTED_TYPES_NAMES[my_type]
            if my_type_name not in d:
                d[my_type_name] = []
            d[my_type_name].extend(places)
        return d
