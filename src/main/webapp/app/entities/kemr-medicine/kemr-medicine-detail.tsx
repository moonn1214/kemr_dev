import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-medicine.reducer';

export const KemrMedicineDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrMedicineEntity = useAppSelector(state => state.kemrMedicine.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrMedicineDetailsHeading">Kemr Medicine</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrMedicineEntity.id}</dd>
          <dt>
            <span id="kemrMedicineName">Kemr Medicine Name</span>
          </dt>
          <dd>{kemrMedicineEntity.kemrMedicineName}</dd>
          <dt>
            <span id="kemrMedicinePrice">Kemr Medicine Price</span>
          </dt>
          <dd>{kemrMedicineEntity.kemrMedicinePrice}</dd>
        </dl>
        <Button tag={Link} to="/kemr-medicine" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-medicine/${kemrMedicineEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrMedicineDetail;
