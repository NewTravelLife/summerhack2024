import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../index.css';
import strelkaUrl from '../assets/strelka.png';
import bac from '../assets/bac.png';
const Poisk = () => {
    const [checked, setChecked] = useState({
        word1: false,
        word2: false,
        word3: false,
      });
    
      const handleSelect = (word) => {
        setChecked((prevChecked) => ({ ...prevChecked, [word]: !prevChecked[word] }));
      };
    

    
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
  </div>
  );
};

export default Poisk;