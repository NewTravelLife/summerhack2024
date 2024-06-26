from typing import TypedDict


class HotelResponseAPI(TypedDict):
    name: str
    latitude: float
    longitude: float
    hotel_id: int
