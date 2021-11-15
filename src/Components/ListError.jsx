import React from 'react';
import './styles/errors.css';
import Image from './images/errorimg.png';

const ListError = () => {
  return (
    <div>
      <div className="container">
        <div>
          <img className="error-icon" src={Image} alt="img" />
        </div>
        <div className="text">
          <div className="message">Какой-то сверхразум все сломал</div>
          <div className="submessage">Постараемся быстро починить</div>
          <a href="/" className="retry">
            Попробовать снова
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListError;
