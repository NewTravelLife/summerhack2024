import React from 'react';
import '../TravelDocuments.css';
import downloadIcon from '../assets/download.png';
import UploadButton from "./UploadButton.jsx";

const travelDocuments = [
    { name: 'Паспорт' },
    { name: 'Билеты' },
    { name: 'Виза' },
    // Добавьте другие документы по мере необходимости
];

const TravelDocuments = () => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ marginRight: '20px' }}>Документы для поездки</h1>
                <UploadButton uploadPath="api/travel/upload_file/1" />
            </div>
            {travelDocuments.length === 0 ? (
                <p>Документов пока нет</p>
            ) : (
                <ul className="document-list">
                    {travelDocuments.map((doc, index) => (
                        <li key={index} className="document-item">
                            <button className="download-button">
                                <img src={downloadIcon} alt="Download" />
                            </button>
                            <span className="document-number">{index + 1}</span>
                            <span className="document-name">{doc.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TravelDocuments;
