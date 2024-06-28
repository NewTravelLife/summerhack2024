import React, {useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {Autocomplete, LoadScript} from '@react-google-maps/api';
import '../App.css';
import '../index.css';
import image1 from '../assets/image0.png';
import image2 from '../assets/image00.png';
import image3 from '../assets/image000.png';
import image4 from '../assets/image000.png';
import strelkaUrl from '../assets/strelka.png';
import bac from '../assets/bac.png';
// import MapComponent from "../components/map.jsx";
import UploadButton from '../components/UploadButton.jsx';
import getCords from "./travelManager";
import {useCookies} from "react-cookie";


const Poisk =()=>{
    const [inputOrigin, setInputOrigin] = useState('');
    const [inputDestination, setInputDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [cookies, setCookie,] = useCookies(['travel_id']);

    const originAutocompleteRef = useRef(null);
    const destinationAutocompleteRef = useRef(null);

    const [checked, setChecked] = useState({
        word1: false,
        word2: false,
        word3: false,
      });
      const [temperature, setTemperature] = useState(null);
      const handleSelect = (word) => {
        setChecked((prevChecked) => ({ ...prevChecked, [word]: !prevChecked[word] }));
      };
    


      const start = {
        lat: 55.782982,
        lng: 37.63385
    }
    const end = {
        lat: 59.929984,
        lng: 30.362158
    }
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




    const handlePlaceChanged = (type) => {
        const autocomplete = type === 'origin' ? originAutocompleteRef.current : destinationAutocompleteRef.current;
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const formattedAddress = place.formatted_address;

        if (type === 'origin') {
            setInputOrigin(formattedAddress);
            setOrigin(`${lat},${lng}`);
        } else {
            setInputDestination(formattedAddress);
            setDestination(`${lat},${lng}`);
        }
    };

    const handleGeocode = async (address, setFunc) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address}, (results, status) => {
            if (status === 'OK') {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                setFunc(`${lat},${lng}`);
                getCords(lat, lng, cookies, setCookie);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    const handleComposeRoute = () => {
        handleGeocode(inputOrigin, setOrigin);
        handleGeocode(inputDestination, setDestination);
    };

    const attractions = [
        {image: image1, title: 'Достопримечательность 1'},
        {image: image2, title: 'Достопримечательность 2'},
        {image: image3, title: 'Достопримечательность 4'},
        {image: image4, title: 'Достопримечательность 8'}
    ];

  return (
    <div>
      <div className="header">
      <Link to="/">
        <div className="project-name">newtravel.life</div>
        </Link>
        <div className="nav-buttons">
          <button className="nav-button">Жильё</button>
          <button className="nav-button">Питание</button>
          <button className="nav-button">Мои путешествия</button>
          <Link to="/poisk">
            <button className="nav-button">Создать путешествие</button>
          </Link>
        </div>
      </div>
      
      <div className="text-container0">
                  <div className="animated-text0">
                          Помощник в составлении вашего идеального путешествия
                  </div>
              </div>
              <img src={bac} className='bac' alt="" />
              <div className='box-container'>
                  <h1 className='textt'>Выбери свой маршрут</h1>

      <div className='forma'>
                    <button className='poisk'
                            onClick={handleComposeRoute}>Составить
                    </button>
                    <img src={strelkaUrl} className='strelka' alt=""/>
                    <div className='Otpravka'>
                        <p >Место отправления:</p>
                        <LoadScript googleMapsApiKey={apiKey}
                                    libraries={['places']}>
                            <Autocomplete
                                onLoad={autocomplete => (originAutocompleteRef.current = autocomplete)}
                                onPlaceChanged={() => handlePlaceChanged('origin')}
                            >
                                <input
                                    type="text"
                                    placeholder="Название"
                                    value={inputOrigin}
                                    onChange={(e) => setInputOrigin(e.target.value)}
                                    className='input-otprav'
                                />
                            </Autocomplete>
                        </LoadScript>
                    </div>
                    <div className='Priezd'>
                        <p>Место прибытия:</p>
                        <LoadScript googleMapsApiKey={apiKey}
                                    libraries={['places']}>
                            <Autocomplete
                                onLoad={autocomplete => (destinationAutocompleteRef.current = autocomplete)}
                                onPlaceChanged={() => handlePlaceChanged('destination')}
                            >
                                <input
                                    type="text"
                                    placeholder="Название"
                                    value={inputDestination}
                                    onChange={(e) => setInputDestination(e.target.value)}
                                    className='input-otprav'
                                />
                            </Autocomplete>
                        </LoadScript>
                    </div>
                </div>
      </div>
      <div className='placeholder'>
      </div>
      <div className='Upload-button'>
      <UploadButton uploadPath="api/travel/upload_file/1"/>
      </div>
      <div className="WeatherTemperature"> 
            <p>Температура на маршруте:</p>
            {temperature !== null ? (<h1>{temperature} °C</h1>) :
                (<p>Загрузка...</p>)}
        </div>


    
    </div>

  );
}


export default Poisk;