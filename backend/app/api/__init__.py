from .hotel import api_hotel
from .restaurant import api_restaurant
from .tourist_attraction import api_tourist_attraction
from .travel import api_travel
from .museum import api_museum

blueprints = [
    api_travel,
    api_hotel,
    api_museum,
    api_restaurant,
    api_tourist_attraction,
]