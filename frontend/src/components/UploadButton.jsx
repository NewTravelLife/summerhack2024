import React, { useState } from 'react';

const UploadButton = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (onFileUpload) {
      onFileUpload(selectedFile);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <button 
        onClick={handleClick} className="nav-button"
      >
        Загрузить файл
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