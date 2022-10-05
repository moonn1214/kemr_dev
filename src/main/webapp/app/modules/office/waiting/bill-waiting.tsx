/**
 * jkmoon
 * 원무-수납 대기 컴포넌트
 */
import React, { useEffect } from 'react';
import { Card, CardText, Badge } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalTreatments, getEntity } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import { TextFormat } from 'react-jhipster';
import { APP_KR_DATETIME_FORMAT } from 'app/config/constants';
import WaitingPaginationComponent from './waiting-pagination';
import { IoEllipsisHorizontalSharp, IoFemale, IoMale } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export interface IBillWaitingComponentProps {
  getOnlyAge: (socialSecurityNo: any) => string;
}

export const BillWaitingComponent = (props: IBillWaitingComponentProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(state => state.kemrMedicalTreatment.loading);
  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);

  // 수납 정보 초기화 메소드
  const setBillInfo = (kemrMedicalTreatmentId) => {
    navigate(`/office/${kemrMedicalTreatmentId}/bill`);
    dispatch(getEntity(kemrMedicalTreatmentId));
  };

  useEffect(() => {
    // dispatch(reset());
    dispatch(getKemrMedicalTreatments({}));
    dispatch(getKemrMedicalBills({}));
  }, []);

  const waitingItem = 
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
          <CardText>
            <Badge color='light' pill >
              {kemrMedicalTreatment.kemrPatient.kemrPatientSex === 'M' ? 
                <IoMale size="15px" style={{ color: "blue" }} /> : <IoFemale size="15px" style={{ color: "red" }} />}
            </Badge>
            &nbsp;
            {kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientName : ''}
            &nbsp;
            ({kemrMedicalTreatment.kemrPatient ? props.getOnlyAge(kemrMedicalTreatment.kemrPatient.kemrPatientSocialSecurityNo) : ''}세)
            &nbsp;
            &nbsp;
            <IoEllipsisHorizontalSharp 
              title="수납"
              style={{ cursor: "pointer", float: "right" }} 
              onClick={() => setBillInfo(kemrMedicalTreatment.id)} 
            />
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
      {/* 대기 항목 및 페이지네이션 컴포넌트 호출 */}
      <WaitingPaginationComponent 
        itemList={waitingItem}
      />
    </div>
  );
};

export default BillWaitingComponent;