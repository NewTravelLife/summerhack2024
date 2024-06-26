from flask import Blueprint, request, jsonify

from app.crud.travel import crud_get_travel_by_id, crud_create_travel

api_travel = Blueprint('travel', __name__, url_prefix='/travel')


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
    return jsonify({'id': travel.id}), 200
