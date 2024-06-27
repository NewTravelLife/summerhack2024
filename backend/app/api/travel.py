from flask import Blueprint, request, jsonify, current_app

from app.crud.location import crud_create_location
from app.crud.travel import crud_get_travel_by_id, crud_create_travel
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
    if data is None:
        return '', 400
    travel = crud_create_travel([])
    if travel is None:
        return '', 400
    crud_create_location(18.9406074, 49.718937, '1', 1, travel)
    crud_create_location(18.9651545, 47.4810949, '1', 2, travel)

    return jsonify({'id': travel.id}), 200

