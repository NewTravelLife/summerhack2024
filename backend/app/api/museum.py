from flask import Blueprint, current_app

from app.crud.google_down_maps import GoogleMaps
from app.crud.travel import crud_get_travel_by_id

api_museum = Blueprint('museum', __name__, url_prefix='/museum')


@api_museum.route('/get/<travel_id>', methods=['GET'])
def get_museums_along_route(travel_id):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(travel)
    museums = client.get_places_along_route(route, 'museum')
    if len(museums) < 1:
        return '', 404
    return {'museums': museums}, 200