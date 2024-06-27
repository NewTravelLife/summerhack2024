import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import image1 from './assets/image1.jpg';
import image3 from './assets/image3.jpg';
import 'leaflet/dist/leaflet.css';
import MapComponent from "./components/map.jsx";

function App() {
    const [showText, setShowText] = useState(false);
    const [city, setCity] = useState('');
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const [temperature, setTemperature] = useState(null);
    const start = {
        lat: 55.782982,
        lng: 37.63385
    }
    const end = {
        lat: 59.929984,
        lng: 30.362158
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 1000); // Задержка в 1 секунду перед показом текста

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        filterAttractions(city);
    }, [city]);

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
                <MapComponent origin={start} destination={end}/>
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
        <App/>
    </React.StrictMode>,
)
