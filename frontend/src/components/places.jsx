import React from "react";
import image1 from "../assets/image1.jpg";
import image3 from "../assets/image3.jpg";
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
    },
    {
        image: image3,
        title: 'Достопримечательность 6',
        description: 'Описание достопримечательности 6.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Достопримечательность 7',
        description: 'Описание достопримечательности 7.',
        city: "Москва"
    },
    {
        image: image3,
        title: 'Достопримечательность 8',
        description: 'Описание достопримечательности 8.',
        city: "Москва"
    }
];

const Places = ({ filteredAttractions = ListAttractions }) => {
    if (filteredAttractions.length === 0) {
        return <p>Нет доступных достопримечательностей.</p>;
    }

    return (
        <div className="attractions-container">
            {filteredAttractions.map((attraction, index) => (
                <div key={index} className="attraction-item">
                    <img src={attraction.image} alt={attraction.title} className="attraction-image" />
                    <h3>{attraction.title}</h3>
                    <p>{attraction.description}</p>
                    <p><strong>Город:</strong> {attraction.city}</p>
                </div>
            ))}
        </div>
    );
};

export default Places;
