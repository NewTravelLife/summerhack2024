from typing import List, TYPE_CHECKING

from sqlalchemy import Integer
from sqlalchemy.orm import mapped_column, Mapped, relationship

from app.database import Base

if TYPE_CHECKING:
    from .location import Location


class Travel(Base):
    __tablename__ = 'travels'

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    locations: Mapped[List['Location']] = relationship(back_populates='travel', lazy='selectin')

def delete_location(location_id):
  location_to_delete = db.Location.query.filter_by(id=location_id).first()
  deleted_order_num = location_to_delete.order_num
  db.session.delete(location_to_delete)
  for location in db.Location.query.filter_by(travel_id=location_to_delete.travel_id).all():
      if location.order_num > deleted_order_num:
          location.order_num -= 1
  db.session.commit()


def add_location(lat, long, loc_type, travel_id, order_num):
  location = db.Location(latitude=lat, longitude=long, location_type=loc_type, travel_id=travel_id, order_num=order_num)
  db.session.add(location)
  db.session.commit()


def push_up(location_id):
  end_location = db.Location.query.filter_by(id=location_id).first()
  location = db.Location.query.filter_by(id=location_id).first()
  if end_location.order_num - 1 > location.order_num:
      location.order_num += 1
      other_location = db.Location.query.filter_by(travel_id=location.travel_id, order_num=end_location.order_num).first()
      other_location.order_num -= 1
  db.session.commit()


def push_down(location_id):
  end_location = db.Location.query.filter_by(id=location_id).first()
  location = db.Location.query.filter_by(id=location_id).first()
  if end_location.order_num + 1 < location.order_num:
      location.order_num -= 1
      other_location = db.Location.query.filter_by(travel_id=location.travel_id, order_num=end_location.order_num).first()
      other_location.order_num += 1
  db.session.commit()
