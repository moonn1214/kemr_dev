import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './kemr-institution.reducer';

export const KemrInstitutionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const kemrInstitutionEntity = useAppSelector(state => state.kemrInstitution.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="kemrInstitutionDetailsHeading">Kemr Institution</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">Id</span>
          </dt>
          <dd>{kemrInstitutionEntity.id}</dd>
          <dt>
            <span id="kemrInstitutionId">Kemr Institution Id</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionId}</dd>
          <dt>
            <span id="kemrInstitutionPassword">Kemr Institution Password</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionPassword}</dd>
          <dt>
            <span id="kemrInstitutionName">Kemr Institution Name</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionName}</dd>
          <dt>
            <span id="kemrInstitutionDepartment">Kemr Institution Department</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionDepartment}</dd>
          <dt>
            <span id="kemrInstitutionPosition">Kemr Institution Position</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionPosition}</dd>
          <dt>
            <span id="kemrInstitutionManager">Kemr Institution Manager</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionManager}</dd>
          <dt>
            <span id="kemrInstitutionCellphone">Kemr Institution Cellphone</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionCellphone}</dd>
          <dt>
            <span id="kemrInstitutionEmail">Kemr Institution Email</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionEmail}</dd>
          <dt>
            <span id="kemrInstitutionWebsite">Kemr Institution Website</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionWebsite}</dd>
          <dt>
            <span id="kemrInstitutionAgree">Kemr Institution Agree</span>
          </dt>
          <dd>
            {kemrInstitutionEntity.kemrInstitutionAgree ? (
              <TextFormat value={kemrInstitutionEntity.kemrInstitutionAgree} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrInstitutionStatus">Kemr Institution Status</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionStatus}</dd>
          <dt>
            <span id="kemrInstitutionModification">Kemr Institution Modification</span>
          </dt>
          <dd>
            {kemrInstitutionEntity.kemrInstitutionModification ? (
              <TextFormat value={kemrInstitutionEntity.kemrInstitutionModification} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrInstitutionWithdrawal">Kemr Institution Withdrawal</span>
          </dt>
          <dd>
            {kemrInstitutionEntity.kemrInstitutionWithdrawal ? (
              <TextFormat value={kemrInstitutionEntity.kemrInstitutionWithdrawal} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrInstitutionLandline">Kemr Institution Landline</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionLandline}</dd>
          <dt>
            <span id="kemrInstitutionFail">Kemr Institution Fail</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionFail}</dd>
          <dt>
            <span id="kemrInstitutionFailtime">Kemr Institution Failtime</span>
          </dt>
          <dd>
            {kemrInstitutionEntity.kemrInstitutionFailtime ? (
              <TextFormat value={kemrInstitutionEntity.kemrInstitutionFailtime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="kemrInstitutionNumber">Kemr Institution Number</span>
          </dt>
          <dd>{kemrInstitutionEntity.kemrInstitutionNumber}</dd>
        </dl>
        <Button tag={Link} to="/kemr-institution" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">뒤로</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/kemr-institution/${kemrInstitutionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
        </Button>
      </Col>
    </Row>
  );
};

export default KemrInstitutionDetail;
