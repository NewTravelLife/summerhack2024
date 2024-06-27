from typing import List

from flask import Blueprint, current_app
from flask import jsonify
from app.crud.hotel import crud_get_hotels_by_location, crud_is_hotels_listed_by_location, crud_list_hotels_by_location, \
    crud_set_hotels_listed_by_location
from app.crud.location import crud_get_location_by_id, crud_get_first_location_by_travel, \
    crud_get_last_location_by_travel
from app.crud.travel import crud_get_travel_by_id
from app.schemas.hotel import HotelResponse
from app.crud.google_down_maps import GoogleMaps

api_hotel = Blueprint('hotel', __name__, url_prefix='/hotel')


@api_hotel.route('/get/<location_id>', methods=['GET'])
def get_hotels_by_location_id(location_id):
    if location_id is None or not location_id.isdigit():
        return '', 400
    location = crud_get_location_by_id(location_id)
    if not location:
        return '', 400
    if not crud_is_hotels_listed_by_location(location):
        crud_list_hotels_by_location(location)
        crud_set_hotels_listed_by_location(location)
    hotels: List[HotelResponse] = [ {'name': model.name, 'latitude': model.latitude, 'longitude': model.longitude, 'hotel_id': model.hotel_id} for model in crud_get_hotels_by_location(location)]
    if len(hotels) < 1:
        return '', 404
    return {'hotels': hotels}, 200


@api_hotel.route('/get_along_route/<travel_id>', methods=['GET'])
def get_hotels_along_route(travel_id):
    travel = crud_get_travel_by_id(travel_id)
    start_location = crud_get_first_location_by_travel(travel)
    end_location = crud_get_last_location_by_travel(travel)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(start_location, end_location)
    hotels = client.get_places_along_route(route, 'lodging')
    if len(hotels) < 1:
        return '', 404
    return {'hotels': hotels}, 200


