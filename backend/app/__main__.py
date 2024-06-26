import os

from app.database import db
from app.core import app
from app.api import blueprints

with app.app_context():
    db.create_all()

for blueprint in blueprints:
    app.register_blueprint(blueprint)

if __name__ == "__main__":
    app.run(os.getenv("HOST", "0.0.0.0"), int(os.getenv("PORT", 8888)))
