import os

from app import app
from travel import travel
from models import *

with app.app_context():
    db.create_all()

app.register_blueprint(travel)


if __name__ == "__main__":
    app.run(os.getenv("HOST", "0.0.0.0"), int(os.getenv("PORT", 8888)))
