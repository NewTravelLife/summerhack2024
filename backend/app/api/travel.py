from typing import cast

from flask import Blueprint, request, jsonify, current_app

from app.crud.location import crud_create_location
from app.crud.travel import crud_get_travel_by_id, crud_create_travel
from app.schemas.travel import TravelCreateRequest, TravelCreateResponse
from app.services.gm.googlemaps import GoogleMaps

api_travel = Blueprint('travel', __name__, url_prefix='/travel')


@api_travel.route('/test/<travel_id>', methods=['GET'])
def get_along_route(travel_id: int):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(travel)
    items = client.get_places_along_route(route)
    if len(items) < 1:
        return '', 404
    return {'items': items, 'route': route}, 200


@api_travel.route('/get/<travel_id>', methods=['GET'])
def get_travel(travel_id):
    if travel_id is None:
        return '', 400
    if not travel_id.isdigit():
        return '', 400
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 404
    return travel.id, 200


@api_travel.route('/create', methods=['POST'])
def create_travel():
    data = request.get_json()
    if data is None or not isinstance(data, TravelCreateRequest):
        return '', 400
    data = cast(TravelCreateRequest, data)
    travel = crud_create_travel([])
    crud_create_location(data['start_lat'], data['start_lon'], 'start', 1, travel)
    crud_create_location(data['end_lat'], data['end_lon'], 'end', 2, travel)
    response: TravelCreateResponse = {'travel_id': int(travel.id)}
    return jsonify(response), 200

