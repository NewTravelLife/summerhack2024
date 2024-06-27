from typing import List, TYPE_CHECKING, Tuple

from sqlalchemy import Boolean, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base, db

if TYPE_CHECKING:
    from .travel import Travel


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

    def to_tuple(self) -> Tuple[float, float]:
        return self.latitude, self.longitude
