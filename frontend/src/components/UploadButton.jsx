import React, { useState } from 'react';
import axios from 'axios';

const UploadButton = ({ uploadPath }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const uploadUrl = `${window.location.origin}/${uploadPath}`;

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="nav-button"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Загрузить файл'}
      </button>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadButton;
