import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-prescription.reducer';

export const KemrPrescriptionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrPrescriptionEntity = useAppSelector(state => state.kemrPrescription.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrPrescriptionDetailsHeading">Kemr Prescription</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrPrescriptionEntity.id}</dd>
          <dt>Kemr Medicine</dt>
          <dd>{kemrPrescriptionEntity.kemrMedicine ? kemrPrescriptionEntity.kemrMedicine.id : ''}</dd>
          <dt>Kemr Medical Treatment</dt>
          <dd>{kemrPrescriptionEntity.kemrMedicalTreatment ? kemrPrescriptionEntity.kemrMedicalTreatment.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/kemr-prescription" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-prescription/${kemrPrescriptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrPrescriptionDetail;
