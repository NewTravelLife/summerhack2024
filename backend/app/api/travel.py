from typing import cast

from flask import Blueprint, request, jsonify, current_app

from app.crud.location import crud_create_location, crud_get_location_by_id
from app.crud.travel import crud_get_travel_by_id, crud_create_travel
from app.schemas.travel import TravelCreateRequest, TravelCreateResponse, TravelGetLocationsResponse, TravelLocation, \
    TravelGetRouteWithPlaces
from app.services.gm.googlemaps import GoogleMaps

api_travel = Blueprint('travel', __name__, url_prefix='/travel')


@api_travel.route('/locations/<travel_id>', methods=['GET'])
def get_locations(travel_id: int):
    if travel_id is None:
        return '', 400
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 404
    response: TravelGetLocationsResponse = TravelGetLocationsResponse(locations=[])
    for location in travel.locations:
        response['locations'].append(TravelLocation(id=int(location.id), latitude=location.latitude,
            longitude=location.longitude, location_type=location.location_type, order_number=location.order_number))
    return jsonify(response), 200


@api_travel.route('/route/<travel_id>', methods=['GET'])
def get_route_with_places(travel_id: int):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(travel)
    places = client.get_places_along_route(route)
    if len(places) < 1:
        return '', 404
    response: TravelGetRouteWithPlaces = TravelGetRouteWithPlaces(places=places, route=route)
    return jsonify(response), 200


@api_travel.route('/', methods=['POST'])
def create_travel():
    data = request.get_json()
    if data is None:
        return '', 400
    data = cast(TravelCreateRequest, data)
    travel = crud_create_travel([])
    crud_create_location(data['start_lat'], data['start_lon'], 'start', 0, travel)
    crud_create_location(data['end_lat'], data['end_lon'], 'end', 1, travel)
    response: TravelCreateResponse = TravelCreateResponse(travel_id=int(travel.id))
    return jsonify(response), 200

