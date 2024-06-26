from sqlalchemy import select
from typing import List

from app.models import Location
from app.models.hotel import Hotel
from app.database import db
from app.services.hl.service import get_hotels_from_hotellook


def crud_create_hotel(name: str, latitude: float, longitude: float, hotel_id: int, location: Location) -> Hotel:
    hotel = Hotel(name=name, latitude=latitude, longitude=longitude, hotel_id=hotel_id, location=location)
    db.session.add(hotel)
    db.session.commit()
    db.session.refresh(hotel)
    return hotel


def crud_set_hotels_listed_by_location(location: Location) -> None:
    db.session.refresh(location)
    location.is_hotels_listed = True
    db.session.commit()


def crud_is_hotels_listed_by_location(location: Location) -> bool:
    return location.is_hotels_listed


def crud_get_hotels_by_location(location: Location) -> List[Hotel]:
    stmt = select(Hotel).where(Hotel.location_id == location.id)
    hotels = db.session.scalars(stmt).all()
    return hotels


def crud_list_hotels_by_location(location: Location) -> None:
    hotels = get_hotels_from_hotellook(location.latitude, location.longitude)
    for hotel in hotels:
        crud_create_hotel(hotel['name'], hotel['latitude'], hotel['longitude'], hotel['hotel_id'], location)