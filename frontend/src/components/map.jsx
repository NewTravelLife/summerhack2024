import {GoogleMap, LoadScript, Polyline} from '@react-google-maps/api';

const MapComponent = ({route}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log(route);
    // const pathCoordinates = route.map(loc => ({
    //     lat: loc["location"]["lat"],
    //     lng: loc["location"]["lng"]
    // }));
    const flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027},
    ]
    // console.log(pathCoordinates)
    const calculateCenter = (waypoints) => {
        const lats = waypoints.map(point => point.lat);
        const lngs = waypoints.map(point => point.lng);
        const latCenter = (Math.min(...lats) + Math.max(...lats)) / 2;
        const lngCenter = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        return {lat: latCenter, lng: lngCenter};
    };
    const center = calculateCenter(flightPlanCoordinates);
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                initialZoom={3}
                initialCenter={center}
            >
                <Polyline
                    path={flightPlanCoordinates}
                    strokeColor="#FF0000"
                    strokeOpacity={1.0}
                    strokeWeight={2}
                    geodesic
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
