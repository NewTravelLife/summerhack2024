import {GoogleMap, LoadScript, Polyline} from '@react-google-maps/api';

const MapComponent = ({route}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log(route);
    const pathCoordinates = route.map(loc => ({
        lat: loc["location"]["lat"],
        lng: loc["location"]["lng"]
    }));
    console.log(pathCoordinates)
    const calculateCenter = (waypoints) => {
        const lats = waypoints.map(point => point.lat);
        const lngs = waypoints.map(point => point.lng);
        const latCenter = (Math.min(...lats) + Math.max(...lats)) / 2;
        const lngCenter = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        return {lat: latCenter, lng: lngCenter};
    };
    const center = calculateCenter(pathCoordinates);
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                id="direction-example"
                mapContainerStyle={{
                    height: '800px',
                    width: '1250px'
                }}
                zoom={7}
                center={center}
            >
                <Polyline
                    path={pathCoordinates}
                    options={{
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    }}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
