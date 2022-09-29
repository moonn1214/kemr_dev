/**
 * jkmoon
 * 원무 대기 컴포넌트
 */
import React, {  useEffect, useState } from 'react';
import { Button, ButtonGroup, Badge } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import DiagnosisWaitingComponent from './diagnosis-waiting';
import TreatmentWaitingComponent from './treatment-waiting';
import BillWaitingComponent from './bill-waiting';
import { useLocation } from 'react-router';

export const WaitingComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // 현재 url 마지막 경로명 설정(접수:recept, 치료:treatment, 수납:bill)
  const currentPath = location.pathname.split("/").pop();

  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);

  // 만 나이 구하는 메소드
  const getOnlyAge = (birthday) => {
    const today = new Date();
    const monthDifference = (today.getMonth() + 1) - Number(birthday.slice(5, 7));
    const age = today.getFullYear() - Number(birthday.slice(0, 4));
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < Number(birthday.slice(8, 10)))) {
      return (age - 1).toString();
    }
    return age.toString();
  }

  useEffect(() => {
    dispatch(getKemrMedicalTreatments({}));
    dispatch(getKemrMedicalBills({}));
  }, []);

  // 현재 대기 모드 및 버튼의 상태
  const [waitingState, setWaitingState] = useState({ mode: 'diagnosisWaiting', 
                                                     diagnosisWaitingButtonActivated: true, 
                                                     treatmentWaitingButtonActivated: false, 
                                                     billWaitingButtonActivated: false });

  // 대기 버튼의 값 개수 상태
  const [kemrDiagnosisWaitingNo, setKemrDiagnosisWaitingNo] = useState(null);
  const [kemrTreatmentWaitingNo, setKemrTreatmentWaitingNo] = useState(null);
  const [kemrBillWaitingNo, setKemrBillWaitingNo] = useState(null);

  // 진료내역의 변경에 따라 각 대기 버튼의 값 개수 상태 변경
  useEffect(() => {
    setKemrDiagnosisWaitingNo(
      kemrMedicalTreatments
      .filter(kemrMedicalTreatment => ( 
        kemrMedicalTreatment.kemrDiagnosis === null && 
        kemrMedicalTreatment.kemrTreatment === null
      )).length
    );
    setKemrTreatmentWaitingNo(
      kemrMedicalTreatments
      .filter(kemrMedicalTreatment => ( 
        kemrMedicalTreatment.kemrDiagnosis !== null && 
        kemrMedicalTreatment.kemrTreatment === null
      )).length
    );
    setKemrBillWaitingNo(
      kemrMedicalTreatments
      .filter(kemrMedicalTreatment => (
        kemrMedicalTreatment.kemrDiagnosis !== null && 
        kemrMedicalTreatment.kemrTreatment !== null &&
        kemrMedicalBills
        .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length === 0
      )).length
    );
  }, [kemrMedicalTreatments, kemrMedicalBills]);

  // 현재 경로명 변경될 때, 적절한 대기 모드 및 버튼 상태 설정
  useEffect(() => {
    currentPath === 'recept' && setWaitingState({...waitingState,
                                                 mode: 'diagnosisWaiting',
                                                 diagnosisWaitingButtonActivated: true,
                                                 treatmentWaitingButtonActivated: false,
                                                 billWaitingButtonActivated: false});
    currentPath === 'treatment' && setWaitingState({...waitingState,
                                                    mode: 'treatmentWaiting',
                                                    diagnosisWaitingButtonActivated: false,
                                                    treatmentWaitingButtonActivated: true,
                                                    billWaitingButtonActivated: false});
    currentPath === 'bill' && setWaitingState({...waitingState,
                                               mode: 'billWaiting',
                                               diagnosisWaitingButtonActivated: false,
                                               treatmentWaitingButtonActivated: false,
                                               billWaitingButtonActivated: true});
  }, [currentPath]);

  return (
    <div>
      <div className="justify-content-center d-flex">
        <ButtonGroup size="sm">
          <Button 
            outline color="primary"
            onClick={() => setWaitingState({...waitingState, mode: 'diagnosisWaiting'})} 
            active={waitingState.mode === 'diagnosisWaiting'}
          >
            진료대기&nbsp;<Badge color="danger" pill>{kemrDiagnosisWaitingNo}</Badge>
          </Button>
          <Button 
            outline color="primary"
            onClick={() => setWaitingState({...waitingState, mode: 'treatmentWaiting'})} 
            active={waitingState.mode === 'treatmentWaiting'}
          >
            치료대기&nbsp;<Badge color="danger" pill>{kemrTreatmentWaitingNo}</Badge>
          </Button>
          <Button 
            outline color="primary"
            onClick={() => setWaitingState({...waitingState, mode: 'billWaiting'})} 
            active={waitingState.mode === 'billWaiting'}
          >
            수납대기&nbsp;<Badge color="danger" pill>{kemrBillWaitingNo}</Badge>
          </Button>
        </ButtonGroup>
      </div>
      &nbsp;
      {/* 모드 상태값에 따라 대기 컴포넌트 호출 */}
      {waitingState.mode === 'diagnosisWaiting' && <DiagnosisWaitingComponent getOnlyAge={getOnlyAge} />}
      {waitingState.mode === 'treatmentWaiting' && <TreatmentWaitingComponent getOnlyAge={getOnlyAge} />}
      {waitingState.mode === 'billWaiting' && <BillWaitingComponent getOnlyAge={getOnlyAge} />}
    </div>
  );
};

export default WaitingComponent;