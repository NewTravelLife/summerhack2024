from typing import Dict

import requests

from app.core import app


def request_hotels_from_hotellook(latitude: float, longitude: float) -> Dict | None:
    url = f'https://engine.hotellook.com/api/v2/lookup.json'
    params = {
        'query': f'{latitude},{longitude}',
        'lang': 'ru',
        'lookFor': 'hotel',
        'limit': '10',
        'token': app.config["HL_TOKEN"],
    }
    response = requests.get(url, params=params)
    if not response.ok:
        return None
    return response.json()


