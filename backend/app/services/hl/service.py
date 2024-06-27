from typing import Dict, List

from app.schemas.hotel import HotelResponseAPI
from app.services.hl.api import request_hotels_from_hotellook


def get_hotels_from_hotellook(latitude: float, longitude: float) -> List[HotelResponseAPI]:
    hotels_dict: Dict = request_hotels_from_hotellook(latitude, longitude)
    hotels: List[HotelResponseAPI] = []
    for hotel_json in hotels_dict['results']['hotels']:
        if hotel_json['name']:
            hotels.append({
                'name': hotel_json['name'],
                'latitude': hotel_json['location']['lat'],
                'longitude': hotel_json['location']['lon'],
                'hotel_id': hotel_json['id'],
            })
    return hotels
