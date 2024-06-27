from flask import Blueprint

from app.crud.google_down_maps import GoogleMaps
from app.crud.location import crud_get_first_location_by_travel, crud_get_last_location_by_travel
from app.crud.travel import crud_get_travel_by_id

api_restaurant = Blueprint('restaurant', __name__, url_prefix='/restaurant')


@api_restaurant.route('/get/<travel_id>', methods=['GET'])
def get_restaurants_along_route(travel_id):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps()
    route = client.get_direction(travel)
    restaurants = client.get_places_along_route(route, ('cafe','restaurant'))
    if len(restaurants) < 1:
        return '', 404
    return {'restaurants': restaurants}, 200