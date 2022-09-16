import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrDoctor } from 'app/shared/model/kemr-doctor.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-doctor.reducer';

export const KemrDoctorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrDoctorEntity = useAppSelector(state => state.kemrDoctor.entity);
  const loading = useAppSelector(state => state.kemrDoctor.loading);
  const updating = useAppSelector(state => state.kemrDoctor.updating);
  const updateSuccess = useAppSelector(state => state.kemrDoctor.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-doctor');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...kemrDoctorEntity,
      ...values,
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
          ...kemrDoctorEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrDoctor.home.createOrEditLabel" data-cy="KemrDoctorCreateUpdateHeading">
            Create or edit a Kemr Doctor
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="kemr-doctor-id" label="Id" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Kemr Doctor Name"
                id="kemr-doctor-kemrDoctorName"
                name="kemrDoctorName"
                data-cy="kemrDoctorName"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Doctor Field"
                id="kemr-doctor-kemrDoctorField"
                name="kemrDoctorField"
                data-cy="kemrDoctorField"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-doctor" replace color="info">
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

export default KemrDoctorUpdate;
