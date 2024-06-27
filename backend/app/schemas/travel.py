from typing import TypedDict


class TravelCreateRequest(TypedDict):
    start_lon: float
    start_lat: float
    end_lon: float
    end_lat: float


class TravelCreateResponse(TypedDict):
    travel_id: int
