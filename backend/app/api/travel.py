import os
import uuid
from typing import cast

from flask import Blueprint, current_app, jsonify, request, send_file

from app.crud.file import crud_create_file, \
    crud_get_file_by_original_name_and_travel_id, crud_get_file_by_travel_id
from app.crud.location import crud_create_location, crud_get_location_by_id
from app.crud.travel import crud_create_travel, crud_get_travel_by_id
from app.database import db
from app.schemas.travel import TravelCreateRequest, TravelCreateResponse, \
    TravelGetLocationsResponse, TravelGetRouteWithPlaces, TravelLocation
from app.services.disk import ProjectDisk
from app.services.gm.googlemaps import GoogleMaps

api_travel = Blueprint('travel', __name__, url_prefix='/travel')


@api_travel.route('/locations/<travel_id>', methods=['GET'])
def get_locations(travel_id: int):
    if travel_id is None:
        return '', 400
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 404
    response: TravelGetLocationsResponse = TravelGetLocationsResponse(
        locations=[])
    for location in travel.locations:
        response['locations'].append(
            TravelLocation(id=int(location.id), latitude=location.latitude,
                           longitude=location.longitude,
                           location_type=location.location_type,
                           order_number=location.order_number))
    return jsonify(response), 200


@api_travel.route('/route/<travel_id>', methods=['GET'])
def get_route_with_places(travel_id: int):
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 400
    client = GoogleMaps(current_app.config['GOOGLE_MAPS_API_KEY'])
    route = client.get_direction(travel)
    places = client.get_places_along_route(route)
    if len(places) < 1:
        return '', 404
    response: TravelGetRouteWithPlaces = TravelGetRouteWithPlaces(
        places=places, route=route)
    return jsonify(response), 200


@api_travel.route('/', methods=['POST'])
def create_travel():
    data = request.get_json()
    if data is None:
        return '', 400
    data = cast(TravelCreateRequest, data)
    travel = crud_create_travel([])
    crud_create_location(data['start_lat'], data['start_lon'], 'start', 0,
                         travel)
    crud_create_location(data['end_lat'], data['end_lon'], 'end', 1, travel)
    response: TravelCreateResponse = TravelCreateResponse(
        travel_id=int(travel.id))
    return jsonify(response), 200


@api_travel.route('/upload_file/<travel_id>', methods=['POST'])
def upload_file(travel_id):
    if travel_id is None:
        return '', 400
    if not travel_id.isdigit():
        return '', 400
    travel = crud_get_travel_by_id(travel_id)
    if travel is None:
        return '', 404
    file = request.files['file']
    if file is None:
        return '', 400
    path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
    file.save(path)
    project_disk = ProjectDisk()
    disk_name = str(uuid.uuid4())
    project_disk.upload_to_bucket(disk_name, path)
    os.remove(path)
    crud_create_file(disk_name, file.filename, travel)
    return '', 200


@api_travel.route('/files/<travel_id>', methods=['GET'])
def get_files(travel_id: int):
    if travel_id is None:
        return '', 400
    if not travel_id.isdigit():
        return '', 400
    files = crud_get_file_by_travel_id(travel_id)
    original_files = [file.original_name for file in files]
    if files is None:
        return '', 404
    return jsonify(original_files), 200


@api_travel.route('/download_file/<travel_id>/<original_name>',
                  methods=['GET'])
def download_file(travel_id: int, original_name: str):
    if travel_id is None:
        return '', 400
    if not travel_id.isdigit():
        return '', 400
    if original_name is None:
        return '', 400
    project_disk = ProjectDisk()
    file = crud_get_file_by_original_name_and_travel_id(original_name,
                                                        travel_id)
    if file is None:
        return '', 404
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.original_name)
    project_disk.download_from_bucket(file.disk_name, file_path)
    return send_file(str(file_path)), 200


@api_travel.route('/set_locations/<travel_id>', methods=['DELETE'])
def set_locations(travel_id: int):
    if travel_id is None:
        return '', 400
    if not travel_id.isdigit():
        return '', 400
    data = request.get_json()
    if data is None:
        return '', 400
    for set_location in data['locations']:
        location = crud_get_location_by_id(set_location['id'])
        location.order_number = set_location['order_number']
    db.session.commit()
    return '', 200
