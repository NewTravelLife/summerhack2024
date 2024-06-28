import React from 'react';
import acceptIcon from '../../assets/accept.png';

const Place = ({ travel_id, category, places_data, updateRoute }) => {
    if (!Array.isArray(places_data)) {
        return <h1>Загрузка мест...</h1>;
    }
    const placesCategoryRussian = {
        attraction: 'Достопримечательности',
        food: 'Кафе и рестораны',
        hotel: 'Жилье и отели',
        museum: 'Музеи',
    };

    const addLocation = async (lon, lat, location_type) => {
        const body = {
            lon: lon,
            lat: lat,
            location_type: location_type,
        };
        console.log(body);
        try {
            const response = await fetch('/api/travel/new_location/' + travel_id, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Location added successfully');
                updateRoute(); // обновить маршрут после успешного добавления
            } else {
                console.error('Failed to add location');
            }
        } catch (error) {
            console.error('Error adding location:', error);
        }
    };

    return (
        <div>
            <div className='attractions-container'>
                <h2>{placesCategoryRussian[category]}</h2>

                {places_data.map((place_data, index) => (
                    <div key={index} className='place_data-item'>
                        <div className='attractions-content'>
                            <h3>{place_data.name}</h3>
                            <p>{place_data.rating} ★</p>
                            <p>
                                <strong>Адрес:</strong> {place_data.address}
                            </p>
                        </div>
                        <div className='button-container'>
                            <button
                                className='action-button'
                                onClick={() =>
                                    addLocation(
                                        place_data.location.lng,
                                        place_data.location.lat,
                                        category
                                    )
                                }
                            >
                                <img src={acceptIcon} alt='Accept' className='button-icon' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Place;