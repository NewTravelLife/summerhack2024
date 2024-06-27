from flask import Blueprint, current_app

from app.crud.google_down_maps import GoogleMaps
from app.crud.location import crud_get_first_location_by_travel, crud_get_last_location_by_travel
from app.crud.travel import crud_get_travel_by_id

api_tourist_attraction = Blueprint('tourist_attraction', __name__, url_prefix='/tourist_attraction')


@api_tourist_attraction.route('/get/<travel_id>', methods=['GET'])
def get_tourist_attraction_along_route(travel_id):
    travel = crud_get_travel_by_id(travel_id)
    start_location = crud_get_first_location_by_travel(travel)
    end_location = crud_get_last_location_by_travel(travel)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(start_location, end_location)
    tourist_attractions = client.get_places_along_route(route, 'tourist_attraction')
    if len(tourist_attractions) < 1:
        return '', 404
    return {'tourist_attractions': tourist_attractions}, 200