import React from 'react';
import './styles/load.css';

const DataLoad = () => {
  for (let i = 0; i < Math.floor(window.outerHeight / 173); i++) {
    return (
      <div key={i}>
        <div className="load-container">
          <div className="circle"></div>
          <div className="load-info">
            <div className="load-text"></div>
            <div className="load-additional-text"></div>
          </div>
        </div>
      </div>
    );
  }
};
const Load = () => {
  const content = [];
  for (let i = 0; i < Math.floor(document.documentElement.scrollHeight / 153); i++) {
    content.push(<DataLoad key={i} />);
  }
  return content;
};

export default Load;
