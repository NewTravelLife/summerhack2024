from app.database import db


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    location_type = db.Column(db.String(255), nullable=False)
    order_num = db.Column(db.Integer, nullable=False)
