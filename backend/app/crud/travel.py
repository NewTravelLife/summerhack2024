from app.models.travel import Travel
from app.models.location import Location
from app.database import db


def new_travel_from_dict(data) -> Travel | None:
    if 'start_location' not in data or 'end_location' not in data:
        return None
    start_location = Location.new_location_from_dict(data['start_location'])
    end_location = Location.new_location_from_dict(data['end_location'])
    if start_location is None or end_location is None:
        return None
    travel = Travel(start_location_id=start_location.id,
                    end_location_id=end_location.id)
    db.session.add(travel)
    db.session.commit()
    return travel
