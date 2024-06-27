import React from "react";
import image1 from "../assets/image1.jpg";
import image3 from "../assets/image3.jpg";
import acceptIcon from "../assets/accept.png";
import denyIcon from "../assets/deny.png";
import '../Attractions.css'; // Импортируйте файл стилей, если он у вас есть

const ListAttractions = [
    {
        image: image1,
        title: 'Достопримечательность 1',
        description: 'Описание достопримечательности 1.',
        city: "Москва"
    },
    {
        image: image1,
        title: 'Достопримечательность 2',
        description: 'Описание достопримечательности 2.',
        city: "Санкт-Петербург"
    },
    {
        image: image3,
        title: 'Достопримечательность 3',
        description: 'Описание достопримечательности 3.',
        city: "Санкт-Петербург"
    },
    {
        image: image3,
        title: 'Достопримечательность 4',
        description: 'Описание достопримечательности 4.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Достопримечательность 5',
        description: 'Очень крутая достопримечательность, тут короче такоооое, что вам точно нужно посетить её.',
        city: "Москва"
    }
];

const ListRestaurants = [
    {
        image: image1,
        title: 'Ресторан 1',
        description: 'Описание ресторана 1.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Ресторан 2',
        description: 'Описание ресторана 2.',
        city: "Санкт-Петербург"
    },
    {
        image: image3,
        title: 'Ресторан 3',
        description: 'Описание ресторана 3.',
        city: "Санкт-Петербург"
    },
    {
        image: image3,
        title: 'Ресторан 4',
        description: 'Описание ресторана 4.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Ресторан 5',
        description: 'Описание ресторана 5.',
        city: "Москва"
    }
];

const ListLodging = [
    {
        image: image1,
        title: 'Отель 1',
        description: 'Описание отеля 1.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Отель 2',
        description: 'Описание отеля 2.',
        city: "Санкт-Петербург"
    },
    {
        image: image3,
        title: 'Отель 3',
        description: 'Описание отеля 3.',
        city: "Санкт-Петербург"
    },
    {
        image: image3,
        title: 'Отель 4',
        description: 'Описание отеля 4.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Отель 5',
        description: 'Описание отеля 5.',
        city: "Москва"
    }
];

const Places = ({ filteredAttractions = ListAttractions, filteredRestaurants = ListRestaurants, filteredLodging = ListLodging }) => {
    if (filteredAttractions.length === 0 && filteredRestaurants.length === 0 && filteredLodging.length === 0) {
        return <p>Нет доступных достопримечательностей, ресторанов и отелей.</p>;
    }

    return (
        <div>
            <div className="attractions-container">
                <h2>Достопримечательности</h2>
                {filteredAttractions.map((attraction, index) => (
                    <div key={index} className="attraction-item">
                        <div className="attraction-content">
                            <img src={attraction.image} alt={attraction.title} className="attraction-image" />
                            <h3>{attraction.title}</h3>
                            <p>{attraction.description}</p>
                            <p><strong>Город:</strong> {attraction.city}</p>
                        </div>
                        <div className="button-container">
                            <a href="#" className="action-button">
                                <img src={acceptIcon} alt="Accept" className="button-icon" />
                            </a>
                            <a href="#" className="action-button">
                                <img src={denyIcon} alt="Deny" className="button-icon" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="restaurants-container">
                <h2>Рестораны и кафе</h2>
                {filteredRestaurants.map((restaurant, index) => (
                    <div key={index} className="restaurant-item">
                        <div className="restaurant-content">
                            <img src={restaurant.image} alt={restaurant.title} className="restaurant-image" />
                            <h3>{restaurant.title}</h3>
                            <p>{restaurant.description}</p>
                            <p><strong>Город:</strong> {restaurant.city}</p>
                        </div>
                        <div className="button-container">
                            <a href="#" className="action-button">
                                <img src={acceptIcon} alt="Accept" className="button-icon" />
                            </a>
                            <a href="#" className="action-button">
                                <img src={denyIcon} alt="Deny" className="button-icon" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="lodging-container">
                <h2>Отели и гостиницы</h2>
                {filteredLodging.map((lodging, index) => (
                    <div key={index} className="lodging-item">
                        <div className="lodging-content">
                            <img src={lodging.image} alt={lodging.title} className="lodging-image" />
                            <h3>{lodging.title}</h3>
                            <p>{lodging.description}</p>
                            <p><strong>Город:</strong> {lodging.city}</p>
                        </div>
                        <div className="button-container">
                            <a href="#" className="action-button">
                                <img src={acceptIcon} alt="Accept" className="button-icon" />
                            </a>
                            <a href="#" className="action-button">
                                <img src={denyIcon} alt="Deny" className="button-icon" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Places;
