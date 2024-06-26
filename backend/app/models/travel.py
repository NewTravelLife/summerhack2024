from app.database import db
from app.models.location import Location


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
