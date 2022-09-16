import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Input, ButtonToolbar } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrPatient } from 'app/shared/model/kemr-patient.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-patient.reducer';
import ModalLink from './kemr-patient-search-modal';
import { getEntities } from './kemr-patient.reducer';
import Header from 'app/shared/layout/header/header';
import EntitiesMenu from '../menu';

export const KemrPatientUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrPatientEntity = useAppSelector(state => state.kemrPatient.entity);
  const loading = useAppSelector(state => state.kemrPatient.loading);
  const updating = useAppSelector(state => state.kemrPatient.updating);
  const updateSuccess = useAppSelector(state => state.kemrPatient.updateSuccess);
  const [search, setSearch] = useState('');
  const [data, setData] = useState('');

  const handelChange = event => {
    setSearch(event.target.value);
  };
  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const handleClose = () => {
    navigate('/kemr-patient');
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
    values.kemrPatientRegistrationDate = convertDateTimeToServer(values.kemrPatientRegistrationDate);

    const entity = {
      ...kemrPatientEntity,
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
          kemrPatientRegistrationDate: displayDefaultDateTime(),
        }
      : {
          ...kemrPatientEntity,
          kemrPatientRegistrationDate: convertDateTimeFromServer(kemrPatientEntity.kemrPatientRegistrationDate),
        };

  return (
    <div>
      {/* <Row className="justify-content-center"> */}
      <h2 id="jyemrApp.kemrPatient.home.createOrEditLabel" data-cy="KemrPatientCreateUpdateHeading">
        환자 신규등록
      </h2>
      <div className="d-flex justify-content-end">
        <Input placeholder="이름 검색..." style={{ position: 'relative', width: '170px', margin: '5px' }} onChange={handelChange}></Input>
        {/* 회원조회_버튼 */}
        <ModalLink setData={setData} getData={search}></ModalLink>
        <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
          <FontAwesomeIcon icon="sync" spin={loading} /> 새로고침
        </Button>
      </div>

      {/* <div className="d-flex justify-content-end">
        <EntitiesMenu></EntitiesMenu>
      </div> */}

      {/* </Row> */}
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="kemr-patient-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Kemr Patient Name"
                id="kemr-patient-kemrPatientName"
                name="kemrPatientName"
                data-cy="kemrPatientName"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 10, message: '최대 10자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Sex"
                id="kemr-patient-kemrPatientSex"
                name="kemrPatientSex"
                data-cy="kemrPatientSex"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 1, message: '최대 1자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Birthday"
                id="kemr-patient-kemrPatientBirthday"
                name="kemrPatientBirthday"
                data-cy="kemrPatientBirthday"
                type="date"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Registration Date"
                id="kemr-patient-kemrPatientRegistrationDate"
                name="kemrPatientRegistrationDate"
                data-cy="kemrPatientRegistrationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Social Seurity No"
                id="kemr-patient-kemrPatientSocialSeurityNo"
                name="kemrPatientSocialSeurityNo"
                data-cy="kemrPatientSocialSeurityNo"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Qualification Check"
                id="kemr-patient-kemrPatientQualificationCheck"
                name="kemrPatientQualificationCheck"
                data-cy="kemrPatientQualificationCheck"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 1, message: '최대 1자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Address"
                id="kemr-patient-kemrPatientAddress"
                name="kemrPatientAddress"
                data-cy="kemrPatientAddress"
                type="text"
                validate={{
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Nurse Memo"
                id="kemr-patient-kemrPatientNurseMemo"
                name="kemrPatientNurseMemo"
                data-cy="kemrPatientNurseMemo"
                type="text"
                validate={{
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Cellphone"
                id="kemr-patient-kemrPatientCellphone"
                name="kemrPatientCellphone"
                data-cy="kemrPatientCellphone"
                type="text"
                validate={{
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Patient Landline"
                id="kemr-patient-kemrPatientLandline"
                name="kemrPatientLandline"
                data-cy="kemrPatientLandline"
                type="text"
                validate={{
                  maxLength: { value: 20, message: '최대 20자 이하까지만 입력 가능합니다.' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-patient" replace color="info">
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

export default KemrPatientUpdate;
