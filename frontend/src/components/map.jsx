import React, {useCallback, useEffect, useState} from 'react';
import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    LoadScript,
    Marker
} from '@react-google-maps/api';

let road = {};

const MapComponent = () => {
  const [response, setResponse] = useState(null);
  const [directionsServiceActive, setDirectionsServiceActive] = useState(true);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [inputOrigin, setInputOrigin] = useState('');
  const [inputDestination, setInputDestination] = useState('');
  const [markers, setMarkers] = useState([]); // состояние для хранения маркеров
  const [inputMarker, setInputMarker] = useState(''); // состояние для хранения ввода маркера
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Если не запускается - укажите ключ напрямую (не забудьте удалить при коммите)

  const GetRoad = async () => {
    try {
      const response2 = await fetch("/api/travel/route/2", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Проверка на наличие данных в ответе
      const text = await response2.text();
      console.log('Response text:', text); // Выводим текст ответа в консоль

      // Проверяем, является ли текст JSON строкой
      try {
        const data = JSON.parse(text);
        road = data.route;
        onGetRoad();
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    const [latOrigin, lngOrigin] = inputOrigin.split(',').map(Number);
    const [latDestination, lngDestination] = inputDestination.split(',').map(Number);
    setOrigin({ lat: latOrigin, lng: lngOrigin });
    setDestination({ lat: latDestination, lng: lngDestination });
  };

  const onGetRoad = () => {
    setOrigin({ lat: road[0].lat, lng: road[0].lng });
    setDestination({ lat: road[road.length - 1].lat, lng: road[road.length - 1].lng });
  };

  const handleAddMarker = () => {
    const [lat, lng] = inputMarker.split(',').map(Number);
    setMarkers([...markers, { lat, lng }]);
    setInputMarker('');
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
        <input
          type="text"
          placeholder="Enter marker coordinates (lat,lng)"
          value={inputMarker}
          onChange={(e) => setInputMarker(e.target.value)}
        />
        <button onClick={handleAddMarker}>Add Marker</button>
      </div>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places', 'geometry', 'drawing']}>
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

          {road.length > 0 && (
            <DirectionsRenderer
              options={{
                directions: {
                  routes: [
                    {
                      overview_path: road.map(point => ({ lat: point.lat, lng: point.lng }))
                    }
                  ]
                },
                polylineOptions: { strokeColor: '#00FF00' } // Цвет для маршрута из массива координат
              }}
            />
          )}

          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>
      <button className="nav-button" onClick={GetRoad}>ЖМЯК</button>
    </>
  );
};

export default MapComponent;
