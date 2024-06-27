from typing import TypedDict, List


class TravelCreateRequest(TypedDict):
    start_lon: float
    start_lat: float
    end_lon: float
    end_lat: float


class TravelCreateResponse(TypedDict):
    travel_id: int


class TravelLocation(TypedDict):
    id: int
    latitude: float
    longitude: float
    location_type: str
    order_number: int


class TravelGetLocationsResponse(TypedDict):
    locations: List[TravelLocation]


class TravelRoutePoint:
    lat: float
    lot: float


class TravelPlace:
    address: str
    location: TravelRoutePoint
    name: str
    rating: float
    user_ratings_total: int


class TravelGetRouteWithPlaces(TypedDict):
    places: List[TravelPlace]
    route: List[TravelRoutePoint]
