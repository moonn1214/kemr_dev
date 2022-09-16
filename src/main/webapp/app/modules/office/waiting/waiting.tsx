// /**
//  * jkmoon
//  * 원무 대기 컴포넌트
//  */
import React, {  useEffect, useState } from 'react';
import { Button, Row, Col} from 'reactstrap';
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

  // 해당 컴포넌트 호출 시, 넘어온 값으로 각 대기 버튼들의 활성 상태 변경
  const changeWaitingMode = (selectedMode) => {
    if (selectedMode === 'diagnosisWaiting') {
      setDiagnosisWaitingButtonActivated(true);
      setTreatmentWaitingButtonActivated(false);
      setBillWaitingButtonActivated(false);
    } 
    else if (selectedMode === 'treatmentWaiting') {
      setDiagnosisWaitingButtonActivated(false);
      setTreatmentWaitingButtonActivated(true);
      setBillWaitingButtonActivated(false);
    } 
    else if (selectedMode === 'billWaiting') {
      setDiagnosisWaitingButtonActivated(false);
      setTreatmentWaitingButtonActivated(false);
      setBillWaitingButtonActivated(true);
    }
    // 대기 모달 컴포넌트 호출을 위해 모드 상태값 변경
    setWaitingMode({ ...waitingMode, mode: selectedMode });
  };

  useEffect(() => {
    dispatch(getKemrMedicalTreatments({}));
    dispatch(getKemrMedicalBills({}));
  }, []);

  // 대기 버튼들의 상태
  const [diagnosisWaitingButtonActivated, setDiagnosisWaitingButtonActivated] = useState(props.diagnosisWaitingButtonActivated);
  const [treatmentWaitingButtonActivated, setTreatmentWaitingButtonActivated] = useState(props.treatmentWaitingButtonActivated);
  const [billWaitingButtonActivated, setBillWaitingButtonActivated] = useState(props.billWaitingButtonActivated);

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
        kemrMedicalTreatment.kemrTreatment !== null &&
        kemrMedicalBills.filter(it => it.kemrMedicalTreatment.id === kemrMedicalTreatment.id).length === 0
      )).length
    );
  }, [kemrMedicalTreatments]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <Button color="primary" id="entity" data-cy="Button" type="button" disabled={diagnosisWaitingButtonActivated} onClick={() => changeWaitingMode('diagnosisWaiting')}>
            진료 대기 ({kemrDiagnosisWaitingNo})
          </Button>
          &nbsp;
          <Button color="primary" id="entity" data-cy="Button" type="button" disabled={treatmentWaitingButtonActivated} onClick={() => changeWaitingMode('treatmentWaiting')}>
            치료 대기 ({kemrTreatmentWaitingNo})
          </Button>
          &nbsp;
          <Button color="primary" id="entity" data-cy="Button" type="button" disabled={billWaitingButtonActivated} onClick={() => changeWaitingMode('billWaiting')}>
            수납 대기 ({kemrBillWaitingNo})
          </Button>
        </Col>
      </Row>
      &nbsp;
      {/* 모드 상태값에 따라 컴포넌트 호출 */}
      {waitingMode.mode === 'diagnosisWaiting' && <DiagnosisWaitingComponent />}
      {waitingMode.mode === 'treatmentWaiting' && <TreatmentWaitingComponent />}
      {waitingMode.mode === 'billWaiting' && <BillWaitingComponent />}
    </div>
  );
};

export default WaitingComponent;