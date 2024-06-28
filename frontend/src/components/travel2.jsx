import PlacesModule from "./places/PlacesModule.jsx";
import TravelDocuments from "./TravelDocuments.jsx";

const Travel2 = ({travel_id}) => {

    return (
        <div>
            <h1>Инфа по путешествию {travel_id}</h1>
            <TravelDocuments
                uploadPath={'/api/travel/upload_file/' + travel_id}
                fetchPath={'/api/travel/files/' + travel_id}
                basePath={'/api/travel/download_file/' + travel_id + '/'}
            />
            <PlacesModule travel_id={travel_id}></PlacesModule>
        </div>
    );

}
export default Travel2;