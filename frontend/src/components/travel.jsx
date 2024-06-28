import {useState} from 'react';
import {useParams} from "react-router-dom";
import TravelDocuments from "./TravelDocuments.jsx";

const Travel = () => {
    const {travel_id} = useParams();
    const [travelInfo, setTravelInfo] = useState();
    const fetch_data = (travel_id) => {
        fetch('/api/travel/get/' + travel_id)
            .then(response => response.json())
            .then(data => setTravelInfo(data));
    };
    fetch_data(travel_id);
    return (
        <div>
            <h1>Инфа по путешествию {travel_id}</h1>
            <TravelDocuments
                uploadPath={'/api/travel/upload_file/' + travel_id}
                fetchPath={'/api/travel/files/' + travel_id}
                basePath={'/api/travel/download_file/' + travel_id + '/'}
            />
        </div>
    );

}
export default Travel;