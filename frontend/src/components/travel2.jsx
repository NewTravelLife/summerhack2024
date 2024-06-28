import {useCallback, useEffect, useState} from 'react';
import TravelDocuments from "./TravelDocuments.jsx";
import MapComponent from "./map.jsx";
import PlacesModule from "./Places/PlacesModule.jsx";

const Travel2 = ({travel_id}) => {
    const [route, setRoute] = useState([]);
    const [places, setPlaces] = useState({attraction: []});

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

    return (
        <div>
            <h1>Инфа по путешествию {travel_id}</h1>
            <TravelDocuments
                uploadPath={`/api/travel/upload_file/${travel_id}`}
                fetchPath={`/api/travel/files/${travel_id}`}
                basePath={`/api/travel/download_file/${travel_id}/`}
            />
            <PlacesModule travel_id={travel_id} places={places}
                          fetchRoute={fetchRoute}/>
            <MapComponent route={route} updateRoute={updateRoute}
                          fetchRoute={fetchRoute}/>
        </div>
    );
}

export default Travel2;
