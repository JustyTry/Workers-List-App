import React from 'react';
import './styles/errors.css';
import Image from './images/notfound.png';

const NoFound = () => {
  return (
    <div>
      <div className="container">
        <div>
          <img className="notfound-icon" src={Image} alt="img" />
        </div>
        <div className="text">
          <div className="message">Мы никого не нашли</div>
          <div className="submessage">Попробуйте скорректировать поиск</div>
        </div>
      </div>
    </div>
  );
};

export default NoFound;
