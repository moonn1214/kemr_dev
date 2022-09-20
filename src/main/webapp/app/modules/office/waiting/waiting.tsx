// /**
//  * jkmoon
//  * 원무 대기 컴포넌트
//  */
import React, {  useEffect, useState } from 'react';
import { Button, Row, Col, ButtonGroup, Badge, Card } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import DiagnosisWaitingComponent from './diagnosis-waiting';
import TreatmentWaitingComponent from './treatment-waiting';
import BillWaitingComponent from './bill-waiting';

export interface IWaitingProps {
  waitingMode: string;
  diagnosisWaitingButtonActivated: boolean;
  treatmentWaitingButtonActivated: boolean;
  billWaitingButtonActivated: boolean;
};

export const WaitingComponent = (props: IWaitingProps) => {
  const dispatch = useAppDispatch();

  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);

  const getOnlyAge = (birthday) => {
    const today = new Date();
    let age = today.getFullYear() - Number(birthday.slice(0, 4));
    let monthDifference = (today.getMonth() + 1) - Number(birthday.slice(5, 7));
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < Number(birthday.slice(8, 10)))) {
      age = age - 1;
      return age.toString();
    } else {
      return age.toString();
    }
  }

  useEffect(() => {
    dispatch(getKemrMedicalTreatments({}));
    dispatch(getKemrMedicalBills({}));
  }, []);

  // 대기 모드 상태
  const [waitingMode, setWaitingMode] = useState({ mode: props.waitingMode });

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
        kemrMedicalTreatment.kemrTreatment !== null
      ))
      .filter(kemrMedicalTreatment => (
        (kemrMedicalBills
          .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length) === 0
      )).length
    );
  }, [kemrMedicalTreatments]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="6">
          <Card body>
            <ButtonGroup>
              <Button 
                outline color="primary" 
                onClick={() => setWaitingMode({ ...waitingMode, mode: "diagnosisWaiting" })} 
                active={waitingMode.mode === 'diagnosisWaiting'}
              >
                진료 대기&nbsp;<Badge color="danger" pill>{kemrDiagnosisWaitingNo}</Badge>
                {/* {waitingMode.mode === 'diagnosisWaiting' ? <>&nbsp;&nbsp;&nbsp;&nbsp;</> : 
                <Badge color="danger" pill>
                  {kemrDiagnosisWaitingNo}
                </Badge>} */}
              </Button>
              <Button 
                outline color="primary" 
                onClick={() => setWaitingMode({ ...waitingMode, mode: "treatmentWaiting" })} 
                active={waitingMode.mode === 'treatmentWaiting'}
              >
                치료 대기&nbsp;<Badge color="danger" pill>{kemrTreatmentWaitingNo}</Badge>
              </Button>
              <Button 
                outline color="primary" 
                onClick={() => setWaitingMode({ ...waitingMode, mode: "billWaiting" })} 
                active={waitingMode.mode === 'billWaiting'}
              >
                수납 대기&nbsp;<Badge color="danger" pill>{kemrBillWaitingNo}</Badge>
              </Button>
            </ButtonGroup>
            {/* 모드 상태값에 따라 컴포넌트 호출 */}
            {waitingMode.mode === 'diagnosisWaiting' && <DiagnosisWaitingComponent getOnlyAge={getOnlyAge} />}
            {waitingMode.mode === 'treatmentWaiting' && <TreatmentWaitingComponent getOnlyAge={getOnlyAge} />}
            {waitingMode.mode === 'billWaiting' && <BillWaitingComponent getOnlyAge={getOnlyAge} />}
            {/* 리스트 넘버 추가 예정 */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WaitingComponent;