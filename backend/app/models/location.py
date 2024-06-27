from typing import List, TYPE_CHECKING

from sqlalchemy import Boolean, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base, db

if TYPE_CHECKING:
    from .travel import Travel
    from .hotel import Hotel


class Location(Base):
    __tablename__ = 'locations'

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    latitude: Mapped[float] = mapped_column(Float(), nullable=False)
    longitude: Mapped[float] = mapped_column(Float(), nullable=False)
    location_type: Mapped[str] = mapped_column(String(255), nullable=False)
    order_number: Mapped[int] = mapped_column(Integer(), nullable=False)

    travel: Mapped['Travel'] = relationship(back_populates='locations',
                                            lazy='selectin')
    travel_id: Mapped[int] = mapped_column(ForeignKey('travels.id'))

    is_hotels_listed: Mapped[bool] = mapped_column(Boolean(), nullable=False,
                                                   default=False)
    hotels: Mapped[List['Hotel']] = relationship(back_populates='location',
                                                 lazy='selectin')
    order_num: Mapped[int] = mapped_column(Integer(), nullable=False)


def delete_location(location_id):
    location_to_delete = db.Location.query.filter_by(id=location_id).first()
    deleted_order_num = location_to_delete.order_num
    db.session.delete(location_to_delete)
    for location in db.Location.query.filter_by(
            travel_id=location_to_delete.travel_id).all():
        if location.order_num > deleted_order_num:
            location.order_num -= 1
    db.session.commit()


def add_location(lat, long, loc_type, travel_id, order_num):
    location = db.Location(latitude=lat, longitude=long,
                           location_type=loc_type, travel_id=travel_id,
                           order_num=order_num)
    db.session.add(location)
    db.session.commit()


def push_up(location_id):
    end_location = db.Location.query.filter_by(id=location_id).first()
    location = db.Location.query.filter_by(id=location_id).first()
    if end_location.order_num - 1 > location.order_num:
        location.order_num += 1
        other_location = db.Location.query.filter_by(
            travel_id=location.travel_id,
            order_num=end_location.order_num).first()
        other_location.order_num -= 1
    db.session.commit()


def push_down(location_id):
    end_location = db.Location.query.filter_by(id=location_id).first()
    location = db.Location.query.filter_by(id=location_id).first()
    if end_location.order_num + 1 < location.order_num:
        location.order_num -= 1
        other_location = db.Location.query.filter_by(
            travel_id=location.travel_id,
            order_num=end_location.order_num).first()
        other_location.order_num += 1
    db.session.commit()
