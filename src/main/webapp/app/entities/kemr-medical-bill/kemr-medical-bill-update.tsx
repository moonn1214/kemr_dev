import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrMedicalTreatment } from 'app/shared/model/kemr-medical-treatment.model';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { IKemrMedicalBill } from 'app/shared/model/kemr-medical-bill.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-medical-bill.reducer';

export const KemrMedicalBillUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBillEntity = useAppSelector(state => state.kemrMedicalBill.entity);
  const loading = useAppSelector(state => state.kemrMedicalBill.loading);
  const updating = useAppSelector(state => state.kemrMedicalBill.updating);
  const updateSuccess = useAppSelector(state => state.kemrMedicalBill.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-medical-bill');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getKemrMedicalTreatments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...kemrMedicalBillEntity,
      ...values,
      kemrMedicalTreatment: kemrMedicalTreatments.find(it => it.id.toString() === values.kemrMedicalTreatment.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...kemrMedicalBillEntity,
          kemrMedicalTreatment: kemrMedicalBillEntity?.kemrMedicalTreatment?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalBill.home.createOrEditLabel" data-cy="KemrMedicalBillCreateUpdateHeading">
            Create or edit a Kemr Medical Bill
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="kemr-medical-bill-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Kemr Medical Bill Total"
                id="kemr-medical-bill-kemrMedicalBillTotal"
                name="kemrMedicalBillTotal"
                data-cy="kemrMedicalBillTotal"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  validate: v => isNumber(v) || '숫자만 입력 가능합니다.',
                }}
              />
              <ValidatedField
                label="Kemr Medical Bill Nhs Share"
                id="kemr-medical-bill-kemrMedicalBillNhsShare"
                name="kemrMedicalBillNhsShare"
                data-cy="kemrMedicalBillNhsShare"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  validate: v => isNumber(v) || '숫자만 입력 가능합니다.',
                }}
              />
              <ValidatedField
                label="Kemr Medical Bill Patient Share"
                id="kemr-medical-bill-kemrMedicalBillPatientShare"
                name="kemrMedicalBillPatientShare"
                data-cy="kemrMedicalBillPatientShare"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  validate: v => isNumber(v) || '숫자만 입력 가능합니다.',
                }}
              />
              <ValidatedField
                label="Kemr Medical Bill Method"
                id="kemr-medical-bill-kemrMedicalBillMethod"
                name="kemrMedicalBillMethod"
                data-cy="kemrMedicalBillMethod"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 1, message: '최대 1자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Medical Bill Delivery Type"
                id="kemr-medical-bill-kemrMedicalBillDeliveryType"
                name="kemrMedicalBillDeliveryType"
                data-cy="kemrMedicalBillDeliveryType"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 1, message: '최대 1자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Medical Bill Cash Receipt"
                id="kemr-medical-bill-kemrMedicalBillCashReceipt"
                name="kemrMedicalBillCashReceipt"
                data-cy="kemrMedicalBillCashReceipt"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                id="kemr-medical-bill-kemrMedicalTreatment"
                name="kemrMedicalTreatment"
                data-cy="kemrMedicalTreatment"
                label="Kemr Medical Treatment"
                type="select"
              >
                <option value="" key="0" />
                {kemrMedicalTreatments
                  ? kemrMedicalTreatments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-medical-bill" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">뒤로</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; 저장
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default KemrMedicalBillUpdate;
