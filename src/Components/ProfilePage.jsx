import React from 'react';
import './styles/profilepage.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Image from './images/back.png';
import Star from './images/star.png';
import Phone from './images/phone.png';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [records, setRecords] = useState({});
  const [phone, setPhone] = useState('');

  const location = useLocation();
  var ages = new Date().getFullYear() - new Date(records.birthday).getFullYear();
  if (
    new Date(records.birthday).getMonth > new Date().getMonth() ||
    (new Date(records.birthday).getMonth === new Date().getMonth() &&
      new Date().getDate() <= new Date(records.birthday).getDate())
  ) {
    ages = ages + 1;
  }
  if (ages.toString()[ages.toString().length - 1] === '1') {
    ages = `${ages.toString()} Год`;
  }

  if (parseInt(ages.toString()[ages.toString().length - 1]) > 4) {
    ages = `${ages.toString()} Лет`;
  } else {
    ages = `${ages.toString()} Года`;
  }
  const date = new Date(records.birthday);
  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://stoplight.io/mocks/kode-education/trainee-test/25143926/users',
        );

        const userId = location.pathname.split('/')[2];

        const records = response.data.items.find((el) => el.id === userId);
        setRecords(records);
        setPhone(records.phone.split('-'));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {phone && (
        <div>
          <div className="profile-info">
            <Link to="/">
              <img src={Image} alt="img" className="back-button" />
            </Link>
            <img className="profile-img" src={records.avatarUrl} alt="img" />
            <div className="details">
              <span> {records.firstName} </span>
              <span>{records.lastName}</span>
              <span className="profile-tag"> {records.userTag}</span>
            </div>
            <div>
              <div className="profile-departament">{records.department}</div>
            </div>
          </div>
          <div className="profile-body">
            <div className="age">
              <img src={Star} alt="img" className="image"></img>
              <div className="birthday">
                {new Date(records.birthday).getDate()} {months[date.getMonth()]}{' '}
                {new Date(records.birthday).getFullYear()}
              </div>
              <div className="ages">{ages}</div>
            </div>
            <div className="contacts">
              <div>
                <img src={Phone} alt="img" className="image" />
                <a href="https://www.whatsapp.com/?lang=ru">
                  <div className="birthday">
                    +7 ({phone[0]}) {phone[1]} {phone[2].slice(0, 2)} {phone[2].slice(2, 4)}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
