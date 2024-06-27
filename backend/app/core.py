import os

from flask import Flask

app = Flask(__name__)
app.config[
    'SQLALCHEMY_DATABASE_URI'] = f'postgresql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}'
app.config['GOOGLE_MAPS_API_KEY'] = os.getenv("GOOGLE_MAPS_API_KEY")
app.config['HL_TOKEN'] = os.getenv('HL_TOKEN')
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER')
