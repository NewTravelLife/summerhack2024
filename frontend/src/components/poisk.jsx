import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../index.css';
import image1 from '../assets/image0.png';
import image2 from '../assets/image00.png';
import image3 from '../assets/image000.png';
import image4 from '../assets/image000.png';
import strelkaUrl from '../assets/strelka.png';
import bac from '../assets/bac.png';
import MapComponent from "../components/map.jsx";
const Poisk = () => {
    const [checked, setChecked] = useState({
        word1: false,
        word2: false,
        word3: false,
      });
    
      const handleSelect = (word) => {
        setChecked((prevChecked) => ({ ...prevChecked, [word]: !prevChecked[word] }));
      };
    

      const attractions = [
        {
          image: image1,
          title: 'Достопримечательность 1'
        },
        {
          image: image2,
          title: 'Достопримечательность 2'

        },
    
        {
          image: image3,
          title: 'Достопримечательность 4'


        },
        {
          image: image4,
          title: 'Достопримечательность 8'

        }
      ];
      const start = {
        lat: 55.782982,
        lng: 37.63385
    }
    const end = {
        lat: 59.929984,
        lng: 30.362158
    }
    

  return (
    <div>
      <div className="header">
      <Link to="/">
        <div className="project-name">newtravel.life</div>
        </Link>
        <div className="nav-buttons">
          <button className="nav-button">Жильё</button>
          <button className="nav-button">Питание</button>
          <button className="nav-button">Мои путешествия</button>
          <Link to="/poisk">
            <button className="nav-button">Создать путешествие</button>
          </Link>
        </div>
      </div>
      
      <div className="text-container0">
                  <div className="animated-text0">
                          Помошник в составлении вашего идеального путешествия
                  </div>
              </div>
              <img src={bac} className='bac' alt="" />
              <div className='box-container'>
                  <h1 className='textt'>Выбери свой маршрут</h1>
                  <p className='sposob'>Способ передвижения:</p>
                  <div className="checkpoints">
        <label>
          Авто
          <input type="checkbox" className='chek0' checked={checked.word1} onChange={() => handleSelect('word1')} />
        </label>
        <br />
        <label>
          ЖД
          <input type="checkbox" className='chek1' checked={checked.word2} onChange={() => handleSelect('word2')} />
        </label>
        <br />
        <label>
          АВИА
          <input type="checkbox" className='chek2' checked={checked.word3} onChange={() => handleSelect('word3')} />
        </label>
      </div>
      <div className='forma'>
          <button className='poisk'>Составить</button>
      <img src={strelkaUrl} className='strelka' alt="" />
          <div className='Otpravka' >
              <p>Город отправления:</p>
              <input className='input-otprav' placeholder="Название" type="text" />
          </div>
          <div className='Priezd'  >
              <p>Город прибытия:</p>
              <input className='input-otprav ' placeholder="Название" type="text" />
          </div>
      </div>
      </div>
      <div>
        <h1>Карта местности</h1>
        <MapComponent start={start} end={end}/>
      </div>
    </div>

  );
};

export default Poisk;