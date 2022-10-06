/**
 * jkmoon
 * 원무 대기 컴포넌트
 */
import React, {  useEffect, useState } from 'react';
import { Button, ButtonGroup, Badge, Row, Col } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import DiagnosisWaitingComponent from './diagnosis-waiting';
import TreatmentWaitingComponent from './treatment-waiting';
import BillWaitingComponent from './bill-waiting';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WaitingComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // 현재 url 마지막 경로명 설정(접수:recept, 치료:treatment, 수납:bill)
  const currentPath = location.pathname.split("/").pop();

  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);
  const medicalTreatmentsLoading = useAppSelector(state => state.kemrMedicalTreatment.loading);
  const medicalBillsLoading = useAppSelector(state => state.kemrMedicalBill.loading);

  // 만 나이 구하는 메소드
  const getOnlyAge = (socialSecurityNo) => {
    const no = socialSecurityNo.replace(/[^0-9]/g, "");
    let birthday = null;

    if (no.substr(6, 1) === "1" || no.substr(6, 1) === "2") {
      birthday = "19" + no.substring(0, 2) + no.substring(2, 4) + no.substring(4, 6);
    } else {
      birthday = "20" + no.substring(0, 2) + no.substring(2, 4) + no.substring(4, 6);
    }

    const today = new Date();
    const monthDifference = (today.getMonth() + 1) - Number(birthday.slice(4, 6));
    const age = today.getFullYear() - Number(birthday.slice(0, 4));
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < Number(birthday.slice(6, 8)))) {
      return (age - 1).toString();
    }
    return age.toString();
  }

  // 항목 새로고침 메소드
  const refreshList = () => {
    dispatch(getKemrMedicalTreatments({}));
  };

  useEffect(() => {
    dispatch(getKemrMedicalTreatments({}));
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

  // 진료내역 변경되면 처방전 내역 변경
  useEffect(() => {
    dispatch(getKemrMedicalBills({}));
  }, [kemrMedicalTreatments]);

  // 진료내역, 처방전 내역의 변경에 따라 각 대기 버튼의 값 개수 상태 변경
  // dispatch로 state 가져오는 값은 비동기 처리 때문에 함께 useEffect 파라미터에 넣으면 안됨
  // 호출 순서를 분리해야 함 (ex. get medical treatments -> get bills -> set values of state using medical treatments and bills)
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
  }, [kemrMedicalBills]);

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
          {kemrDiagnosisWaitingNo ? (
            <Button 
              outline color="primary"
              onClick={() => setWaitingState({...waitingState, mode: 'diagnosisWaiting'})} 
              active={waitingState.mode === 'diagnosisWaiting'}
            >
              진료대기&nbsp;<Badge color="danger" pill>{kemrDiagnosisWaitingNo}</Badge>
            </Button>
          ) : (
            <Button 
              outline color="primary"
              onClick={() => setWaitingState({...waitingState, mode: 'diagnosisWaiting'})} 
              disabled
            >
              진료대기&nbsp;<Badge color="secondary" pill>{kemrDiagnosisWaitingNo}</Badge>
            </Button>
          )}
          {kemrTreatmentWaitingNo ? (
            <Button 
              outline color="primary"
              onClick={() => setWaitingState({...waitingState, mode: 'treatmentWaiting'})} 
              active={waitingState.mode === 'treatmentWaiting'}
            >
              치료대기&nbsp;<Badge color="danger" pill>{kemrTreatmentWaitingNo}</Badge>
            </Button>
          ) : (
            <Button 
              outline color="primary"
              onClick={() => setWaitingState({...waitingState, mode: 'treatmentWaiting'})} 
              disabled
            >
              치료대기&nbsp;<Badge color="secondary" pill>{kemrTreatmentWaitingNo}</Badge>
            </Button>
          )}
          {kemrBillWaitingNo ? (
            <Button 
              outline color="primary"
              onClick={() => setWaitingState({...waitingState, mode: 'billWaiting'})} 
              active={waitingState.mode === 'billWaiting'}
            >
              수납대기&nbsp;<Badge color="danger" pill>{kemrBillWaitingNo}</Badge>
            </Button>
          ) : (
            <Button 
              outline color="primary"
              onClick={() => setWaitingState({...waitingState, mode: 'billWaiting'})} 
              disabled
            >
              수납대기&nbsp;<Badge color="secondary" pill>{kemrBillWaitingNo}</Badge>
            </Button>
          )}
        </ButtonGroup>
      </div>
      &nbsp;
      {/* 모드 상태값에 따라 대기 컴포넌트 호출 */}
      {waitingState.mode === 'diagnosisWaiting' && <DiagnosisWaitingComponent getOnlyAge={getOnlyAge} />}
      {waitingState.mode === 'treatmentWaiting' && <TreatmentWaitingComponent getOnlyAge={getOnlyAge} />}
      {waitingState.mode === 'billWaiting' && <BillWaitingComponent getOnlyAge={getOnlyAge} />}
      {/* 항목 새로고침(필요한지, 위치는 어디) */}
      <Row className="justify-content-center">
        <Col md="12">
          <FontAwesomeIcon icon="sync" type="button" onClick={refreshList} spin={medicalTreatmentsLoading || medicalBillsLoading} />
        </Col>
      </Row>
    </div>
  );
};

export default WaitingComponent;