from typing import TYPE_CHECKING

from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from app.database import Base

if TYPE_CHECKING:
    from .travel import Travel


class File(Base):
    __tablename__ = 'files'

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    disk_name: Mapped[str] = mapped_column(String(255), nullable=False)
    original_name: Mapped[str] = mapped_column(String(255), nullable=False)

    travel_id: Mapped[int] = mapped_column(ForeignKey('travels.id'))
    travel: Mapped['Travel'] = relationship(back_populates='files', lazy='selectin')
