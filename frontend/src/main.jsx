import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './index.css';
import { Routes, Route } from 'react-router-dom';
import MapComponent from "./components/map.jsx";
import './App.css';
import Poisk from "./components/poisk";
import 'leaflet/dist/leaflet.css';
import TravelDocuments from "./components/TravelDocuments.jsx";
import places from "./components/places.jsx";
import Places from "./components/places.jsx";

function setCords() {
    start = document.getElementById("startcords1").value;
    end = document.getElementById("startcords2").value;
}


function App() {
  const [showText, setShowText] = useState(false);
  const [city, setCity] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [checked, setChecked] = useState({
    word1: false,
    word2: false,
    word3: false,
  });

  const start = {
        lat: 55.782982,
        lng: 37.63385
    }
    const end = {
        lat: 59.929984,
        lng: 30.362158
    }

  
  const handleSelect = (word) => {
    setChecked((prevChecked) => ({...prevChecked, [word]:!prevChecked[word] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000); // Задержка в 1 секунду перед показом текста

    return () => clearTimeout(timer);
  }, []);


    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m')
          .then((response) => response.json()) // Преобразуем ответ в JSON
          .then((data) => {
            if (data && data.current) {
              setTemperature(data.current.temperature_2m); // Устанавливаем температуру в состояние
            } else {
                console.log("Ошибка загрузки температуры.");
            }
          })
      }, []);
  
  useEffect(() => {
    filterAttractions(city);
  }, [city]);


  const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи'];

  const filterAttractions = (selectedCity) => {
    const filtered = attractions.map(attraction => {
      if (selectedCity === '' || attraction.city === selectedCity) {
        return attraction;
      }
      return null;
    }).filter(attraction => attraction!== null);
    setFilteredAttractions(filtered);
  };
    

  return (
    <div>
      <div className="header">
        <div className="project-name">newtravel.life</div>
        <div className="nav-buttons">
          <button className="nav-button">Поделиться</button>

          <Link to="/poisk">
            <button className="nav-button">Создать путешествие</button>
          </Link>
            </div>
            </div>
      <div className="text-container">
        <div className="animated-text">
          С нами Ваше путешествие станет незабываемым
        </div>
      </div>
      <div className="input-container">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
        {cities.map((cityOption, index) => (
            <option key={index} value={cityOption}>{cityOption}</option>
          ))}
        </select>
      </div>
      <Places/>
      <div>
        <h1>Карта местности</h1>
        <MapComponent start={start} end={end}/>
      </div>
      <div>
            <h1>Температура сейчас:</h1>
            {temperature !== null ? (<p>{temperature} °C</p>) :
                (<p>Загрузка...</p>)}
          </div>
      <div>
        <h1 Документы для поездки></h1>
        <TravelDocuments/>
      </div>


    </div>
  );

}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/poisk" element={<Poisk />} />
      </Routes>
    </Router>
  </React.StrictMode>
);