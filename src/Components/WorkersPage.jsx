import React from 'react';
import './styles/findpage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchImage from './images/search.png';
import FilterImage from './images/filters.png';
import Worker from './Worker';
import ListError from './ListError';
import Modal from './Modal';
import Load from './Load';
import NoFound from './NoFound';

export default class WorkersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      filterworkers: [],
      isLoading: true,
      hasError: false,
      isOpen: false,
      sortBy: 'desc',
    };
    this.setChange = this.setChange.bind(this);
    this.changeOreder = this.changeOreder.bind(this);
  }

  setChange() {
    this.setState({ isOpen: false });
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true });
  }
  componentDidMount() {
    axios
      .get('https://stoplight.io/mocks/kode-education/trainee-test/25143926/users')
      .then((response) => {
        this.setState({
          workers: response.data.items,
          filterworkers: response.data.items,
          isLoading: false,
          modalOpen: false,
        });
      })
      .catch(function (error) {
        this.setState({ hasError: true });
        console.log(error);
      });
  }

  departmentFilter(val) {
    this.setState({ isLoading: true });
    axios
      .get('https://stoplight.io/mocks/kode-education/trainee-test/25143926/users')
      .then((response) => {
        this.setState({
          workers: response.data.items.filter((item) => item.department.includes(val)),
          isLoading: false,
        });
        this.setState({ filterworkers: this.state.workers });
        this.searchFilter(document.getElementsByClassName('searchline')[0].value);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  searchFilter(e) {
    const fin = this.state.workers.filter(
      (item) =>
        item.firstName.toLowerCase() === e.toLowerCase() ||
        item.lastName.toLowerCase() === e.toLowerCase() ||
        item.userTag.includes(e.toUpperCase()),
    );
    this.setState({ filterworkers: fin });
  }

  changeOreder(e) {
    this.setState({ sortBy: e });
  }
  recordList() {
    if (this.state.filterworkers.length !== 0) {
      if (this.state.sortBy === 'desc') {
        return this.state.filterworkers
          .sort(function (a, b) {
            if (a.firstName < b.firstName) {
              return -1;
            }
            if (a.firstName > b.firstName) {
              return 1;
            }
            return 0;
          })
          .map((currentrecord) => {
            return <Worker record={currentrecord} key={currentrecord.id} />;
          });
      } else {
        return this.state.filterworkers
          .sort(function (a, b) {
            if (
              new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth() !== 0 &&
              new Date(a.birthday).getMonth() - new Date().getMonth() >= 0
            ) {
              
              return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth();
            } else {
              if (new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth() !== 0) {
                return new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth();
              } else {
                return new Date(a.birthday).getDate() - new Date(b.birthday).getDate();
              }
            }
          })
          .reverse()
          .map((currentrecord) => {
            return <Worker record={currentrecord} key={currentrecord.id} />;
          });
      }
    } else {
      return (
        <>
          <NoFound />;
        </>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="title">
          <h1>Поиск</h1>
        </div>
        <div className="searchline-container">
          <span>
            <img src={SearchImage} alt="img" className="searchicon" />
          </span>

          <span>
            <img
              src={FilterImage}
              alt="img"
              className="filtericon"
              onClick={() => this.setState({ isOpen: true })}
            />
          </span>
          <input
            className="searchline"
            type="text"
            placeholder="Введите имя, тег, почту..."
            onChange={(e) => this.searchFilter(e.target.value)}
          />
        </div>
        <Modal
          isOpen={this.state.isOpen}
          setIsOpen={this.setChange}
          order={this.state.sortBy}
          orderfunc={this.changeOreder}
        />
        <div>
          <ul className="list-selector">
            <li>
              <Link to="/" onClick={() => this.departmentFilter('')}>
                Все
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => this.departmentFilter('design')}>
                Designers
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => this.departmentFilter('analytics')}>
                Analysts
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => this.departmentFilter('management')}>
                Managers
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => this.departmentFilter('ios')}>
                iOS
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => this.departmentFilter('android')}>
                Android
              </Link>
            </li>
          </ul>
        </div>
        {this.state.isLoading ? (
          <div>
            <Load />
          </div>
        ) : (
          <div>
            {this.state.hasError ? (
              <>
                <ListError />
              </>
            ) : (
              <>{this.recordList()} </>
            )}
          </div>
        )}
      </div>
    );
  }
}
