from typing import List

from sqlalchemy import select

from app.database import db
from app.models.travel import Travel
from app.models.location import Location


def crud_create_travel(locations: List[Location]) -> Travel:
    travel = Travel(locations=locations)
    db.session.add(travel)
    db.session.commit()
    db.session.refresh(travel)
    return travel


def crud_get_travel_by_id(id: int) -> Travel | None:
    stmt = select(Travel).where(Travel.id == id)
    travel = db.session.scalar(stmt)
    return travel

