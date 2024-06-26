from pydantic_sqlalchemy import sqlalchemy_to_pydantic
from app.models.location import Location

LocationPydantic = sqlalchemy_to_pydantic(Location)