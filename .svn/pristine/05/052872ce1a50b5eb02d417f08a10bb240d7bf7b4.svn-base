import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-diagnosis.reducer';

export const KemrDiagnosisDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrDiagnosisEntity = useAppSelector(state => state.kemrDiagnosis.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrDiagnosisDetailsHeading">Kemr Diagnosis</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrDiagnosisEntity.id}</dd>
          <dt>
            <span id="kemrDiagnosisName">Kemr Diagnosis Name</span>
          </dt>
          <dd>{kemrDiagnosisEntity.kemrDiagnosisName}</dd>
        </dl>
        <Button tag={Link} to="/kemr-diagnosis" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-diagnosis/${kemrDiagnosisEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrDiagnosisDetail;
