import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrMedicalBill } from 'app/shared/model/kemr-medical-bill.model';
import { getEntities } from './kemr-medical-bill.reducer';

export const KemrMedicalBill = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrMedicalBillList = useAppSelector(state => state.kemrMedicalBill.entities);
  const loading = useAppSelector(state => state.kemrMedicalBill.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="kemr-medical-bill-heading" data-cy="KemrMedicalBillHeading">
        Kemr Medical Bills
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/kemr-medical-bill/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Kemr Medical Bill
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {kemrMedicalBillList && kemrMedicalBillList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Kemr Medical Bill Total</th>
                <th>Kemr Medical Bill Nhs Share</th>
                <th>Kemr Medical Bill Patient Share</th>
                <th>Kemr Medical Bill Method</th>
                <th>Kemr Medical Bill Delivery Type</th>
                <th>Kemr Medical Bill Cash Receipt</th>
                <th>Kemr Medical Treatment</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kemrMedicalBillList.map((kemrMedicalBill, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/kemr-medical-bill/${kemrMedicalBill.id}`} color="link" size="sm">
                      {kemrMedicalBill.id}
                    </Button>
                  </td>
                  <td>{kemrMedicalBill.kemrMedicalBillTotal}</td>
                  <td>{kemrMedicalBill.kemrMedicalBillNhsShare}</td>
                  <td>{kemrMedicalBill.kemrMedicalBillPatientShare}</td>
                  <td>{kemrMedicalBill.kemrMedicalBillMethod}</td>
                  <td>{kemrMedicalBill.kemrMedicalBillDeliveryType}</td>
                  <td>{kemrMedicalBill.kemrMedicalBillCashReceipt}</td>
                  <td>
                    {kemrMedicalBill.kemrMedicalTreatment ? (
                      <Link to={`/kemr-medical-treatment/${kemrMedicalBill.kemrMedicalTreatment.id}`}>
                        {kemrMedicalBill.kemrMedicalTreatment.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/kemr-medical-bill/${kemrMedicalBill.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-medical-bill/${kemrMedicalBill.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/kemr-medical-bill/${kemrMedicalBill.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Kemr Medical Bills found</div>
        )}
      </div>
    </div>
  );
};

export default KemrMedicalBill;
