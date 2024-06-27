from typing import List, TYPE_CHECKING

from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from .location import Location
    from .file import File


class Travel(Base):
    __tablename__ = 'travels'

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    locations: Mapped[List['Location']] = relationship(back_populates='travel',
                                                       lazy='selectin')
    files: Mapped[List['File']] = relationship(back_populates='travel',
                                                       lazy='selectin')
