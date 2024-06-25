from flask import Blueprint, request, jsonify

from models import Travel

travel = Blueprint('travel', __name__, url_prefix='/travel')


@travel.route('/get/<travel_id>', methods=['GET'])
def get_travel(travel_id):
    if travel_id is None:
        return '', 400
    if not travel_id.isdigit():
        return '', 400
    travel = Travel.query.filter_by(id=int(travel_id)).first()
    if travel is None:
        return '', 404
    return travel.to_dict(), 200


@travel.route('/create', methods=['POST'])
def create_travel():
    data = request.get_json()
    if data is None:
        return '', 400
    travel = Travel.new_travel_from_dict(data)
    if travel is None:
        return '', 400
    return jsonify({'id': travel.id}), 200
