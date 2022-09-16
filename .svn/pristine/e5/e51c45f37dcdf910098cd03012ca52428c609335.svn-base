import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-medical-treatment.reducer';

export const KemrMedicalTreatmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrMedicalTreatmentEntity = useAppSelector(state => state.kemrMedicalTreatment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrMedicalTreatmentDetailsHeading">Kemr Medical Treatment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrMedicalTreatmentEntity.id}</dd>
          <dt>
            <span id="kemrMedicalTreatmentDoctorNote">Kemr Medical Treatment Doctor Note</span>
          </dt>
          <dd>{kemrMedicalTreatmentEntity.kemrMedicalTreatmentDoctorNote}</dd>
          <dt>
            <span id="kemrMedicalTreatmentNurseMessage">Kemr Medical Treatment Nurse Message</span>
          </dt>
          <dd>{kemrMedicalTreatmentEntity.kemrMedicalTreatmentNurseMessage}</dd>
          <dt>
            <span id="kemrMedicalTreatmentDate">Kemr Medical Treatment Date</span>
          </dt>
          <dd>
            {kemrMedicalTreatmentEntity.kemrMedicalTreatmentDate ? (
              <TextFormat value={kemrMedicalTreatmentEntity.kemrMedicalTreatmentDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Kemr Patient</dt>
          <dd>{kemrMedicalTreatmentEntity.kemrPatient ? kemrMedicalTreatmentEntity.kemrPatient.id : ''}</dd>
          <dt>Kemr Doctor</dt>
          <dd>{kemrMedicalTreatmentEntity.kemrDoctor ? kemrMedicalTreatmentEntity.kemrDoctor.id : ''}</dd>
          <dt>Kemr Diagnosis</dt>
          <dd>{kemrMedicalTreatmentEntity.kemrDiagnosis ? kemrMedicalTreatmentEntity.kemrDiagnosis.id : ''}</dd>
          <dt>Kemr Treatment</dt>
          <dd>{kemrMedicalTreatmentEntity.kemrTreatment ? kemrMedicalTreatmentEntity.kemrTreatment.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/kemr-medical-treatment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-medical-treatment/${kemrMedicalTreatmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrMedicalTreatmentDetail;
