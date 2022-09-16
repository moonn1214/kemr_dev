import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-doctor.reducer';

export const KemrDoctorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrDoctorEntity = useAppSelector(state => state.kemrDoctor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrDoctorDetailsHeading">Kemr Doctor</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrDoctorEntity.id}</dd>
          <dt>
            <span id="kemrDoctorName">Kemr Doctor Name</span>
          </dt>
          <dd>{kemrDoctorEntity.kemrDoctorName}</dd>
          <dt>
            <span id="kemrDoctorField">Kemr Doctor Field</span>
          </dt>
          <dd>{kemrDoctorEntity.kemrDoctorField}</dd>
        </dl>
        <Button tag={Link} to="/kemr-doctor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-doctor/${kemrDoctorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrDoctorDetail;
