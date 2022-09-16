import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-reservation.reducer';

export const KemrReservationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrReservationEntity = useAppSelector(state => state.kemrReservation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrReservationDetailsHeading">Kemr Reservation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrReservationEntity.id}</dd>
          <dt>
            <span id="kemrReservationStatus">Kemr Reservation Status</span>
          </dt>
          <dd>{kemrReservationEntity.kemrReservationStatus}</dd>
          <dt>
            <span id="kemrReservationNewPatientName">Kemr Reservation New Patient Name</span>
          </dt>
          <dd>{kemrReservationEntity.kemrReservationNewPatientName}</dd>
          <dt>
            <span id="kemrReservationNewPatientPhone">Kemr Reservation New Patient Phone</span>
          </dt>
          <dd>{kemrReservationEntity.kemrReservationNewPatientPhone}</dd>
          <dt>
            <span id="kemrReservationDate">Kemr Reservation Date</span>
          </dt>
          <dd>
            {kemrReservationEntity.kemrReservationDate ? (
              <TextFormat value={kemrReservationEntity.kemrReservationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrReservationTime">Kemr Reservation Time</span>
          </dt>
          <dd>{kemrReservationEntity.kemrReservationTime}</dd>
          <dt>Kemr Patient</dt>
          <dd>{kemrReservationEntity.kemrPatient ? kemrReservationEntity.kemrPatient.id : ''}</dd>
          <dt>Kemr Doctor</dt>
          <dd>{kemrReservationEntity.kemrDoctor ? kemrReservationEntity.kemrDoctor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/kemr-reservation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-reservation/${kemrReservationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrReservationDetail;
