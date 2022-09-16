import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrInstitution } from 'app/shared/model/kemr-institution.model';
import { getEntities } from './kemr-institution.reducer';

export const KemrInstitution = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrInstitutionList = useAppSelector(state => state.kemrInstitution.entities);
  const loading = useAppSelector(state => state.kemrInstitution.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="kemr-institution-heading" data-cy="KemrInstitutionHeading">
        Kemr Institutions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/kemr-institution/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Kemr Institution
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {kemrInstitutionList && kemrInstitutionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Kemr Institution Id</th>
                <th>Kemr Institution Password</th>
                <th>Kemr Institution Name</th>
                <th>Kemr Institution Department</th>
                <th>Kemr Institution Position</th>
                <th>Kemr Institution Manager</th>
                <th>Kemr Institution Cellphone</th>
                <th>Kemr Institution Email</th>
                <th>Kemr Institution Website</th>
                <th>Kemr Institution Agree</th>
                <th>Kemr Institution Status</th>
                <th>Kemr Institution Modification</th>
                <th>Kemr Institution Withdrawal</th>
                <th>Kemr Institution Landline</th>
                <th>Kemr Institution Fail</th>
                <th>Kemr Institution Failtime</th>
                <th>Kemr Institution Number</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kemrInstitutionList.map((kemrInstitution, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/kemr-institution/${kemrInstitution.id}`} color="link" size="sm">
                      {kemrInstitution.id}
                    </Button>
                  </td>
                  <td>{kemrInstitution.kemrInstitutionId}</td>
                  <td>{kemrInstitution.kemrInstitutionPassword}</td>
                  <td>{kemrInstitution.kemrInstitutionName}</td>
                  <td>{kemrInstitution.kemrInstitutionDepartment}</td>
                  <td>{kemrInstitution.kemrInstitutionPosition}</td>
                  <td>{kemrInstitution.kemrInstitutionManager}</td>
                  <td>{kemrInstitution.kemrInstitutionCellphone}</td>
                  <td>{kemrInstitution.kemrInstitutionEmail}</td>
                  <td>{kemrInstitution.kemrInstitutionWebsite}</td>
                  <td>
                    {kemrInstitution.kemrInstitutionAgree ? (
                      <TextFormat type="date" value={kemrInstitution.kemrInstitutionAgree} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{kemrInstitution.kemrInstitutionStatus}</td>
                  <td>
                    {kemrInstitution.kemrInstitutionModification ? (
                      <TextFormat type="date" value={kemrInstitution.kemrInstitutionModification} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {kemrInstitution.kemrInstitutionWithdrawal ? (
                      <TextFormat type="date" value={kemrInstitution.kemrInstitutionWithdrawal} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{kemrInstitution.kemrInstitutionLandline}</td>
                  <td>{kemrInstitution.kemrInstitutionFail}</td>
                  <td>
                    {kemrInstitution.kemrInstitutionFailtime ? (
                      <TextFormat type="date" value={kemrInstitution.kemrInstitutionFailtime} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{kemrInstitution.kemrInstitutionNumber}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/kemr-institution/${kemrInstitution.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-institution/${kemrInstitution.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-institution/${kemrInstitution.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">삭제</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Kemr Institutions found</div>
        )}
      </div>
    </div>
  );
};

export default KemrInstitution;
