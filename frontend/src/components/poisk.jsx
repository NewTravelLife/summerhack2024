import {Link} from 'react-router-dom';
import '../App.css';
import '../index.css';
import strelkaUrl from '../assets/strelka.png';
import React, {useRef, useState} from "react";
import {Autocomplete, LoadScript} from '@react-google-maps/api';
import getCords from "./travelManager.jsx";
import {useCookies} from "react-cookie";

const Poisk = () => {
    const [inputOrigin, setInputOrigin] = useState('');
    const [inputDestination, setInputDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const originAutocompleteRef = useRef(null);
    const destinationAutocompleteRef = useRef(null);
    const [cookies, setCookie,] = useCookies(['travel_id']);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
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

    return (
        <div>
            <div className="header">
            <Link to="/">
                <div className="project-name">newtravel.life</div>
            </Link>
                <div className="nav-buttons">
                    <Link to={"/travels"}>
                        <button className="nav-button">Мои путешествия</button>
                    </Link>
                    <Link to="/poisk">
                        <button className="nav-button">Создать путешествие
                        </button>
                    </Link>
                </div>
            </div>
            <div className='travelTable'>
            <div className="text-container0">
                <div className="animated-text0">
                    Помощник в составлении вашего идеального путешествия
                </div>
            </div>
            <div className='forma'>
                <button className='poisk'
                        onClick={handleComposeRoute}>Составить маршрут
                </button>
                <img src={strelkaUrl} className='strelka' alt=""/>
                <div className='Otpravka'>
                    <p>Место отправления:</p>
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
            </div>
    );
};

export default Poisk;