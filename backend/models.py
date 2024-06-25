from app import db


class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_location_id = db.Column(db.Integer, db.ForeignKey('location.id'),
                                  nullable=False)
    end_location_id = db.Column(db.Integer, db.ForeignKey('location.id'),
                                nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'start_location': db.session.query(Location).filter_by(
                id=self.start_location_id).first().to_dict(),
            'end_location': db.session.query(Location).filter_by(
                id=self.end_location_id).first().to_dict()
        }

    @staticmethod
    def new_travel_from_dict(data):
        if 'start_location' not in data or 'end_location' not in data:
            return None
        start_location = Location.new_location_from_dict(
            data['start_location'])
        end_location = Location.new_location_from_dict(data['end_location'])
        if start_location is None or end_location is None:
            return None
        travel = Travel(start_location_id=start_location.id,
                        end_location_id=end_location.id)
        db.session.add(travel)
        db.session.commit()
        return travel


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

    @staticmethod
    def new_location_from_dict(data):
        if type(data) is not dict:
            return None
        if 'latitude' not in data or 'longitude' not in data:
            return None
        if data['latitude'] is None or data['longitude'] is None:
            return None
        location = Location(latitude=data['latitude'],
                            longitude=data['longitude'])
        db.session.add(location)
        db.session.commit()
        return location
