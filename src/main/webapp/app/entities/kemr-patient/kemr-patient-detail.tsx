import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-patient.reducer';

export const KemrPatientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrPatientEntity = useAppSelector(state => state.kemrPatient.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrPatientDetailsHeading">Kemr Patient</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrPatientEntity.id}</dd>
          <dt>
            <span id="kemrPatientName">Kemr Patient Name</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientName}</dd>
          <dt>
            <span id="kemrPatientSex">Kemr Patient Sex</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientSex}</dd>
          <dt>
            <span id="kemrPatientBirthday">Kemr Patient Birthday</span>
          </dt>
          <dd>
            {kemrPatientEntity.kemrPatientBirthday ? (
              <TextFormat value={kemrPatientEntity.kemrPatientBirthday} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrPatientRegistrationDate">Kemr Patient Registration Date</span>
          </dt>
          <dd>
            {kemrPatientEntity.kemrPatientRegistrationDate ? (
              <TextFormat value={kemrPatientEntity.kemrPatientRegistrationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrPatientSocialSecurityNo">Kemr Patient Social Security No</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientSocialSecurityNo}</dd>
          <dt>
            <span id="kemrPatientQualificationCheck">Kemr Patient Qualification Check</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientQualificationCheck}</dd>
          <dt>
            <span id="kemrPatientAddress">Kemr Patient Address</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientAddress}</dd>
          <dt>
            <span id="kemrPatientNurseMemo">Kemr Patient Nurse Memo</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientNurseMemo}</dd>
          <dt>
            <span id="kemrPatientCellphone">Kemr Patient Cellphone</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientCellphone}</dd>
          <dt>
            <span id="kemrPatientLandline">Kemr Patient Landline</span>
          </dt>
          <dd>{kemrPatientEntity.kemrPatientLandline}</dd>
        </dl>
        <Button tag={Link} to="/kemr-patient" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-patient/${kemrPatientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrPatientDetail;
