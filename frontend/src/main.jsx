import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import openrouteservice from 'openrouteservice-js';
import 'leaflet/dist/leaflet.css';
import markerIcon from './assets/marker.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32], // размер иконки
  iconAnchor: [16, 32], // точка привязки, чтобы иконка указывала на точку координат
  popupAnchor: [0, -32] // точка привязки для всплывающего окна
});

function App() {
  const [showText, setShowText] = useState(false);
  const [city, setCity] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000); // Задержка в 1 секунду перед показом текста

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterAttractions(city);
  }, [city]);

  const attractions = [
    {
      image: image1,
      title: 'Достопримечательность 1',
      description: 'Описание достопримечательности 1.',
      city: "Москва"
    },
    {
      image: image1,
      title: 'Достопримечательность 2',
      description: 'Описание достопримечательности 2.',
      city: "Санкт-Петербург"
    },
    {
      image: image3,
      title: 'Достопримечательность 3',
      description: 'Описание достопримечательности 3.',
      city: "Санкт-Петербург"
    },
    {
      image: image3,
      title: 'Достопримечательность 4',
      description: 'Описание достопримечательности 4.',
      city: "Москва"
    },
    {
      image: image3,
      title: 'Достопримечательность 5',
      description: 'Очень крутая достопримечательность, тут короче такоооое, что вам точно нужно посетить её.',
      city: "Москва"
    },
    {
      image: image3,
      title: 'Достопримечательность 6',
      description: 'Описание достопримечательности 6.',
      city: "Москва"
    },
    {
      image: image3,
      title: 'Достопримечательность 7',
      description: 'Описание достопримечательности 7.',
      city: "Москва"
    },
    {
      image: image3,
      title: 'Достопримечательность 8',
      description: 'Описание достопримечательности 8.',
      city: "Москва"
    }
  ];

  const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи'];

  const filterAttractions = (selectedCity) => {
    const filtered = attractions.map(attraction => {
      if (selectedCity === '' || attraction.city === selectedCity) {
        return attraction;
      }
      return null;
    }).filter(attraction => attraction !== null);
    setFilteredAttractions(filtered);
  };

  return (
    <div>
      <div className="header">
        <div className="project-name">New Travel Life</div>
        <div className="nav-buttons">
          <button className="nav-button">Жильё</button>
          <button className="nav-button">Питание</button>
          <button className="nav-button">Мои путешествия</button>
        </div>
      </div>
      <div className="text-container">
        {showText && (
          <div className="animated-text">
            С нами Ваше путешествие станет незабываемым.
          </div>
        )}
      </div>
      <div className="input-container">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Выберите город</option>
          {cities.map((cityOption, index) => (
            <option key={index} value={cityOption}>{cityOption}</option>
          ))}
        </select>
      </div>
      <div className="attractions">
        {filteredAttractions.map((attraction, index) => (
          <div className="card" key={index}>
            <img src={attraction.image} alt={attraction.title} className="card-image" />
            <h3 className="card-title">{attraction.title}</h3>
            <p className="card-description">{attraction.description}</p>
          </div>
        ))}
      </div>
      <div>
      <h1>Карта местности</h1>
      <MapComponent />
    </div>
    </div>
  );
}

const MapComponent = () => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.openrouteservice.org';

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/v2/directions/driving-car/geojson`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${"5b3ce3597851110001cf6248f65f36b127384eba95a60a1abecea503"}`,
          },
          body: JSON.stringify({
            coordinates: [
              [8.681495, 49.41461], 
              [8.686507, 49.41943]

            ],
            radiuses: [500, 500],
          }),
        });
        
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Ошибка загрузки маршрута: ${errorMessage}`);
        }

        const data = await response.json();
        const geometry = data.routes[0].geometry.coordinates;
        const leafletRoute = geometry.map((point) => [point[1], point[0]]);
        setRoute(leafletRoute);
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer center={[8.681495, 49.41461]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[8.681495, 49.41461]} icon={customIcon}/>
      <Marker position={[8.686507, 49.41943]} icon={customIcon}/>
      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
