import React, { useState, useEffect } from 'react';
import '../TravelDocuments.css';
import downloadIcon from '../assets/download.png';
import UploadButton from './UploadButton.jsx';

const TravelDocuments = () => {
    const [travelDocuments, setTravelDocuments] = useState([]);

    useEffect(() => {
        // Функция для загрузки данных с сервера
        const fetchTravelDocuments = async () => {
            try {
                const response = await fetch('http://127.0.0.1/files/1'); // Замените 1 на travel_id, если требуется
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                const data = await response.json();
                setTravelDocuments(data); // Установка полученных данных в состояние
            } catch (error) {
                console.error('Ошибка при загрузке документов:', error);
            }
        };

        fetchTravelDocuments(); // Вызов функции загрузки данных
    }, []); // Пустой массив зависимостей, чтобы выполнить useEffect только один раз

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
                            <span className="document-name">{doc}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TravelDocuments;
