import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrDoctor } from 'app/shared/model/kemr-doctor.model';
import { getEntities } from './kemr-doctor.reducer';

export const KemrDoctor = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrDoctorList = useAppSelector(state => state.kemrDoctor.entities);
  const loading = useAppSelector(state => state.kemrDoctor.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="kemr-doctor-heading" data-cy="KemrDoctorHeading">
        Kemr Doctors
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/kemr-doctor/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Kemr Doctor
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {kemrDoctorList && kemrDoctorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Kemr Doctor Name</th>
                <th>Kemr Doctor Field</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kemrDoctorList.map((kemrDoctor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/kemr-doctor/${kemrDoctor.id}`} color="link" size="sm">
                      {kemrDoctor.id}
                    </Button>
                  </td>
                  <td>{kemrDoctor.kemrDoctorName}</td>
                  <td>{kemrDoctor.kemrDoctorField}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/kemr-doctor/${kemrDoctor.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button tag={Link} to={`/kemr-doctor/${kemrDoctor.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                      </Button>
                      <Button tag={Link} to={`/kemr-doctor/${kemrDoctor.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">삭제</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Kemr Doctors found</div>
        )}
      </div>
    </div>
  );
};

export default KemrDoctor;
