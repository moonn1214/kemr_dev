// /**
//  * jkmoon
//  * 원무-치료 대기 컴포넌트
//  */
import React, { useEffect } from 'react';
import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { TextFormat } from 'react-jhipster';
import { APP_KR_DATETIME_FORMAT } from 'app/config/constants';

export interface ITreatmentWaitingComponentProps {
  getOnlyAge: (birthday: any) => string;
}

// 실제 진단과 치료가 없으면 값을 비우지 않고 "없음" 등의 값을 넣어야 함(진료실과 치료실 컴포넌트에서 dropdown option에 추가)
// 진료대기 => 진료내역에서 진단과 치료가 null인 튜플
// 치료대기 => 진료내역에서 치료만 null인 튜플
// 수납대기 => 진료내역에서 진단과 치료가 모두 null이 아닌 튜플 중, 그 아이디로 진료비용에서 검색하여 없는 경우의 튜플
export const TreatmentWaitingComponent = (props: ITreatmentWaitingComponentProps) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.kemrMedicalTreatment.loading);
  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);

  useEffect(() => {
    // dispatch(reset());
    dispatch(getKemrMedicalTreatments({}));
  }, []);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12">
          {kemrMedicalTreatments && kemrMedicalTreatments.length > 0 ? (
            kemrMedicalTreatments
              .filter(
                kemrMedicalTreatment => kemrMedicalTreatment.kemrDiagnosis !== null && kemrMedicalTreatment.kemrTreatment === null
              )
              .map((kemrMedicalTreatment, i) => (
                <Card body key={`entity-${i}`}>
                  <CardTitle>
                    진료내역 {kemrMedicalTreatment.id}번
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
                    <th>의사명</th>
                  </tr>
                </thead>
                <tbody>
                  {kemrMedicalTreatments
                    .filter(
                      kemrMedicalTreatment => kemrMedicalTreatment.kemrDiagnosis !== null && kemrMedicalTreatment.kemrTreatment === null
                    )
                    .map((kemrMedicalTreatment, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>{kemrMedicalTreatment.id}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientName : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientBirthday : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientSex : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.id : ''}</td>
                        <td>{kemrMedicalTreatment.kemrDoctor ? kemrMedicalTreatment.kemrDoctor.kemrDoctorName : ''}</td>
                      </tr>
                    ))}
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

export default TreatmentWaitingComponent;
