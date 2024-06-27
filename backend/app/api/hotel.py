from typing import List
from flask import Blueprint, current_app, jsonify
from app.crud.hotel import crud_get_hotels_by_location, \
    crud_is_hotels_listed_by_location, crud_list_hotels_by_location, \
    crud_set_hotels_listed_by_location
from app.schemas.hotel import HotelResponse

from app.crud.location import crud_get_location_by_id
from app.crud.travel import crud_get_travel_by_id
from app.crud.google_down_maps import GoogleMaps

api_hotel = Blueprint('hotel', __name__, url_prefix='/hotel')


@api_hotel.route('/get_along_route/<travel_id>', methods=['GET'])
def get_hotels_along_route(travel_id):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(travel)
    hotels = client.get_places_along_route(route, 'lodging')
    if len(hotels) < 1:
        return '', 404
    return {'hotels': hotels}, 200
