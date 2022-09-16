import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-medical-bill.reducer';

export const KemrMedicalBillDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrMedicalBillEntity = useAppSelector(state => state.kemrMedicalBill.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrMedicalBillDetailsHeading">Kemr Medical Bill</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrMedicalBillEntity.id}</dd>
          <dt>
            <span id="kemrMedicalBillTotal">Kemr Medical Bill Total</span>
          </dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalBillTotal}</dd>
          <dt>
            <span id="kemrMedicalBillNhsShare">Kemr Medical Bill Nhs Share</span>
          </dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalBillNhsShare}</dd>
          <dt>
            <span id="kemrMedicalBillPatientShare">Kemr Medical Bill Patient Share</span>
          </dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalBillPatientShare}</dd>
          <dt>
            <span id="kemrMedicalBillMethod">Kemr Medical Bill Method</span>
          </dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalBillMethod}</dd>
          <dt>
            <span id="kemrMedicalBillDeliveryType">Kemr Medical Bill Delivery Type</span>
          </dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalBillDeliveryType}</dd>
          <dt>
            <span id="kemrMedicalBillCashReceipt">Kemr Medical Bill Cash Receipt</span>
          </dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalBillCashReceipt}</dd>
          <dt>Kemr Medical Treatment</dt>
          <dd>{kemrMedicalBillEntity.kemrMedicalTreatment ? kemrMedicalBillEntity.kemrMedicalTreatment.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/kemr-medical-bill" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-medical-bill/${kemrMedicalBillEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrMedicalBillDetail;
