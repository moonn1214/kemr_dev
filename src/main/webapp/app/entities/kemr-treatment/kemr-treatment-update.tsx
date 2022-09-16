import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrTreatment } from 'app/shared/model/kemr-treatment.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-treatment.reducer';

export const KemrTreatmentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrTreatmentEntity = useAppSelector(state => state.kemrTreatment.entity);
  const loading = useAppSelector(state => state.kemrTreatment.loading);
  const updating = useAppSelector(state => state.kemrTreatment.updating);
  const updateSuccess = useAppSelector(state => state.kemrTreatment.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-treatment');
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
      ...kemrTreatmentEntity,
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
          ...kemrTreatmentEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrTreatment.home.createOrEditLabel" data-cy="KemrTreatmentCreateUpdateHeading">
            Create or edit a Kemr Treatment
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
                <ValidatedField name="id" required readOnly id="kemr-treatment-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Kemr Treatment Name"
                id="kemr-treatment-kemrTreatmentName"
                name="kemrTreatmentName"
                data-cy="kemrTreatmentName"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-treatment" replace color="info">
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

export default KemrTreatmentUpdate;
