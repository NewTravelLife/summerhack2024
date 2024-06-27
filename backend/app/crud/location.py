from sqlalchemy import select

from app.database import db
from app.models.location import Location
from app.models.travel import Travel


def crud_create_location(latitude: float, longitude: float, location_type: str, order_number: int, travel: Travel) -> Location:
    location = Location(latitude=latitude, longitude=longitude, location_type=location_type, order_number=order_number,
                        is_hotels_listed=False, hotels=[], travel=travel)
    db.session.add(location)
    db.session.commit()
    db.session.refresh(location)
    return location


def crud_get_location_by_id(id: int) -> Location | None:
    stmt = select(Location).where(Location.id == id)
    location = db.session.scalar(stmt)
    return location
