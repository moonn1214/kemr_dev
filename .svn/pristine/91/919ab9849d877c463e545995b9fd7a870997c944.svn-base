import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrReservation } from 'app/shared/model/kemr-reservation.model';
import { getEntities } from './kemr-reservation.reducer';

export const KemrReservation = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrReservationList = useAppSelector(state => state.kemrReservation.entities);
  const loading = useAppSelector(state => state.kemrReservation.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="kemr-reservation-heading" data-cy="KemrReservationHeading">
        Kemr Reservations
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/kemr-reservation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Kemr Reservation
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {kemrReservationList && kemrReservationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Kemr Reservation Status</th>
                <th>Kemr Reservation New Patient Name</th>
                <th>Kemr Reservation New Patient Phone</th>
                <th>Kemr Reservation Date</th>
                <th>Kemr Reservation Time</th>
                <th>Kemr Patient</th>
                <th>Kemr Doctor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kemrReservationList.map((kemrReservation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/kemr-reservation/${kemrReservation.id}`} color="link" size="sm">
                      {kemrReservation.id}
                    </Button>
                  </td>
                  <td>{kemrReservation.kemrReservationStatus}</td>
                  <td>{kemrReservation.kemrReservationNewPatientName}</td>
                  <td>{kemrReservation.kemrReservationNewPatientPhone}</td>
                  <td>
                    {kemrReservation.kemrReservationDate ? (
                      <TextFormat type="date" value={kemrReservation.kemrReservationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{kemrReservation.kemrReservationTime}</td>
                  <td>
                    {kemrReservation.kemrPatient ? (
                      <Link to={`/kemr-patient/${kemrReservation.kemrPatient.id}`}>{kemrReservation.kemrPatient.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {kemrReservation.kemrDoctor ? (
                      <Link to={`/kemr-doctor/${kemrReservation.kemrDoctor.id}`}>{kemrReservation.kemrDoctor.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/kemr-reservation/${kemrReservation.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-reservation/${kemrReservation.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-reservation/${kemrReservation.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">삭제</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Kemr Reservations found</div>
        )}
      </div>
    </div>
  );
};

export default KemrReservation;
