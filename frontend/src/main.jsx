import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';


function App() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000); // Задержка в 1 секунду перед показом текста

    return () => clearTimeout(timer);
  }, []);

  const attractions = [
    {
      image: image1,
      title: 'Достопримечательность 1',
      description: 'Описание достопримечательности 1.'
    },
    {
      image: image1,
      title: 'Достопримечательность 2',
      description: 'Описание достопримечательности 2.'
    },
    {
      image: image3,
      title: 'Достопримечательность 3',
      description: 'Описание достопримечательности 3.'
    },
    {
      image: image3,
      title: 'Достопримечательность 4',
      description: 'Описание достопримечательности 4.'
    },
    {
      image: image3,
      title: 'Достопримечательность 5',
      description: 'Очень крутая достопримечательность, тут короче такоооое, что вам точно нужно посетить её.'
    },
    {
      image: image3,
      title: 'Достопримечательность 6',
      description: 'Описание достопримечательности 6.'
    },
    {
      image: image3,
      title: 'Достопримечательность 7',
      description: 'Описание достопримечательности 7.'
    },
    {
      image: image3,
      title: 'Достопримечательность 8',
      description: 'Описание достопримечательности 8.'
    }
  ];

  return (
    <div>
      <div className="header">
        <div className="project-name">New Travel Life</div>
        <div className="nav-buttons">
          <button className="nav-button">Жильё</button>
          <button className="nav-button">Питание</button>
          <button className="nav-button">Мои путешествия</button>
        </div>
      </div>
      <div className="text-container">
        {showText && (
          <div className="animated-text">
            С нами Ваше путешествие станет незабываемым.
          </div>
        )}
      </div>
      <div className="attractions">
        {attractions.map((attraction, index) => (
          <div className="card" key={index}>
            <img src={attraction.image} alt={attraction.title} className="card-image" />
            <h3 className="card-title">{attraction.title}</h3>
            <p className="card-description">{attraction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
