import React, {useCallback, useEffect, useState} from 'react';
import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    LoadScript
} from '@react-google-maps/api';

const MapComponent = ({waypoints}) => {
    const [response, setResponse] = useState(null);
    const [directionsServiceActive, setDirectionsServiceActive] = useState(true);
    const [center, setCenter] = useState({lat: 0, lng: 0});
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Если не запускается - укажите ключ напрямую (не забудьте удалить при коммите)

    const directionsCallback = useCallback((res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res);
                setDirectionsServiceActive(false);  // Stop the service after getting a response
            } else {
                console.log('response: ', res);
            }
        }
    }, []);

    useEffect(() => {
        if (waypoints && waypoints.length >= 2) {
            setDirectionsServiceActive(true);
            setCenter(calculateCenter(waypoints));
        }
    }, [waypoints]);

    const calculateCenter = (waypoints) => {
        const lats = waypoints.map(point => point.lat);
        const lngs = waypoints.map(point => point.lng);
        const latCenter = (Math.min(...lats) + Math.max(...lats)) / 2;
        const lngCenter = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        return {lat: latCenter, lng: lngCenter};
    };

    return (
        <>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    id="direction-example"
                    mapContainerStyle={{
                        height: '800px',
                        width: '1250px'
                    }}
                    zoom={7}
                    center={center}
                >
                    {directionsServiceActive && waypoints.length >= 2 && (
                        <DirectionsService
                            options={{
                                origin: waypoints[0],
                                destination: waypoints[waypoints.length - 1],
                                waypoints: waypoints.slice(1, -1).map(point => ({
                                    location: point,
                                    stopover: true
                                })),
                                travelMode: 'DRIVING'
                            }}
                            callback={directionsCallback}
                        />
                    )}

                    {response && (
                        <DirectionsRenderer
                            options={{
                                directions: response
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default MapComponent;
