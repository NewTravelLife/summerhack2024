
from app.database import db
from app.models.location import Location


def crud_create_location(latitude: float, longitude: float, location_type: str, order_number: int) -> Location:
    location = Location(latitude=latitude, longitude=longitude, location_type=location_type, order_number=order_number)
    db.session.add(location)
    db.session.commit()
    db.session.refresh(location)
    return location
