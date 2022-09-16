import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrDiagnosis } from 'app/shared/model/kemr-diagnosis.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-diagnosis.reducer';

export const KemrDiagnosisUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrDiagnosisEntity = useAppSelector(state => state.kemrDiagnosis.entity);
  const loading = useAppSelector(state => state.kemrDiagnosis.loading);
  const updating = useAppSelector(state => state.kemrDiagnosis.updating);
  const updateSuccess = useAppSelector(state => state.kemrDiagnosis.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-diagnosis');
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
      ...kemrDiagnosisEntity,
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
          ...kemrDiagnosisEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrDiagnosis.home.createOrEditLabel" data-cy="KemrDiagnosisCreateUpdateHeading">
            Create or edit a Kemr Diagnosis
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
                <ValidatedField name="id" required readOnly id="kemr-diagnosis-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Kemr Diagnosis Name"
                id="kemr-diagnosis-kemrDiagnosisName"
                name="kemrDiagnosisName"
                data-cy="kemrDiagnosisName"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-diagnosis" replace color="info">
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

export default KemrDiagnosisUpdate;
