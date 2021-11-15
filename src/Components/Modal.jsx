import React from 'react';
import './styles/modal.css';
import Image from './images/cross.png';

const Modal = ({ isOpen, setIsOpen, order, orderfunc }) => {
  console.log(isOpen, setIsOpen, order);
  return (
    <div>
      {isOpen === true && (
        <div className="modal-overlay" onClick={() => setIsOpen()}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Сортировка</div>
            </div>
            <div className="modal-body">
              <img src={Image} className="cross-icon" alt="img" onClick={() => setIsOpen()} />
              <div className="modal-radio1">
                {order === 'desc' ? (
                  <input
                    type="radio"
                    defaultChecked
                    name="sort"
                    value="desc"
                    onChange={(e) => orderfunc(e.target.value)}
                    onClick={() => setIsOpen()}
                  />
                ) : (
                  <input
                    type="radio"
                    value="desc"
                    name="sort"
                    onChange={(e) => orderfunc(e.target.value)}
                    onClick={() => setIsOpen()}
                  />
                )}
                <span className="checkmark"></span>
                <label>По алфавту</label>
              </div>
              <div className="modal-radio2">
                {order === 'birthday' ? (
                  <input
                    type="radio"
                    value="birthday"
                    defaultChecked
                    name="sort"
                    onChange={(e) => orderfunc(e.target.value)}
                    onClick={() => setIsOpen()}
                  />
                ) : (
                  <input
                    type="radio"
                    value="birthday"
                    name="sort"
                    onChange={(e) => orderfunc(e.target.value)}
                    onClick={() => setIsOpen()}
                  />
                )}
                <label>По дню рождения</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
