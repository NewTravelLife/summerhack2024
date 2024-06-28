import {useCallback, useEffect, useState} from 'react';
import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    LoadScript,
    Marker
} from '@react-google-maps/api';

const MapComponent = ({route, updateRoute, fetchRoute}) => {
    const [response, setResponse] = useState(null);
    const [directionsServiceActive, setDirectionsServiceActive] = useState(true);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [inputOrigin, setInputOrigin] = useState('');
    const [inputDestination, setInputDestination] = useState('');
    const [markers, setMarkers] = useState([]);
    const [inputMarker, setInputMarker] = useState('');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const directionsCallback = useCallback((res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res);
                setDirectionsServiceActive(false);
            } else {
                console.log('response: ', res);
            }
        }
    }, []);

    useEffect(() => {
        if (origin && destination) {
            setDirectionsServiceActive(true);
        }
    }, [origin, destination]);

    useEffect(() => {
        if (route.length > 0) {
            setOrigin({lat: route[0].lat, lng: route[0].lng});
            setDestination({
                lat: route[route.length - 1].lat,
                lng: route[route.length - 1].lng
            });
        }
    }, [route]);

    const handleClick = () => {
        const [latOrigin, lngOrigin] = inputOrigin.split(',').map(Number);
        const [latDestination, lngDestination] = inputDestination.split(',').map(Number);
        setOrigin({lat: latOrigin, lng: lngOrigin});
        setDestination({lat: latDestination, lng: lngDestination});
    };

    const handleAddMarker = () => {
        const [lat, lng] = inputMarker.split(',').map(Number);
        setMarkers([...markers, {lat, lng}]);
        setInputMarker('');
    };

    const handleUpdateRoute = () => {
        const newRoute = markers; // Example: using markers as the new route points
        updateRoute(newRoute);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Enter marker coordinates (lat,lng)"
                    value={inputMarker}
                    onChange={(e) => setInputMarker(e.target.value)}
                />
                <button onClick={handleAddMarker}>Add Marker</button>
                <button onClick={handleUpdateRoute}>Update Route</button>
            </div>
            <LoadScript googleMapsApiKey={apiKey}
                        libraries={['places', 'geometry', 'drawing']}>
                <GoogleMap
                    id="direction-example"
                    mapContainerStyle={{
                        height: '800px',
                        width: '1250px'
                    }}
                    zoom={7}
                    center={{
                        lat: 41.85073,
                        lng: -87.65126
                    }}
                >
                    {directionsServiceActive && origin && destination && (
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: origin,
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

                    {route.length > 0 && (
                        <DirectionsRenderer
                            options={{
                                directions: {
                                    routes: [
                                        {
                                            overview_path: route.map(point => ({
                                                lat: point.lat,
                                                lng: point.lng
                                            }))
                                        }
                                    ]
                                },
                                polylineOptions: {strokeColor: '#00FF00'}
                            }}
                        />
                    )}

                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker}/>
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default MapComponent;
