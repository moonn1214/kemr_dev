import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrPatient } from 'app/shared/model/kemr-patient.model';
import { getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { IKemrDoctor } from 'app/shared/model/kemr-doctor.model';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
import { IKemrReservation } from 'app/shared/model/kemr-reservation.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-reservation.reducer';

export const KemrReservationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);
  const kemrReservationEntity = useAppSelector(state => state.kemrReservation.entity);
  const loading = useAppSelector(state => state.kemrReservation.loading);
  const updating = useAppSelector(state => state.kemrReservation.updating);
  const updateSuccess = useAppSelector(state => state.kemrReservation.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-reservation');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.kemrReservationDate = convertDateTimeToServer(values.kemrReservationDate);

    const entity = {
      ...kemrReservationEntity,
      ...values,
      kemrPatient: kemrPatients.find(it => it.id.toString() === values.kemrPatient.toString()),
      kemrDoctor: kemrDoctors.find(it => it.id.toString() === values.kemrDoctor.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          kemrReservationDate: displayDefaultDateTime(),
        }
      : {
          ...kemrReservationEntity,
          kemrReservationDate: convertDateTimeFromServer(kemrReservationEntity.kemrReservationDate),
          kemrPatient: kemrReservationEntity?.kemrPatient?.id,
          kemrDoctor: kemrReservationEntity?.kemrDoctor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrReservation.home.createOrEditLabel" data-cy="KemrReservationCreateUpdateHeading">
            Create or edit a Kemr Reservation
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
                <ValidatedField name="id" required readOnly id="kemr-reservation-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Kemr Reservation Status"
                id="kemr-reservation-kemrReservationStatus"
                name="kemrReservationStatus"
                data-cy="kemrReservationStatus"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 1, message: '최대 1자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Reservation New Patient Name"
                id="kemr-reservation-kemrReservationNewPatientName"
                name="kemrReservationNewPatientName"
                data-cy="kemrReservationNewPatientName"
                type="text"
                validate={{
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Reservation New Patient Phone"
                id="kemr-reservation-kemrReservationNewPatientPhone"
                name="kemrReservationNewPatientPhone"
                data-cy="kemrReservationNewPatientPhone"
                type="text"
                validate={{
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Reservation Date"
                id="kemr-reservation-kemrReservationDate"
                name="kemrReservationDate"
                data-cy="kemrReservationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Reservation Time"
                id="kemr-reservation-kemrReservationTime"
                name="kemrReservationTime"
                data-cy="kemrReservationTime"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  validate: v => isNumber(v) || '숫자만 입력 가능합니다.',
                }}
              />
              <ValidatedField id="kemr-reservation-kemrPatient" name="kemrPatient" data-cy="kemrPatient" label="Kemr Patient" type="select">
                <option value="" key="0" />
                {kemrPatients
                  ? kemrPatients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="kemr-reservation-kemrDoctor" name="kemrDoctor" data-cy="kemrDoctor" label="Kemr Doctor" type="select">
                <option value="" key="0" />
                {kemrDoctors
                  ? kemrDoctors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-reservation" replace color="info">
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

export default KemrReservationUpdate;
