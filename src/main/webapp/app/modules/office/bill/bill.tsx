// /**
//  * jkmoon
//  * 원무-수납 컴포넌트
//  */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_SHORT_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { TextFormat, ValidatedField } from 'react-jhipster';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, DropdownItem, Row } from 'reactstrap';
import {  getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
import { getEntities as getKemrPrescriptions } from 'app/entities/kemr-prescription/kemr-prescription.reducer';
import { getEntity, reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import BillReceiptModal from './bill-receipt-modal';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import WaitingComponent from '../waiting/waiting';

export const BillPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  // 현금 결제 버튼 활성 상태 설정
  const setCashReceiptButton = (value) => {
    (value === '현금') ? (
      setCashReceiptButtonActivated(false), 
      setCashReceiptButtonValue('취소')
    ) : (
      setCashReceiptButtonActivated(true), 
      setCashReceiptButtonValue('현금')
    )
  };

  // 현금 영수증 발행 모달 닫는 메소드
  const handleClose = () => {
    setShowReceiptModal(false);
  };

  // 직접 입력하는 영역의 값을 초기화하는 메소드
  const setDefault = () => {
    setReceiveMethod('');
    setCashField('');
    setCardField('');
  };
  
  useEffect(() => {
    dispatch(reset());
    if(id !== undefined) {
      dispatch(getEntity(id));
      dispatch(getKemrPatients({}));
      dispatch(getKemrDoctors({}));
      dispatch(getKemrPrescriptions({}));
    }
  }, []);

  const kemrMedicalTreatmentEntity = useAppSelector(state => state.kemrMedicalTreatment.entity);
  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);
  const kemrPrescriptions = useAppSelector(state => state.kemrPrescription.entities);

  // 진료내역 테이블에 저장된 값으로 다른 테이블에서 정보를 찾음
  const kemrPatientEntity = kemrPatients.find(it => it.id.toString() === kemrMedicalTreatmentEntity?.kemrPatient?.id.toString());
  const kemrDoctorEntity = kemrDoctors.find(it => it.id.toString() === kemrMedicalTreatmentEntity?.kemrDoctor?.id.toString());

  // 처방전 테이블에서 현재 진료내역의 id 값을 가진 정보들을 찾음
  const kemrMedicinesOfThis = kemrPrescriptions
                                .filter(
                                  kemrPrescription => kemrPrescription.kemrMedicalTreatment.id.toString() === kemrMedicalTreatmentEntity?.id?.toString()
                                ).map(
                                  // kemrPrescription => <>{kemrPrescription.kemrMedicine.kemrMedicineName}<br /></>
                                  kemrPrescription => kemrPrescription.kemrMedicine.kemrMedicineName + ' '
                                );

  // 첩약 수령 방법의 상태
  const [receiveMethod, setReceiveMethod] = useState('');

  // 주소 상태
  const [patientAddressValue, setPatientAddressValue] = useState('');

  // 현금 결제 버튼 상태
  const [cashReceiptButtonActivated, setCashReceiptButtonActivated] = useState(true);
  const [cashReceiptButtonValue, setCashReceiptButtonValue] = useState('현금');
  // 현금 영수증 모달 상태
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  // 현금 + 카드 결제 필드 값 상태 및 버튼 상태
  const [cashField, setCashField] = useState('');
  const [cardField, setCardField] = useState('');
  const [cashPlusCardButtonActivated, setCashPlusCardButtonActivated] = useState(true);

  // 취소 및 수납 버튼 상태
  const [cancelButtonActivated, setCancelButtonActivated] = useState(true);
  const [billButtonActivated, setBillButtonActivated] = useState(true);

  // 현금 + 카드 입력값 상태에 따라 버튼 활성 상태 변경
  useEffect(() => {
    if (cashField !== '' && cardField !== '') setCashPlusCardButtonActivated(false);
    else setCashPlusCardButtonActivated(true);
  }, [cashField, cardField]);

  // 진료내역이 변경되면 값 초기화
  useEffect(() => {
    setDefault();
  }, [id]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12">
          <div className="d-flex justify-content-end">
            <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">돌아가기</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            수납 환자 정보
          </h2>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dl className="jh-entity-details">
                <dt>
                  <span id="id">환자번호</span>
                </dt>
                <dd>{kemrPatientEntity?.id}</dd>
                <dt>
                  <span id="kemrPatientName">환자명</span>
                </dt>
                <dd>{kemrPatientEntity?.kemrPatientName}</dd>
                <dt>
                  <span id="kemrPatientBirthday">생년월일</span>
                </dt>
                <dd>{kemrPatientEntity?.kemrPatientBirthday}</dd>
                <dt>
                  <span id="kemrPatientName">진료날짜</span>
                </dt>
                <dd>
                  {kemrMedicalTreatmentEntity?.kemrMedicalTreatmentDate ? (
                    <TextFormat value={kemrMedicalTreatmentEntity?.kemrMedicalTreatmentDate} type="date" format={APP_SHORT_DATE_FORMAT} />
                  ) : null}
                </dd>
                <dt>
                  <span id="kemrPatientName">진료실</span>
                </dt>
                <dd>{kemrDoctorEntity?.kemrDoctorName}</dd>
              </dl>
            </Col>
          </Row>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            비용
          </h2>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dl className="jh-entity-details">
                <dt>
                  <span id="id">총 진료비용</span>
                </dt>
                <dd></dd>
                <dt>
                  <span id="id">공단 부담액</span>
                </dt>
                <dd></dd>
                <dt>
                  <span id="id">환자 부담액<br />(수납 비용)</span>
                </dt>
                <dd></dd>
                <dt>
                  <span id="id">진료 항목별 비용</span>
                </dt>
                <dd></dd>
              </dl>
            </Col>
          </Row>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            처방 내역
          </h2>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dl className="jh-entity-details">
                <dt>
                  <span id="id">처방약</span>
                </dt>
                <dd>{kemrMedicinesOfThis}</dd>
                <dt>
                  <span id="id">첩약</span>
                </dt>
                <ValidatedField
                  label="주소 및 정보"
                  id="kemr-medical-bill-kemrMedicalBillMethod"
                  name="kemrMedicalBillMethod"
                  data-cy="kemrMedicalBillMethod"
                  type="text"
                  defaultValue={kemrPatientEntity?.kemrPatientAddress}
                  validate={{
                    maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                  }}
                  onChange={e => setPatientAddressValue(e.target.value)}
                />
                <ValidatedField
                  id="kemr-medical-treatment-kemrDoctor"
                  name="kemrDoctor"
                  data-cy="kemrDoctor"
                  label="수령 방법"
                  type="text"
                  value={receiveMethod}
                  readOnly
                />
                <NavDropdown
                  icon="th-list"
                  name="수령 방법 선택"
                  id="entity-menu"
                  data-cy="entity"
                  style={{ maxHeight: '80vh', overflow: 'auto' }}
                >
                  <option value="" key="0" />
                  <DropdownItem>
                    <option onClick={() => setReceiveMethod('택배')}>
                      택배
                    </option>
                  </DropdownItem>
                  <DropdownItem>
                    <option onClick={() => setReceiveMethod('직접 방문')}>
                      직접 방문
                    </option>
                  </DropdownItem>
                </NavDropdown>
              </dl>
            </Col>
          </Row>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            수납 방법
          </h2>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Button color="info" id="entity" data-cy="Button" type="button" onClick={() => setCashReceiptButton(cashReceiptButtonValue)}>
            {/* 현금 */}
            {cashReceiptButtonValue}
          </Button>
          &nbsp;
          <Button color="info" id="entity" data-cy="Button" type="button" disabled={cashReceiptButtonActivated} onClick={() => setShowReceiptModal(true)}>
            현금 영수증 발행
          </Button>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Button color="info" id="entity" data-cy="Button" type="button" disabled={!cashReceiptButtonActivated}>
            카드
          </Button>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedField
            label="현금"
            id="kemr-medical-bill-kemrMedicalBillMethod"
            name="kemrMedicalBillMethod"
            data-cy="kemrMedicalBillMethod"
            type="text"
            validate={{
              maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
            }}
            onChange={e => setCashField(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
            // 값 넘길 때 value.replace(',', '')
            value={cashField}
          />
          <ValidatedField
            label="카드"
            id="kemr-medical-bill-kemrMedicalBillMethod"
            name="kemrMedicalBillMethod"
            data-cy="kemrMedicalBillMethod"
            type="text"
            validate={{
              maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
            }}
            onChange={e => setCardField(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
            value={cardField}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <Button id="cancel-write" data-cy="entityWriteCancelButton" color="info" type="button" disabled={cashPlusCardButtonActivated}>
            <span className="d-none d-md-inline">현금 + 카드</span>
          </Button>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Button id="cancel-write" data-cy="entityWriteCancelButton" color="danger" type="button" disabled={cancelButtonActivated}>
            <FontAwesomeIcon icon="cancel" />
            &nbsp;
            <span className="d-none d-md-inline">취소</span>
          </Button>
          &nbsp;
          <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="button" disabled={billButtonActivated}>
            <FontAwesomeIcon icon="save" />
            &nbsp; 수납
          </Button>
        </Col>
      </Row>
      &nbsp;
      {/* 대기 컴포넌트 호출 */}
      <WaitingComponent 
        waitingMode='billWaiting' 
        diagnosisWaitingButtonActivated={false} 
        treatmentWaitingButtonActivated={false}
        billWaitingButtonActivated={true} 
      />

      {/* 현금 영수증 발행 모달 컴포넌트 호출 */}
      <BillReceiptModal 
        showModal={showReceiptModal}
        kemrPatientId={kemrPatientEntity?.id}
        kemrPatientCellphone={kemrPatientEntity?.kemrPatientCellphone}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BillPage;
