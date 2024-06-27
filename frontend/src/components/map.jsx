import {useState} from 'react';
import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    LoadScript
} from '@react-google-maps/api';

const MapComponent = ({origin, destination}) => {
    const [response, setResponse] = useState(null);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const directionsCallback = (res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res);
            } else {
                console.log('response: ', res);
            }
        }
    };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                id="direction-example"
                mapContainerStyle={{
                    height: '400px',
                    width: '800px'
                }}
                zoom={7}
                center={{
                    lat: 41.85073,
                    lng: -87.65126
                }}
            >
                {(
                    origin !== '' &&
                    destination !== ''
                ) && (
                    <DirectionsService
                        // required
                        options={{
                            destination: destination,
                            origin: origin,
                            travelMode: 'DRIVING'
                        }}
                        // required
                        callback={directionsCallback}
                    />
                )}

                {response !== null && (
                    <DirectionsRenderer
                        // required
                        options={{
                            directions: response
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;