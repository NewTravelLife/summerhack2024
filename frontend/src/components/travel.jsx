import {useState} from 'react';
import {useParams} from "react-router-dom";

const Travel = () => {
    const {travel_id} = useParams();
    const [travelInfo, setTravelInfo] = useState();
    const fetch_data = (travel_id) => {
        fetch('/api/travel/locations/' + travel_id)
            .then(response => response.json())
            .then(data => setTravelInfo(data));
    };
    fetch_data(travel_id);
    return (
        <div>
            {travelInfo && <div>
                <h1>{travelInfo.id}</h1>
            </div>}
        </div>
    );
}
export default Travel;