import {useEffect, useState} from 'react';
import '../TravelDocuments.css';
import '../App.css';
import '../index.css';
import downloadIcon from '../assets/download.png';
import UploadButton from './UploadButton.jsx';

const TravelDocuments = ({uploadPath, fetchPath, basePath}) => {
    const [travelDocuments, setTravelDocuments] = useState([]);

    useEffect(() => {
        // Функция для загрузки данных с сервера
        const fetchTravelDocuments = async () => {
            try {
                const response = await fetch(fetchPath); // Замените 1 на travel_id, если требуется
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
            <div className='booxxx'>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h1 style={{marginRight: '20px'}}>Документы для поездки</h1>
                <UploadButton uploadPath={uploadPath}/>
            </div>
            
            {travelDocuments.length === 0 ? (
                <p>Документов пока нет</p>
            ) : (
                <ul className="document-list">
                    {travelDocuments.map((doc, index) => (
                        <li key={index} className="document-item">
                            <a className="download-button" href={
                                basePath + doc
                            } target="_blank">
                                <img src={downloadIcon} alt="Download"/>
                            </a>
                            <span
                                className="document-number">{index + 1}</span>
                            <span className="document-name">{doc}</span>
                        </li>
                        
                    ))}
                </ul>
               
            )}
            </div>
        </div>
    );
};

export default TravelDocuments;
