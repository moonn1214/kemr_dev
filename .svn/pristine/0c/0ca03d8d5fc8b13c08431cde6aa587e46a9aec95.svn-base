import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrPrescription } from 'app/shared/model/kemr-prescription.model';
import { getEntities } from './kemr-prescription.reducer';

export const KemrPrescription = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrPrescriptionList = useAppSelector(state => state.kemrPrescription.entities);
  const loading = useAppSelector(state => state.kemrPrescription.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="kemr-prescription-heading" data-cy="KemrPrescriptionHeading">
        Kemr Prescriptions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/kemr-prescription/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Kemr Prescription
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {kemrPrescriptionList && kemrPrescriptionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Kemr Medicine</th>
                <th>Kemr Medical Treatment</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kemrPrescriptionList.map((kemrPrescription, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/kemr-prescription/${kemrPrescription.id}`} color="link" size="sm">
                      {kemrPrescription.id}
                    </Button>
                  </td>
                  <td>
                    {kemrPrescription.kemrMedicine ? (
                      <Link to={`/kemr-medicine/${kemrPrescription.kemrMedicine.id}`}>{kemrPrescription.kemrMedicine.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {kemrPrescription.kemrMedicalTreatment ? (
                      <Link to={`/kemr-medical-treatment/${kemrPrescription.kemrMedicalTreatment.id}`}>
                        {kemrPrescription.kemrMedicalTreatment.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/kemr-prescription/${kemrPrescription.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-prescription/${kemrPrescription.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-prescription/${kemrPrescription.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Kemr Prescriptions found</div>
        )}
      </div>
    </div>
  );
};

export default KemrPrescription;
