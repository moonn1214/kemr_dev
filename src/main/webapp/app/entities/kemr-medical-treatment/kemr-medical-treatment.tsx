import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrMedicalTreatment } from 'app/shared/model/kemr-medical-treatment.model';
import { getEntities } from './kemr-medical-treatment.reducer';

export const KemrMedicalTreatment = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrMedicalTreatmentList = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const loading = useAppSelector(state => state.kemrMedicalTreatment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="kemr-medical-treatment-heading" data-cy="KemrMedicalTreatmentHeading">
        Kemr Medical Treatments
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/kemr-medical-treatment/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Kemr Medical Treatment
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {kemrMedicalTreatmentList && kemrMedicalTreatmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Kemr Medical Treatment Doctor Note</th>
                <th>Kemr Medical Treatment Nurse Message</th>
                <th>Kemr Medical Treatment Date</th>
                <th>Kemr Patient</th>
                <th>Kemr Doctor</th>
                <th>Kemr Diagnosis</th>
                <th>Kemr Treatment</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kemrMedicalTreatmentList.map((kemrMedicalTreatment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/kemr-medical-treatment/${kemrMedicalTreatment.id}`} color="link" size="sm">
                      {kemrMedicalTreatment.id}
                    </Button>
                  </td>
                  <td>{kemrMedicalTreatment.kemrMedicalTreatmentDoctorNote}</td>
                  <td>{kemrMedicalTreatment.kemrMedicalTreatmentNurseMessage}</td>
                  <td>
                    {kemrMedicalTreatment.kemrMedicalTreatmentDate ? (
                      <TextFormat type="date" value={kemrMedicalTreatment.kemrMedicalTreatmentDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {kemrMedicalTreatment.kemrPatient ? (
                      <Link to={`/kemr-patient/${kemrMedicalTreatment.kemrPatient.id}`}>{kemrMedicalTreatment.kemrPatient.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {kemrMedicalTreatment.kemrDoctor ? (
                      <Link to={`/kemr-doctor/${kemrMedicalTreatment.kemrDoctor.id}`}>{kemrMedicalTreatment.kemrDoctor.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {kemrMedicalTreatment.kemrDiagnosis ? (
                      <Link to={`/kemr-diagnosis/${kemrMedicalTreatment.kemrDiagnosis.id}`}>{kemrMedicalTreatment.kemrDiagnosis.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {kemrMedicalTreatment.kemrTreatment ? (
                      <Link to={`/kemr-treatment/${kemrMedicalTreatment.kemrTreatment.id}`}>{kemrMedicalTreatment.kemrTreatment.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/kemr-medical-treatment/${kemrMedicalTreatment.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-medical-treatment/${kemrMedicalTreatment.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-medical-treatment/${kemrMedicalTreatment.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Kemr Medical Treatments found</div>
        )}
      </div>
    </div>
  );
};

export default KemrMedicalTreatment;
