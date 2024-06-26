from app.database import db


class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_location_id = db.Column(db.Integer, db.ForeignKey('location.id'),
                                  nullable=False)
    end_location_id = db.Column(db.Integer, db.ForeignKey('location.id'),
                                nullable=False)
