import {useState} from "react";

const Travel = ({travel_id}) => {
    const [travelInfo, setTravelInfo] = useState();
    const fetch_data = (travel_id) => {
        fetch('/api/travel/get/' + travel_id)
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