import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './index.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import image1 from './assets/image1.jpg';
import image3 from './assets/image3.jpg';
import Poisk from "./components/poisk";
import 'leaflet/dist/leaflet.css';
import MapComponent from "./components/map.jsx";
import UploadButton from './components/UploadButton.jsx';

function setCords() {
    start = document.getElementById("startcords1").value;
    end = document.getElementById("startcords2").value;
}


function App() {
  const [showText, setShowText] = useState(false);
  const [city, setCity] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [checked, setChecked] = useState({
    word1: false,
    word2: false,
    word3: false,
  });



  
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
    }).filter(attraction => attraction!== null);
    setFilteredAttractions(filtered);
  };
    

  return (
    <div>
      <div className="header">
        <div className="project-name">newtravel.life</div>
        <div className="nav-buttons">
          <button className="nav-button">Жильё</button>
          <button className="nav-button">Питание</button>
          <button className="nav-button">Мои путешествия</button>
          <button className="nav-button">Поделиться</button>
          <UploadButton uploadPath="api/travel/upload_file/1"/>
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
      <div className="attractions">
        {filteredAttractions.map((attraction, index) => (
          <div className="card" key={index}>
            <img src={attraction.image} alt={attraction.title} className="card-image"/>
            <h3 className="card-title">{attraction.title}</h3>
            <p className="card-description">{attraction.description}</p>
          </div>
        ))}
      </div>
           
        </div>
    );

}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/poisk" element={<App />} />
        <Route path="/" element={<Poisk />} />
      </Routes>
    </Router>
  </React.StrictMode>
);