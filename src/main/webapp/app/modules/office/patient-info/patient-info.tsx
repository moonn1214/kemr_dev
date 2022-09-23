// /**
//  * jkmoon
//  * 원무 환자 정보 컴포넌트
//  */
import { APP_KR_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { TextFormat } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import { getEntity as getKemrPatientEntity, reset } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalBills } from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';

// 페이지마다 path 파라미터의 id에 사용하는 값이 달라서 (진료내역id, 환자id ...) props로 받아서 사용
export interface IPatientInfoComponentProps {
  kemrPatientId: string;
}

export const PatientInfoComponent = (props: IPatientInfoComponentProps) => {
  const propsId = props.kemrPatientId;
  const dispatch = useAppDispatch();

  const kemrPatientEntity = useAppSelector(state => state.kemrPatient.entity);
  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);
  const kemrMedicalBills = useAppSelector(state => state.kemrMedicalBill.entities);

//   최근 방문일, 최근 진료 정보 상태
  const [lastVisitDate, setLastVisitDate] = useState('');
  const [lastDoctor, setLastDoctor] = useState('');
  
  useEffect(() => {
    dispatch(reset());
    if (propsId !== undefined) {
      dispatch(getKemrPatientEntity(propsId));
      dispatch(getKemrMedicalTreatments({}));
      dispatch(getKemrMedicalBills({}));
    }
  }, []);

//   받는 id 값이 바뀌면 state 초기화
  useEffect(() => {
    if (propsId !== undefined) {
      dispatch(getKemrPatientEntity(propsId));
      dispatch(getKemrMedicalTreatments({}));
      dispatch(getKemrMedicalBills({}));
    } else {
      dispatch(reset());
    }
  }, [propsId]);

//   최근 방문일, 최근 진료 정보의 상태를 설정
  useEffect(() => {
    if (propsId !== undefined) {
      setLastVisitDate(
        kemrMedicalTreatments
        .filter(kemrMedicalTreatment => 
          kemrMedicalTreatment.kemrPatient.id.toString() === propsId &&
          kemrMedicalBills
          .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length !== 0)
        .map(kemrMedicalTreatment => kemrMedicalTreatment.kemrMedicalTreatmentDate).at(-1)
      );

      setLastDoctor(
        kemrMedicalTreatments
        .filter(kemrMedicalTreatment => 
          kemrMedicalTreatment.kemrPatient.id.toString() === propsId &&
          kemrMedicalBills
          .filter(kemrMedicalBill => (kemrMedicalBill.kemrMedicalTreatment.id === kemrMedicalTreatment.id)).length !== 0)
        .map(kemrMedicalTreatment => kemrMedicalTreatment.kemrDoctor.kemrDoctorName).at(-1)
      );
    }
  }, [kemrMedicalBills, kemrMedicalTreatments]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dl className="jh-entity-details">
                <dt>
                  <span id="id">환자번호</span>
                </dt>
                <dd>{propsId && kemrPatientEntity.id}</dd>
                <dt>
                  <span id="kemrPatientName">최근 방문일</span>
                </dt>
                <dd>{propsId && lastVisitDate ? (
                  <TextFormat value={lastVisitDate} type="date" format={APP_KR_DATE_FORMAT} />
                  ) : null}
                </dd>
                <dt>
                  <span id="kemrPatientBirthday">생년월일</span>
                </dt>
                <dd>{propsId && kemrPatientEntity.kemrPatientBirthday ? (
                  <TextFormat value={kemrPatientEntity.kemrPatientBirthday} type="date" format={APP_KR_DATE_FORMAT} />
                  ) : null}</dd>
                <dt>
                  <span id="kemrPatientName">성별</span>
                </dt>
                <dd>{propsId && kemrPatientEntity.kemrPatientSex}</dd>
                &nbsp;
                <dt>
                  <span id="id">최근 진료 정보</span>
                </dt>
                <dd>{propsId && lastDoctor ? lastDoctor : null}</dd>
              </dl>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PatientInfoComponent;
