from typing import List

from sqlalchemy import select

from app.database import db
from app.models.location import Location
from app.models.travel import Travel


def crud_create_location(latitude: float, longitude: float, location_type: str, order_number: int,
                         travel: Travel) -> Location:
    location = Location(latitude=latitude, longitude=longitude, location_type=location_type, order_number=order_number,
                        travel=travel)
    db.session.add(location)
    db.session.commit()
    db.session.refresh(location)
    return location


def crud_get_location_by_id(id: int) -> Location | None:
    stmt = select(Location).where(Location.id == id)
    location = db.session.scalar(stmt)
    return location


def crud_get_ordered_locations_by_travel(travel: Travel) -> List[Location]:
    stmt = select(Location).where(Location.travel_id == travel.id).order_by(Location.order_number)
    locations = db.session.scalars(stmt).all()
    return locations


def crud_get_first_location_by_travel(travel: Travel) -> Location | None:
    return crud_get_ordered_locations_by_travel(travel)[0]


def crud_get_last_location_by_travel(travel: Travel) -> Location | None:
    return crud_get_ordered_locations_by_travel(travel)[-1]
