from sqlalchemy import Integer, String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import TYPE_CHECKING

from app.database import Base

if TYPE_CHECKING:
    from .location import Location


class Hotel(Base):
    __tablename__ = 'hotels'

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    latitude: Mapped[float] = mapped_column(Float(), nullable=False)
    longitude: Mapped[float] = mapped_column(Float(), nullable=False)
    hotel_id: Mapped[int] = mapped_column(Integer(), nullable=False)

    location: Mapped['Location'] = relationship(back_populates='hotels', lazy='selectin')
    location_id: Mapped[int] = mapped_column(ForeignKey('locations.id'))
