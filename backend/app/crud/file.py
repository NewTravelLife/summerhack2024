from sqlalchemy import select, and_

from app.database import db
from app.models import File, Travel


def crud_create_file(disk_name: str, original_name: str, travel: Travel) -> File:
    file = File(disk_name=disk_name, original_name=original_name, travel=travel)
    db.session.add(file)
    db.session.commit()
    db.session.refresh(file)
    return file


def crud_get_file_by_id(id: int) -> File | None:
    stmt = select(File).where(File.id == id)
    file = db.session.execute(stmt)
    return file


def crud_get_file_by_travel_id(travel_id: int) -> File | None:
    stmt = select(File).where(File.travel_id == travel_id)
    file = db.session.execute(stmt).all()
    return file


def crud_get_file_by_original_name_and_travel_id(original_name: int, travel_id: int) -> File | None:
    stmt = select(File).where(and_(File.original_name == original_name, File.travel_id == travel_id))
    file = db.session.execute(stmt)
    return file


def crud_get_file_by_disk_name(disk_name: int) -> File | None:
    stmt = select(File).where(File.disk_name == disk_name)
    file = db.session.execute(stmt)
    return file
