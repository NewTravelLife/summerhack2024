import os
from google.cloud import storage


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/service-account-file.json'


class ProjectDisk():
    def __init__(self):
        self.client = storage.Client()
        self.bucket_name = 'new_travel_life'
        self.bucket = self.client.get_bucket(self.bucket_name)

    def upload_to_bucket(self, blob_name, file_path):
        blob = self.bucket.blob(blob_name)
        blob.upload_from_filename(file_path)
        print(f"File {file_path} uploaded to {blob_name}.")

    def download_from_bucket(self, blob_name, file_path):
        blob = self.bucket.blob(blob_name)
        blob.download_to_filename(file_path)
        print(f"File {blob_name} downloaded to {file_path}.")


Disk = ProjectDisk()
Disk.upload_to_bucket('test.txt', 'app/services/local_path_to_save_file.txt')


