/**
 * jkmoon
 * 원무 최근 진료 정보 컴포넌트
 */
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { reset } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';

// 환자 id를 props로 받아서 사용
export interface ITreatmentInfoComponentProps {
  kemrPatientId: string;
}

export const TreatmentInfoComponent = (props: ITreatmentInfoComponentProps) => {
  const propsId = props.kemrPatientId;
  const dispatch = useAppDispatch();

  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);

  // 최근 방문일, 최근 진료 정보 상태
  const [lastDoctor, setLastDoctor] = useState('');


  useEffect(() => {
    dispatch(reset());
    if (propsId !== undefined) {
        dispatch(getKemrMedicalTreatments({}));
        dispatch(getKemrMedicalBills({}));
    }
  }, []);

  // 진료내역 변경되면 처방전 내역 변경
  useEffect(() => {
    dispatch(getKemrMedicalBills({}));
  }, [kemrMedicalTreatments]);

  // 받는 id 값이 바뀌면 state 초기화
  useEffect(() => {
    if (propsId !== undefined) {
      dispatch(getKemrMedicalTreatments({}));
      dispatch(getKemrMedicalBills({}));
    } else {
      dispatch(reset());
    }
  }, [propsId]);

  // 최근 방문일, 최근 진료 정보의 상태를 설정
  useEffect(() => {
    if (propsId !== undefined) {
      setLastDoctor(
        kemrMedicalTreatments
        .filter(kemrMedicalTreatment => 
          kemrMedicalTreatment.kemrPatient.id.toString() === propsId &&
          kemrMedicalBills
          .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length !== 0)
          .map(kemrMedicalTreatment => kemrMedicalTreatment.kemrDoctor.kemrDoctorName).at(-1)
      );
    }
  }, [kemrMedicalBills]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dl className="jh-entity-details">
                <dt>
                  <span id="id">최근 진료 정보</span>
                </dt>
                <dd>
                  {propsId !== undefined ? (
                    lastDoctor ? lastDoctor : "진료 내역 없음"
                  ) : null}
                </dd>
              </dl>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TreatmentInfoComponent;
