/**
 * jkmoon
 * 원무-수납 대기 컴포넌트
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardTitle, CardText } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalTreatments, getEntity } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import { TextFormat } from 'react-jhipster';
import { APP_KR_DATETIME_FORMAT } from 'app/config/constants';
import WaitingPaginationComponent from './waiting-pagination';

export interface IBillWaitingComponentProps {
  getOnlyAge: (birthday: any) => string;
  waitingNo: string;
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
    dispatch(getKemrMedicalBills({}));
  }, []);

  const waitingCard = 
    kemrMedicalTreatments && kemrMedicalTreatments.length > 0 ? (
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
    );

  return (
    <div>
      {/* 대기 항목 및 쪽수 컴포넌트 호출 */}
      <WaitingPaginationComponent 
        waitingNo={props.waitingNo}
        itemList={waitingCard}
      />
    </div>
  );
};

export default BillWaitingComponent;