from app.database import db


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'latitude': self.latitude,
            'longitude': self.longitude
        }
