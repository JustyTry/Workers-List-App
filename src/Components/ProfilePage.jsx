import React from 'react';
import './styles/profilepage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from './images/back.png';
import Star from './images/star.png';
import Phone from './images/phone.png';
export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
    };
  }
  componentDidMount() {
    const userid = window.location.href.split('/')[4];
    axios
      .get('https://stoplight.io/mocks/kode-education/trainee-test/25143926/users')
      .then((response) => {
        const data = response.data.items.find((el) => el.id === userid);
        this.setState({
          record: data,
        });
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    var ages = new Date().getFullYear() - new Date(this.state.record.birthday).getFullYear();
    if (
      new Date(this.state.record.birthday).getMonth > new Date().getMonth() ||
      (new Date(this.state.record.birthday).getMonth === new Date().getMonth() &&
        new Date().getDate() <= new Date(this.state.record.birthday).getDate())
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
    const date = new Date(this.state.record.birthday);
    var phone = this.state.record.phone;
    console.log(phone);
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
    return (
      <>
        {ages !== undefined && date !== undefined && phone !== undefined && months !== undefined && (
          <div>
            <div className="profile-info">
              <Link to="/">
                <img src={Image} alt="img" className="back-button" />
              </Link>
              <img className="profile-img" src={this.state.record.avatarUrl} alt="img" />
              <div className="details">
                <span> {this.state.record.firstName} </span>
                <span>{this.state.record.lastName}</span>
                <span className="profile-tag"> {this.state.record.userTag}</span>
              </div>
              <div>
                <div className="profile-departament">{this.state.record.department}</div>
              </div>
            </div>
            <div className="profile-body">
              <div className="age">
                <img src={Star} alt="img" className="image"></img>
                <div className="birthday">
                  {new Date(this.state.record.birthday).getDate()} {months[date.getMonth()]}
                  {new Date(this.state.record.birthday).getFullYear()}
                </div>
                <div className="ages">{ages}</div>
              </div>
              <div className="contacts">
                <div>
                  <img src={Phone} alt="img" className="image" />
                  <div className="birthday">+7 {this.state.record.phone}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
