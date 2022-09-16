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
import { IKemrDiagnosis } from 'app/shared/model/kemr-diagnosis.model';
import { getEntities as getKemrDiagnoses } from 'app/entities/kemr-diagnosis/kemr-diagnosis.reducer';
import { IKemrTreatment } from 'app/shared/model/kemr-treatment.model';
import { getEntities as getKemrTreatments } from 'app/entities/kemr-treatment/kemr-treatment.reducer';
import { IKemrMedicalTreatment } from 'app/shared/model/kemr-medical-treatment.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-medical-treatment.reducer';

export const KemrMedicalTreatmentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);
  const kemrDiagnoses = useAppSelector(state => state.kemrDiagnosis.entities);
  const kemrTreatments = useAppSelector(state => state.kemrTreatment.entities);
  const kemrMedicalTreatmentEntity = useAppSelector(state => state.kemrMedicalTreatment.entity);
  const loading = useAppSelector(state => state.kemrMedicalTreatment.loading);
  const updating = useAppSelector(state => state.kemrMedicalTreatment.updating);
  const updateSuccess = useAppSelector(state => state.kemrMedicalTreatment.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-medical-treatment');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
    dispatch(getKemrDiagnoses({}));
    dispatch(getKemrTreatments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.kemrMedicalTreatmentDate = convertDateTimeToServer(values.kemrMedicalTreatmentDate);

    const entity = {
      ...kemrMedicalTreatmentEntity,
      ...values,
      kemrPatient: kemrPatients.find(it => it.id.toString() === values.kemrPatient.toString()),
      kemrDoctor: kemrDoctors.find(it => it.id.toString() === values.kemrDoctor.toString()),
      kemrDiagnosis: kemrDiagnoses.find(it => it.id.toString() === values.kemrDiagnosis.toString()),
      kemrTreatment: kemrTreatments.find(it => it.id.toString() === values.kemrTreatment.toString()),
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
          kemrMedicalTreatmentDate: displayDefaultDateTime(),
        }
      : {
          ...kemrMedicalTreatmentEntity,
          kemrMedicalTreatmentDate: convertDateTimeFromServer(kemrMedicalTreatmentEntity.kemrMedicalTreatmentDate),
          kemrPatient: kemrMedicalTreatmentEntity?.kemrPatient?.id,
          kemrDoctor: kemrMedicalTreatmentEntity?.kemrDoctor?.id,
          kemrDiagnosis: kemrMedicalTreatmentEntity?.kemrDiagnosis?.id,
          kemrTreatment: kemrMedicalTreatmentEntity?.kemrTreatment?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            Create or edit a Kemr Medical Treatment
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
                <ValidatedField name="id" required readOnly id="kemr-medical-treatment-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Kemr Medical Treatment Doctor Note"
                id="kemr-medical-treatment-kemrMedicalTreatmentDoctorNote"
                name="kemrMedicalTreatmentDoctorNote"
                data-cy="kemrMedicalTreatmentDoctorNote"
                type="text"
                validate={{
                  maxLength: { value: 200, message: '최대 200자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Medical Treatment Nurse Message"
                id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                name="kemrMedicalTreatmentNurseMessage"
                data-cy="kemrMedicalTreatmentNurseMessage"
                type="text"
                validate={{
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
              />
              <ValidatedField
                label="Kemr Medical Treatment Date"
                id="kemr-medical-treatment-kemrMedicalTreatmentDate"
                name="kemrMedicalTreatmentDate"
                data-cy="kemrMedicalTreatmentDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="kemr-medical-treatment-kemrPatient"
                name="kemrPatient"
                data-cy="kemrPatient"
                label="Kemr Patient"
                type="select"
              >
                <option value="" key="0" />
                {kemrPatients
                  ? kemrPatients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="kemr-medical-treatment-kemrDoctor"
                name="kemrDoctor"
                data-cy="kemrDoctor"
                label="Kemr Doctor"
                type="select"
              >
                <option value="" key="0" />
                {kemrDoctors
                  ? kemrDoctors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="kemr-medical-treatment-kemrDiagnosis"
                name="kemrDiagnosis"
                data-cy="kemrDiagnosis"
                label="Kemr Diagnosis"
                type="select"
              >
                <option value="" key="0" />
                {kemrDiagnoses
                  ? kemrDiagnoses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="kemr-medical-treatment-kemrTreatment"
                name="kemrTreatment"
                data-cy="kemrTreatment"
                label="Kemr Treatment"
                type="select"
              >
                <option value="" key="0" />
                {kemrTreatments
                  ? kemrTreatments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-medical-treatment" replace color="info">
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

export default KemrMedicalTreatmentUpdate;
