import React, { useCallback, useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import TravelDocuments from "./TravelDocuments.jsx";
import MapComponent from "./map.jsx";
import PlacesModule from "./Places/PlacesModule.jsx";
import Place from './Places/Place.jsx'; // добавляем этот импорт

const Travel = () => {
    const [route, setRoute] = useState([]);
    const { travel_id } = useParams();
    const [places, setPlaces] = useState({ attraction: [] });
    const [travelInfo, setTravelInfo] = useState(null);

    const fetch_data = useCallback(async (travel_id) => {
        try {
            const response = await fetch('/api/travel/route/' + travel_id);
            const data = await response.json();
            setTravelInfo(data);
        } catch (error) {
            console.error('Error fetching travel info:', error);
        }
    }, []);

    const updateRoute = useCallback(async () => {
        try {
            const response = await fetch(`/api/travel/route/${travel_id}`);
            const data = await response.json();
            console.log('Updated route:', data.route);
            setRoute(data.route);
            setPlaces(data.places); // Assuming 'Places' key is present in the response
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    }, [travel_id]);

    const fetchRoute = useCallback(async () => {
        try {
            const response = await fetch(`/api/travel/route/${travel_id}`);
            const data = await response.json();
            console.log('Fetched route:', data.route);
            setRoute(data.route);
            setPlaces(data.places); // Update Places if they are also returned
        } catch (error) {
            console.error('Error updating route:', error);
        }
    }, [travel_id]);

    useEffect(() => {
        fetch_data(travel_id);
        fetchRoute();
    }, [fetch_data, fetchRoute, travel_id]);

    return (
        <div>
            <h1>Инфа по путешествию {travel_id}</h1>
            {travelInfo && (
                <>
                    <TravelDocuments
                        uploadPath={'/api/travel/upload_file/' + travel_id}
                        fetchPath={'/api/travel/files/' + travel_id}
                        basePath={'/api/travel/download_file/' + travel_id + '/'}
                    />
                    <PlacesModule travel_id={travel_id} />
                    <Place travel_id={travel_id} category="attraction" places_data={places.attraction} updateRoute={updateRoute} />
                    <MapComponent
                        route={route}
                        updateRoute={updateRoute}
                        fetchRoute={fetchRoute}
                    />
                </>
            )}
        </div>
    );
}
export default Travel;