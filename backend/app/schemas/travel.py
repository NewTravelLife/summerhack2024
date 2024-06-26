from pydantic_sqlalchemy import sqlalchemy_to_pydantic
from app.models.travel import Travel

TravelPydantic = sqlalchemy_to_pydantic(Travel)
