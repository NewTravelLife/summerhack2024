import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../App.css';

const TravelsList = () => {
    const [travels, setTravels] = useState([]);
    const [cookies,] = useCookies(['travel_id']);
    useEffect(() => {
        setTravels(cookies.travel_id ? cookies.travel_id.split(',') : []);
    }, []);
    return (
        <div>
            <div className="header">
                <div className="project-name">newtravel.life</div>
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
            <div className="hui">
                {travels.map((travel_id, index) => (
                    <div key={index}>
                        <Link to={'/travel/' + travel_id}>
                            Путешествие {travel_id}
                        </Link>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default TravelsList;