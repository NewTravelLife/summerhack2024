import {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TravelDocuments from "./TravelDocuments.jsx";
import MapComponent from "./map.jsx";
import PlacesModule from "./Places/PlacesModule.jsx";

const Travel = () => {
    const [route, setRoute] = useState([]);
    const {travel_id} = useParams();
    const [places, setPlaces] = useState({attraction: []});
    const [travelInfo, setTravelInfo] = useState();
    const fetch_data = (travel_id) => {
        fetch('/api/travel/get/' + travel_id)
            .then(response => response.json())
            .then(data => setTravelInfo(data));
    };


    const fetchRoute = useCallback(async () => {
        try {
            const response = await fetch(`/api/travel/route/${travel_id}`);
            const data = await response.json();
            setRoute(data.route);
            setPlaces(data.places); // Assuming 'Places' key is present in the response
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    }, [travel_id]);

    const updateRoute = useCallback(async (newRoute) => {
        try {
            const response = await fetch(`/api/travel/add_point/${travel_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({route: newRoute}),
            });
            const data = await response.json();
            setRoute(data.route);
            setPlaces(data.places); // Update Places if they are also returned
        } catch (error) {
            console.error('Error updating route:', error);
        }
    }, [travel_id]);

    useEffect(() => {
        fetchRoute();
    }, [fetchRoute]);

    fetch_data(travel_id);
    return (
        <div>
            <h1>Инфа по путешествию {travel_id}</h1>
            <TravelDocuments
                uploadPath={'/api/travel/upload_file/' + travel_id}
                fetchPath={'/api/travel/files/' + travel_id}
                basePath={'/api/travel/download_file/' + travel_id + '/'}
            />
            <PlacesModule travel_id={travel_id}></PlacesModule>
            <MapComponent route={route} updateRoute={updateRoute}
                          fetchRoute={fetchRoute}/>
        </div>
    );

}
export default Travel;