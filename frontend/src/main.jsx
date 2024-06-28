import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import './index.css';
import './App.css';
import Poisk from "./components/poisk";
import 'leaflet/dist/leaflet.css';
import Travel from "./components/travel.jsx";
import Travel2 from "./components/travel2.jsx";


function App() {
    // const [city, setCity] = useState('');
    // const [filteredAttractions, setFilteredAttractions] = useState([]);
    // const [temperature, setTemperature] = useState(null);
    // useEffect(() => {
    //     fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m')
    //         .then((response) => response.json()) // Преобразуем ответ в JSON
    //         .then((data) => {
    //             if (data && data.current) {
    //                 setTemperature(data.current.temperature_2m); // Устанавливаем температуру в состояние
    //             } else {
    //                 console.log("Ошибка загрузки температуры.");
    //             }
    //         })
    // }, []);

    // useEffect(() => {
    //     filterAttractions(city);
    // }, [city]);

    // const filterAttractions = (selectedCity) => {
    //     const filtered = attractions.map(attraction => {
    //         if (selectedCity === '' || attraction.city === selectedCity) {
    //             return attraction;
    //         }
    //         return null;
    //     }).filter(attraction => attraction !== null);
    //     setFilteredAttractions(filtered);
    // };


    return (
        <div>
            <div className="header">
                <div className="project-name">newtravel.life</div>
                <div className="nav-buttons">
                    <button className="nav-button">Мои путешествия</button>
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
            {/*<div className="input-container">*/}
            {/*    <select value={city} onChange={(e) => setCity(e.target.value)}>*/}
            {/*        {cities.map((cityOption, index) => (*/}
            {/*            <option key={index}*/}
            {/*                    value={cityOption}>{cityOption}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
            {/*<div className="attractions">*/}
            {/*    {filteredAttractions.map((attraction, index) => (*/}
            {/*        <div className="card" key={index}>*/}
            {/*            <img src={attraction.image} alt={attraction.title}*/}
            {/*                 className="card-image"/>*/}
            {/*            <h3 className="card-title">{attraction.title}</h3>*/}
            {/*            <p className="card-description">{attraction.description}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h1>Карта местности</h1>*/}
            {/*    <MapComponent start={start} end={end}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h1>Температура сейчас:</h1>*/}
            {/*    {temperature !== null ? (<p>{temperature} °C</p>) :*/}
            {/*        (<p>Загрузка...</p>)}*/}
            {/*</div>*/}
        </div>
    );

}


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/poisk" element={<Poisk/>}/>
                <Route path="/travel/:travel_id" element={<Travel/>}/>
                <Route path="/test_travel"
                       element={<Travel2 travel_id="2"/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);