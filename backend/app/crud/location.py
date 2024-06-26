from app.database import db
from app.models.location import Location


def new_location_from_dict(data) -> Location | None:
    if type(data) is not dict:
        return None
    if 'latitude' not in data or 'longitude' not in data:
        return None
    if data['latitude'] is None or data['longitude'] is None:
        return None
    location = Location(latitude=data['latitude'],
                        longitude=data['longitude'])
    db.session.add(location)
    db.session.commit()
    return location
