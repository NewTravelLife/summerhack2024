import {useEffect} from 'react';
import '../../Attractions.css'; // Import your stylesheet if you have one
import Place from './Place';

const PlacesModule = ({travel_id, places, fetchRoute}) => {
    useEffect(() => {
        fetchRoute();
    }, [fetchRoute]);

    return (
        <div>
            {Object.entries(places).map(([key, value]) => (
                <Place
                    travel_id={travel_id}
                    key={key}
                    category={key}
                    places_data={value}
                />
            ))}
        </div>
    );
}

export default PlacesModule;
