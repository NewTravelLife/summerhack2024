from flask import Blueprint, current_app

from app.crud.google_down_maps import GoogleMaps
from app.crud.travel import crud_get_travel_by_id

api_tourist_attraction = Blueprint('tourist_attraction', __name__, url_prefix='/tourist_attraction')


@api_tourist_attraction.route('/get/<travel_id>', methods=['GET'])
def get_tourist_attraction_along_route(travel_id):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(travel)
    tourist_attractions = client.get_places_along_route(route, 'tourist_attraction')
    if len(tourist_attractions) < 1:
        return '', 404
    return {'tourist_attractions': tourist_attractions}, 200