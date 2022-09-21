import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrReservation } from 'app/shared/model/kemr-reservation.model';
import { getEntities } from './kemr-reservation.reducer';
import Calendar from 'react-calendar';
import { render } from 'react-dom';
import 'react-calendar/dist/Calendar.css';
import { log } from 'console';
import moment from 'moment';

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar">
      <h1 className="text-center">예약 달력</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
        <div className="text-gray-500 mt-4">{moment(date).format('YYYY년 MM원 DD일')}</div>
      </div>
    </div>
  );
};

export default ReactCalendar;
