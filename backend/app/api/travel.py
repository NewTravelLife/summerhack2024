import os
import uuid

from flask import Blueprint, current_app, jsonify, request

from app.core import app
from app.crud.location import crud_get_location_by_id
from app.crud.travel import crud_create_travel, crud_get_travel_by_id
from app.crud.file import crud_create_file, \
    crud_get_file_by_original_name_and_travel_id, crud_get_file_by_travel_id
from app.database import db
from app.services.disk import ProjectDisk

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
    path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(path)
    project_disk = ProjectDisk()
    disk_name = str(uuid.uuid4())
    project_disk.upload_to_bucket(disk_name, path)
    os.remove(path)
    crud_create_file(disk_name, file.filename, travel)
    return '', 200


@api_travel.route('/files/<travel_id>', methods=['GET'])
def get_files(travel_id):
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
def download_file(travel_id, original_name):
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
    project_disk.download_from_bucket(file.disk_name, os.path.join(
        current_app.config['UPLOAD_FOLDER'], file.disk_name))
    return '', 200


@api_travel.route('/set_locations/<travel_id>', methods=['DELETE'])
def set_locations(travel_id):
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
