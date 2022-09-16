import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrInstitution } from 'app/shared/model/kemr-institution.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-institution.reducer';

export const KemrInstitutionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrInstitutionEntity = useAppSelector(state => state.kemrInstitution.entity);
  const loading = useAppSelector(state => state.kemrInstitution.loading);
  const updating = useAppSelector(state => state.kemrInstitution.updating);
  const updateSuccess = useAppSelector(state => state.kemrInstitution.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-institution');
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
    values.kemrInstitutionAgree = convertDateTimeToServer(values.kemrInstitutionAgree);
    values.kemrInstitutionModification = convertDateTimeToServer(values.kemrInstitutionModification);
    values.kemrInstitutionWithdrawal = convertDateTimeToServer(values.kemrInstitutionWithdrawal);
    values.kemrInstitutionFailtime = convertDateTimeToServer(values.kemrInstitutionFailtime);

    const entity = {
      ...kemrInstitutionEntity,
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
      ? {
          kemrInstitutionAgree: displayDefaultDateTime(),
          kemrInstitutionModification: displayDefaultDateTime(),
          kemrInstitutionWithdrawal: displayDefaultDateTime(),
          kemrInstitutionFailtime: displayDefaultDateTime(),
        }
      : {
          ...kemrInstitutionEntity,
          kemrInstitutionAgree: convertDateTimeFromServer(kemrInstitutionEntity.kemrInstitutionAgree),
          kemrInstitutionModification: convertDateTimeFromServer(kemrInstitutionEntity.kemrInstitutionModification),
          kemrInstitutionWithdrawal: convertDateTimeFromServer(kemrInstitutionEntity.kemrInstitutionWithdrawal),
          kemrInstitutionFailtime: convertDateTimeFromServer(kemrInstitutionEntity.kemrInstitutionFailtime),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrInstitution.home.createOrEditLabel" data-cy="KemrInstitutionCreateUpdateHeading">
            Create or edit a Kemr Institution
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
                <ValidatedField name="id" required readOnly id="kemr-institution-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Kemr Institution Id"
                id="kemr-institution-kemrInstitutionId"
                name="kemrInstitutionId"
                data-cy="kemrInstitutionId"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Password"
                id="kemr-institution-kemrInstitutionPassword"
                name="kemrInstitutionPassword"
                data-cy="kemrInstitutionPassword"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 60, message: '최대 60자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Name"
                id="kemr-institution-kemrInstitutionName"
                name="kemrInstitutionName"
                data-cy="kemrInstitutionName"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Department"
                id="kemr-institution-kemrInstitutionDepartment"
                name="kemrInstitutionDepartment"
                data-cy="kemrInstitutionDepartment"
                type="text"
                validate={{
                  maxLength: { value: 10, message: '최대 10자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Position"
                id="kemr-institution-kemrInstitutionPosition"
                name="kemrInstitutionPosition"
                data-cy="kemrInstitutionPosition"
                type="text"
                validate={{
                  maxLength: { value: 10, message: '최대 10자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Manager"
                id="kemr-institution-kemrInstitutionManager"
                name="kemrInstitutionManager"
                data-cy="kemrInstitutionManager"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Cellphone"
                id="kemr-institution-kemrInstitutionCellphone"
                name="kemrInstitutionCellphone"
                data-cy="kemrInstitutionCellphone"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Email"
                id="kemr-institution-kemrInstitutionEmail"
                name="kemrInstitutionEmail"
                data-cy="kemrInstitutionEmail"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 40, message: '최대 40자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Website"
                id="kemr-institution-kemrInstitutionWebsite"
                name="kemrInstitutionWebsite"
                data-cy="kemrInstitutionWebsite"
                type="text"
                validate={{
                  maxLength: { value: 40, message: '최대 40자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Agree"
                id="kemr-institution-kemrInstitutionAgree"
                name="kemrInstitutionAgree"
                data-cy="kemrInstitutionAgree"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Status"
                id="kemr-institution-kemrInstitutionStatus"
                name="kemrInstitutionStatus"
                data-cy="kemrInstitutionStatus"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 1, message: '최대 1자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Modification"
                id="kemr-institution-kemrInstitutionModification"
                name="kemrInstitutionModification"
                data-cy="kemrInstitutionModification"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Kemr Institution Withdrawal"
                id="kemr-institution-kemrInstitutionWithdrawal"
                name="kemrInstitutionWithdrawal"
                data-cy="kemrInstitutionWithdrawal"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Kemr Institution Landline"
                id="kemr-institution-kemrInstitutionLandline"
                name="kemrInstitutionLandline"
                data-cy="kemrInstitutionLandline"
                type="text"
                validate={{
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Institution Fail"
                id="kemr-institution-kemrInstitutionFail"
                name="kemrInstitutionFail"
                data-cy="kemrInstitutionFail"
                type="text"
              />
              <ValidatedField
                label="Kemr Institution Failtime"
                id="kemr-institution-kemrInstitutionFailtime"
                name="kemrInstitutionFailtime"
                data-cy="kemrInstitutionFailtime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Kemr Institution Number"
                id="kemr-institution-kemrInstitutionNumber"
                name="kemrInstitutionNumber"
                data-cy="kemrInstitutionNumber"
                type="text"
                validate={{
                  maxLength: { value: 10, message: '최대 10자 이하까지만 입력 가능합니다.' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-institution" replace color="info">
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

export default KemrInstitutionUpdate;
