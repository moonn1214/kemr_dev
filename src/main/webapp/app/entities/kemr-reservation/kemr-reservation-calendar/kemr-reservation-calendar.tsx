import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrReservation } from 'app/shared/model/kemr-reservation.model';
import './kemr-reservation-calendar.scss';

import Calendar from 'react-calendar';
import { render } from 'react-dom';
// import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { log } from 'console';

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const selectDate = moment(date).format('YYYY-MM-DD HH:mm');

  // 데이터 값을 넘겨 줘야하는데 아마도 이벤트 중복에 의해서 값이 현재 값이 넘어가는거 같다  확인 후 개발
  // console.log(selectDate);
  const creatNewReservation = event => {
    const eventData = moment(event).format('YYYY-MM-DD HH:mm');
    navigate('/kemr-reservation/new', { state: eventData });
  };

  return (
    <div className="calendar">
      <div className="calendar-container">
        <Calendar
          value={date}
          minDate={new Date()}
          onClickDay={event => {
            creatNewReservation(event);
          }}
        />

      </div>
    </div>
  );
};

export default ReactCalendar;
