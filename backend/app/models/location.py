from timezonefinder import TimezoneFinder

from app.database import db


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    location_type = db.Column(db.String(255), nullable=False)
    order_num = db.Column(db.Integer, nullable=False)
    timezone = db.Column(db.String(255), nullable=False)

    def __init__(self, latitude, longitude, location_type, order_num):
        self.latitude = latitude
        self.longitude = longitude
        self.location_type = location_type
        self.order_num = order_num
        self.timezone = TimezoneFinder().timezone_at(lng=longitude,
                                                     lat=latitude)
