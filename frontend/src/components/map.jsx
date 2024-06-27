import React, { useEffect, useState, useCallback } from 'react';
import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    LoadScript
} from '@react-google-maps/api';
import { Class } from 'leaflet';

const MapComponent = ({}) => {
    const [response, setResponse] = useState(null);
    const [directionsServiceActive, setDirectionsServiceActive] = useState(true);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [inputOrigin, setInputOrigin] = useState('');
    const [inputDestination, setInputDestination] = useState('');
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
      if (origin && destination) {
        setDirectionsServiceActive(true);
      }
    }, [origin, destination]);

    const handleClick = () => {
      setOrigin(inputOrigin);
      setDestination(inputDestination);
    };

    return (
      <>
      <div>
      <input
        type="text"
        placeholder="Enter origin coordinates (lat,lng)"
        value={inputOrigin}
        onChange={(e) => setInputOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter destination coordinates (lat,lng)"
        value={inputDestination}
        onChange={(e) => setInputDestination(e.target.value)}
      />
      <button onClick={handleClick}>Get Directions</button>
      </div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          id="direction-example"
          mapContainerStyle={{
            height: '800px',
            width: '1250px',

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
        </GoogleMap>
      </LoadScript>
      </>
    );
  };

export default MapComponent;