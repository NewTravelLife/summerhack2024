import {useEffect, useState} from "react";
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";
import L from "leaflet";
import markerIcon from "../assets/marker.png";

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const MapComponent = ({start, end}) => {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://api.openrouteservice.org';

        const fetchData = async () => {
            fetch(`${apiUrl}/v2/directions/driving-car/geojson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 5b3ce3597851110001cf6248f65f36b127384eba95a60a1abecea503`,
                },
                body: JSON.stringify({
                    coordinates: [
                        start, end
                    ],
                    radiuses: [500, 500],
                }),
            }).then(response => response.json())
                .then(data => {
                    setRoute(data.features[0].geometry.coordinates);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        };
        fetchData();
    }, [start, end]);

    return (
        <MapContainer center={start} zoom={13}
                      style={{height: '100vh', width: '100%'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={start} icon={customIcon}/>
            <Marker position={end} icon={customIcon}/>
            {route.length > 0 && <Polyline positions={route} color="blue"/>}
        </MapContainer>
    );
};

export default MapComponent;
