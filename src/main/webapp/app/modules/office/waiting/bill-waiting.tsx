// /**
//  * jkmoon
//  * 원무-수납 대기 컴포넌트
//  */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, CardTitle, CardText, CardGroup } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
// import { reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalTreatments, getEntity } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import { TextFormat } from 'react-jhipster';
import { APP_KR_DATETIME_FORMAT } from 'app/config/constants';

export interface IBillWaitingComponentProps {
  getOnlyAge: (birthday: any) => string;
}

export const BillWaitingComponent = (props: IBillWaitingComponentProps) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.kemrMedicalTreatment.loading);
  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);

  // 수납 정보 초기화 메소드
  const setBillInfo = (kemrMedicalTreatmentId) => {
    dispatch(getEntity(kemrMedicalTreatmentId));
  };

  useEffect(() => {
    // dispatch(reset());
    dispatch(getKemrMedicalTreatments({}));
    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
    dispatch(getKemrMedicalBills({}));
  }, []);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12">
          {kemrMedicalTreatments && kemrMedicalTreatments.length > 0 ? (
            kemrMedicalTreatments
            .filter(kemrMedicalTreatment => (
              kemrMedicalTreatment.kemrDiagnosis !== null && 
              kemrMedicalTreatment.kemrTreatment !== null &&
              kemrMedicalBills
              .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length === 0
            ))
            .map((kemrMedicalTreatment, i) => (
              <Card body key={`entity-${i}`}>
                <CardTitle>
                  진료내역 {kemrMedicalTreatment.id}번
                  &nbsp;
                  <Button
                    tag={Link}
                    to={`/office/${kemrMedicalTreatment.id}/bill`}
                    color="secondary"
                    size="sm"
                    data-cy="entityDetailsButton"
                    onClick={() => setBillInfo(kemrMedicalTreatment.id)}
                  >
                    <span className="d-none d-md-inline">수납</span>
                  </Button>
                </CardTitle>
                <CardText>
                  {kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientName : ''}
                  &nbsp;
                  ({kemrMedicalTreatment.kemrPatient ? props.getOnlyAge(kemrMedicalTreatment.kemrPatient.kemrPatientBirthday) : ''}세)
                  <br />
                  {kemrMedicalTreatment.kemrDoctor ? kemrMedicalTreatment.kemrDoctor.kemrDoctorName : ''}
                  <br />
                  {kemrMedicalTreatment.kemrMedicalTreatmentDate ? (
                    <TextFormat value={kemrMedicalTreatment.kemrMedicalTreatmentDate} type="date" format={APP_KR_DATETIME_FORMAT} />
                  ) : null}
                </CardText>
              </Card>
            ))
          ) : (
            !loading && <div className="alert alert-warning">No Kemr Prescriptions found</div>
          )}
        </Col>
      </Row>
      {/* <Row className="justify-content-center">
        <Col md="8">
          <div className="table-responsive">
            {kemrMedicalTreatments && kemrMedicalTreatments.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>kemrMedicalTreatment.id</th>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>성별</th>
                    <th>환자번호</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {kemrMedicalTreatments
                    .filter(kemrMedicalTreatment => (
                      kemrMedicalTreatment.kemrDiagnosis !== null && 
                      kemrMedicalTreatment.kemrTreatment !== null
                    ))
                    .filter(kemrMedicalTreatment => (
                      (kemrMedicalBills
                        .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length) === 0
                    ))
                    .map((kemrMedicalTreatment, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>{kemrMedicalTreatment.id}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientName : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientBirthday : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientSex : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.id : ''}</td>
                        <td className="text-end">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`/office/${kemrMedicalTreatment.id}/bill`}
                              color="info"
                              size="sm"
                              data-cy="entityDetailsButton"
                              onClick={() => setBillInfo(kemrMedicalTreatment.id)}
                            >
                              <span className="d-none d-md-inline">수납</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            ) : (
              !loading && <div className="alert alert-warning">No Kemr Prescriptions found</div>
            )}
          </div>
        </Col>
      </Row> */}
    </div>
  );
};

export default BillWaitingComponent;