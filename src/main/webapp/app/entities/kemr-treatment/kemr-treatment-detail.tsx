import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-treatment.reducer';

export const KemrTreatmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrTreatmentEntity = useAppSelector(state => state.kemrTreatment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrTreatmentDetailsHeading">Kemr Treatment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrTreatmentEntity.id}</dd>
          <dt>
            <span id="kemrTreatmentName">Kemr Treatment Name</span>
          </dt>
          <dd>{kemrTreatmentEntity.kemrTreatmentName}</dd>
        </dl>
        <Button tag={Link} to="/kemr-treatment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-treatment/${kemrTreatmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrTreatmentDetail;
