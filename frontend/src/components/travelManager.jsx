import React from "react";
import { useCookies } from 'react-cookie';


let coords = {};
let current_travel_id;

const getCords = (lat, lng) => {
    const [cookies, setCookie, removeCookie] = useCookies(['travel_id']);

    const sendCoordsToBackend = async () => {
        try {
            const response = await fetch('/api/travel/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coords),
            });

            // Проверка на наличие данных в ответе
            const text = await response.text();
            if (text) {
                const data = JSON.parse(text);
                current_travel_id = data.travel_id;
                if (current_travel_id) {
                    window.location.href = `/travel/${current_travel_id}`;
                    setCookie('travel_id', current_travel_id)
                }
            } else {
                console.error('Empty response');
            }
        } catch (error) {
            console.error('Error sending coordinates:', error);
        }
    };

    if (!coords.start_lat && !coords.start_lon) {
        coords.start_lat = lat;
        coords.start_lon = lng;
    } else {
        coords.end_lat = lat;
        coords.end_lon = lng;

        sendCoordsToBackend();

        coords = {};
    }
};


export default getCords;