import { Link } from 'react-router-dom';

const WorkerData = (props) => {
  const months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Мая',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];
  return (
    <div>
      <div className="worker-container">
        <Link to={`/Profile/${props.record.id}`}>
          <img className="worker-avatar" src={props.record.avatarUrl} alt="img" />
        </Link>
        <div className="worker-info">
          <div>
            <span className="worker-name">
              <Link
                style={{ textDecoration: 'none', color: '#000' }}
                to={{ pathname: `/profile/${props.record.id}`, state: { record: props.record } }}>
                {props.record.firstName} {props.record.lastName}
              </Link>
            </span>
            <span className="worker-tag"> {props.record.userTag.toLowerCase()}</span>
          </div>
          <div>
            <span className="worker-departament">
              {props.record.position} {props.record.department}
            </span>
          </div>
        </div>
        {props.order === 'birthday' && (
          <span className="birth-day">
            {new Date(props.record.birthday).getDate()}{' '}
            {months[new Date(props.record.birthday).getMonth()]}
          </span>
        )}
      </div>
    </div>
  );
};

const Worker = (props) => {
  return (
    <div>
      <WorkerData record={props.record} order={props.order} key={props.record.id} />
    </div>
  );
};
export default Worker;
