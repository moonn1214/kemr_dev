import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrMedicine } from 'app/shared/model/kemr-medicine.model';
import { getEntities as getKemrMedicines } from 'app/entities/kemr-medicine/kemr-medicine.reducer';
import { IKemrMedicalTreatment } from 'app/shared/model/kemr-medical-treatment.model';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { IKemrPrescription } from 'app/shared/model/kemr-prescription.model';
import { getEntity, updateEntity, createEntity, reset } from './kemr-prescription.reducer';

export const KemrPrescriptionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrMedicines = useAppSelector(state => state.kemrMedicine.entities);
  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrPrescriptionEntity = useAppSelector(state => state.kemrPrescription.entity);
  const loading = useAppSelector(state => state.kemrPrescription.loading);
  const updating = useAppSelector(state => state.kemrPrescription.updating);
  const updateSuccess = useAppSelector(state => state.kemrPrescription.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-prescription');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getKemrMedicines({}));
    dispatch(getKemrMedicalTreatments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...kemrPrescriptionEntity,
      ...values,
      kemrMedicine: kemrMedicines.find(it => it.id.toString() === values.kemrMedicine.toString()),
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
          ...kemrPrescriptionEntity,
          kemrMedicine: kemrPrescriptionEntity?.kemrMedicine?.id,
          kemrMedicalTreatment: kemrPrescriptionEntity?.kemrMedicalTreatment?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrPrescription.home.createOrEditLabel" data-cy="KemrPrescriptionCreateUpdateHeading">
            Create or edit a Kemr Prescription
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
                <ValidatedField name="id" required readOnly id="kemr-prescription-id" label="Id" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                id="kemr-prescription-kemrMedicine"
                name="kemrMedicine"
                data-cy="kemrMedicine"
                label="Kemr Medicine"
                type="select"
              >
                <option value="" key="0" />
                {kemrMedicines
                  ? kemrMedicines.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="kemr-prescription-kemrMedicalTreatment"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/kemr-prescription" replace color="info">
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

export default KemrPrescriptionUpdate;
