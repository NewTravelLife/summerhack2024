import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import './index.css';
import MapComponent from "./components/map.jsx";
import './App.css';
import image1 from './assets/image1.jpg';
import image3 from './assets/image3.jpg';
import Poisk from "./components/poisk";
import 'leaflet/dist/leaflet.css';
import UploadButton from './components/UploadButton.jsx';

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
        setChecked((prevChecked) => ({
            ...prevChecked,
            [word]: !prevChecked[word]
        }));
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
                <div className="project-name">newtravel.life</div>
                <div className="nav-buttons">
                    <button className="nav-button">Жильё</button>
                    <button className="nav-button">Питание</button>
                    <button className="nav-button">Мои путешествия</button>
                    <button className="nav-button">Поделиться</button>
                    <UploadButton uploadPath="api/travel/upload_file/1"/>
                    <Link to="/poisk">
                        <button className="nav-button">Создать путешествие
                        </button>
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
                        <option key={index}
                                value={cityOption}>{cityOption}</option>
                    ))}
                </select>
            </div>
            <div className="attractions">
                {filteredAttractions.map((attraction, index) => (
                    <div className="card" key={index}>
                        <img src={attraction.image} alt={attraction.title}
                             className="card-image"/>
                        <h3 className="card-title">{attraction.title}</h3>
                        <p className="card-description">{attraction.description}</p>
                    </div>
                ))}
            </div>
            <div>
                <h1>Карта местности</h1>
                <MapComponent route={[[
                    {
                        "address": "University Embankment, 7, Sankt-Peterburg",
                        location: {
                            lat: 59.9404682,
                            lng: 30.3005417
                        },
                        "name": "Zdaniye Dvenadtsati Kollegiy",
                        "rating": 4.7,
                        "user_ratings_total": 299
                    },
                    {
                        "address": "University Embankment, 3, Sankt-Peterburg",
                        location: {
                            lat: 59.9415595,
                            lng: 30.3047921
                        },
                        "name": "Kunstkamera",
                        "rating": 4.4,
                        "user_ratings_total": 22161
                    },
                    {
                        "address": "Palace Square, 2, Sankt-Peterburg",
                        location: {
                            lat: 59.93983170000001,
                            lng: 30.31455969999999
                        },
                        "name": "State Hermitage Museum",
                        "rating": 4.8,
                        "user_ratings_total": 58398
                    }]]}/>
            </div>
            <div>
                <h1>Температура сейчас:</h1>
                {temperature !== null ? (<p>{temperature} °C</p>) :
                    (<p>Загрузка...</p>)}
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