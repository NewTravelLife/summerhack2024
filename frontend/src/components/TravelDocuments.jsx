import { useEffect, useState } from 'react';
import '../TravelDocuments.css';
import '../App.css';
import '../index.css';
import downloadIcon from '../assets/download.png';
import UploadButton from './UploadButton.jsx';
import '../TravelDocuments.css';

const TravelDocuments = ({ uploadPath, fetchPath, basePath }) => {
    const [travelDocuments, setTravelDocuments] = useState([]);

    const fetchTravelDocuments = async () => {
        try {
            const response = await fetch(fetchPath); // Replace 1 with travel_id if needed
            if (!response.ok) {
                throw new Error('Error loading data');
            }
            const data = await response.json();
            setTravelDocuments(data); // Set received data to state
        } catch (error) {
            console.error('Error loading documents:', error);
        }
    };

    useEffect(() => {
        fetchTravelDocuments(); // Call data fetch function
    }, []); // Empty dependency array to execute useEffect only once

    return (
        <div>
            <div className='booxxx'>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1>Travel Documents</h1>
                    <UploadButton uploadPath={uploadPath} onUploadSuccess={fetchTravelDocuments} />
                </div>

                {travelDocuments.length === 0 ? (
                    <p>No documents yet</p>
                ) : (
                    <ul className="document-list">
                        {travelDocuments.map((doc, index) => (
                            <li key={index} className="document-item">
                                <a className="download-button" href={
                                    basePath + doc
                                } target="_blank" rel="noopener noreferrer">
                                    <img src={downloadIcon} alt="Download" />
                                </a>
                                <span className="document-number">{index + 1}</span>
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
