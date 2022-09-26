/**
 * jkmoon
 * 원무-수납 컴포넌트
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { APP_SHORT_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { TextFormat, ValidatedField } from 'react-jhipster';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, DropdownItem, Row, Table } from 'reactstrap';
import {  getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
import { getEntities as getKemrPrescriptions } from 'app/entities/kemr-prescription/kemr-prescription.reducer';
import { getEntity, reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import WaitingComponent from '../waiting/waiting';
import PatientInfoComponent from '../patient-info/patient-info';
import BillKohmModal from './bill-kohm-modal';

export const BillPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  // 입력 값을 초기화하는 메소드
  const setDefault = () => {
    // setReceiveMethod('');
    checkCardRadio();
  };
  
  useEffect(() => {
    dispatch(reset());
    if(id !== undefined) {
      dispatch(getEntity(id));
      dispatch(getKemrPatients({}));
      // dispatch(getKemrDoctors({}));
      dispatch(getKemrPrescriptions({}));
    }
  }, []);

  const kemrMedicalTreatmentEntity = useAppSelector(state => state.kemrMedicalTreatment.entity);
  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  // const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);
  const kemrPrescriptions = useAppSelector(state => state.kemrPrescription.entities);

  // 진료내역 테이블에 저장된 값으로 다른 테이블에서 정보를 찾음
  const kemrPatientEntity = kemrPatients.find(it => it.id.toString() === kemrMedicalTreatmentEntity?.kemrPatient?.id.toString());
  // const kemrDoctorEntity = kemrDoctors.find(it => it.id.toString() === kemrMedicalTreatmentEntity?.kemrDoctor?.id.toString());

  // 처방전 테이블에서 현재 진료내역의 id 값을 가진 정보들을 찾음
  // const kemrMedicinesOfThis = kemrPrescriptions
  //                             .filter(
  //                               kemrPrescription => kemrPrescription.kemrMedicalTreatment.id.toString() === kemrMedicalTreatmentEntity?.id?.toString()
  //                             ).map(
  //                               kemrPrescription => kemrPrescription.kemrMedicine.kemrMedicineName + ' '
  //                             );

  // 첩약 수령 방법의 상태
  // const [receiveMethod, setReceiveMethod] = useState('');

  // 주소 상태
  // const [patientAddressValue, setPatientAddressValue] = useState('');

  // 첩약 수령 방법 및 주소 상태 설정 메소드
  const handleMethodAddress = (method, address) => {
    setMethodAddress({...methodAddress,
                      method: method,
                      address: address
                    });
    setShowKohmModal(false);
  };
  
  // 모달을 닫는 메소드
  const handleClose = () => {
    setShowKohmModal(false);
  };

  // 첩약 모달 활성 상태
  const [showKohmModal, setShowKohmModal] = useState(false);

  // 첩약 수령 방법 및 주소 상태 (실제 수납 시, backend에 넘길 때 사용하는 값)
  const [methodAddress, setMethodAddress] = useState({ method: 'V', address: '' });

  // 첫번째 박스의 라디오 버튼 체크 상태
  const [cardRadioChecked, setCardRadioChecked] = useState(true);
  const [cashRadioChecked, setCashRadioChecked] = useState(false);
  const [cardCashRadioChecked, setCardCashRadioChecked] = useState(false);

  // 두번째 박스의 현금 영수증 라디오 버튼 활성 상태
  const [cashReceiptRadioActivated, setCashReceiptRadioActivated] = useState(true);
  const [cardCashReceiptRadioActivated, setCardCashReceiptRadioActivated] = useState(true);

  // 두번째 박스의 라디오 버튼 체크 상태
  const [cashReceiptRadioChecked, setCashReceiptRadioChecked] = useState(false);
  const [cardCashRadioAutoChecked, setCardCashRadioAutoChecked] = useState(false);
  const [cardCashReceiptRadioChecked, setCardcashReceiptRadioChecked] = useState(false);

  // 두번째 박스의 입력란 활성 상태
  const [cashPhoneActivated, setCashPhoneActivated] = useState(true);
  const [cashActivated, setCashActivated] = useState(true);
  const [cardCashPhoneActivated, setCardCashPhoneActivated] = useState(true);

  // 두번째 박스의 입력 값 상태
  const [cashPhone, setCashPhone] = useState('');
  const [cash, setCash] = useState('');
  const [cardCashPhone, setCardCashPhone] = useState('');

  // 취소 및 수납 버튼 상태
  const [cancelButtonActivated, setCancelButtonActivated] = useState(true);
  const [billButtonActivated, setBillButtonActivated] = useState(true);

  // 첫번째 박스의 카드 라디오 버튼 클릭 메소드
  const checkCardRadio = () => {
    setCardRadioChecked(true);
    setCashRadioChecked(false);
    setCardCashRadioChecked(false);

    setCashReceiptRadioActivated(true);
    setCardCashReceiptRadioActivated(true);

    setCashReceiptRadioChecked(false);
    setCardCashRadioAutoChecked(false);
    setCardcashReceiptRadioChecked(false);

    setCashPhoneActivated(true);
    setCashActivated(true);
    setCardCashPhoneActivated(true);

    setCashPhone('');
    setCash('');
    setCardCashPhone('');
  };

  // 첫번째 박스의 현금 라디오 버튼 클릭 메소드
  const checkCashRadio = () => {
    setCardRadioChecked(false);
    setCashRadioChecked(true);
    setCardCashRadioChecked(false);

    setCashReceiptRadioActivated(false);
    setCardCashReceiptRadioActivated(true);
    
    setCashReceiptRadioChecked(false);
    setCardCashRadioAutoChecked(false);
    setCardcashReceiptRadioChecked(false);

    setCashPhoneActivated(true);
    setCashActivated(true);
    setCardCashPhoneActivated(true);

    setCashPhone('');
    setCash('');
    setCardCashPhone('');
  };

  // 첫번째 박스의 카드+현금 라디오 버튼 클릭 메소드
  const checkCardCashRadio = () => {
    setCardRadioChecked(false);
    setCashRadioChecked(false);
    setCardCashRadioChecked(true);

    setCashReceiptRadioActivated(true);
    setCardCashReceiptRadioActivated(false);

    setCashReceiptRadioChecked(false);
    setCardCashRadioAutoChecked(true);
    setCardcashReceiptRadioChecked(false);

    setCashPhoneActivated(true);
    setCashActivated(true);
    setCardCashPhoneActivated(true);

    setCashPhone('');
    setCash('');
    setCardCashPhone('');
  };

  // 두번째 박스 현금 영수증 발행 라디오 버튼 클릭 메소드
  const checkCashReceiptRadio = (activated) => {
    setCashReceiptRadioChecked(!activated);

    setCashPhoneActivated(activated);
    setCashActivated(true);
    setCardCashPhoneActivated(true);

    setCashPhone('');
    setCash('');
    setCardCashPhone('');
  };

  // 두번째 박스 현금 금액 입력 및 현금 영수증 발행 라디오 버튼 클릭 메소드
  const checkCardCashReceiptRadio = (activated) => {
    setCardcashReceiptRadioChecked(!activated);

    setCashPhoneActivated(true);
    setCashActivated(activated);
    setCardCashPhoneActivated(activated);

    setCashPhone('');
    setCash('');
    setCardCashPhone('');
  };

  // 진료내역이 변경되면 값 초기화, 진료내역 선택 있으면 버튼 활성화
  useEffect(() => {
    setDefault();
  }, [id]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12">
          <div className="d-flex justify-content-end">
            <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/" replace color="secondary">
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
            진료 비용
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Row>
              <Col md="4">
                <dt>
                  <span id="id">환자 부담액</span>
                </dt>
                <dd></dd>
              </Col>
              <Col md="4">
                <dt>
                  <span id="id">공단 부담액</span>
                </dt>
                <dd></dd>
              </Col>
              <Col md="4">
                <dt>
                  <span id="id">총 진료비용</span>
                </dt>
                <dd></dd>
              </Col>
            </Row>
            &nbsp;
            <hr />
            &nbsp;
              <Col md="12">
                <dt>
                  <span id="id">진료 항목별 비용</span>
                </dt>
                &nbsp;
                <Table responsive>
                  <colgroup>
                    <col width="20%"/>
                    <col width="30%"/>
                    <col width="20%"/>
                    <col width="30%"/>
                  </colgroup>
                  <thead>
                    <tr>
                      <th>항목</th>
                      <th />
                      <th>비용</th>
                      <th />
                    </tr>
                  </thead>
                  {/* 예시 */}
                  <tbody>
                    <tr key={`entity-1`} data-cy="entityTable">
                      <td>
                        처방약
                      </td>
                      <td />
                      <td>
                      {kemrPrescriptions
                        .filter(
                          kemrPrescription => kemrPrescription.kemrMedicalTreatment.id.toString() === kemrMedicalTreatmentEntity?.id?.toString()
                        ).map(
                          kemrPrescription => kemrPrescription.kemrMedicine.kemrMedicinePrice
                        ).reduce((result, medicinePrice) => {
                          return result + medicinePrice;
                        }, 0)
                        .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      } 원
                      </td>
                      <td>
                        {/* 보험 적용 여부 */}
                      </td>
                    </tr> 
                    <tr key={`entity-2`} data-cy="entityTable">
                      <td>
                        첩약
                      </td>
                      <td>
                        <Button 
                          id="cancel-write" 
                          data-cy="entityWriteCancelButton" 
                          color="primary" 
                          size="sm"
                          type="button" 
                          onClick={() => setShowKohmModal(true)}>
                          <span className="d-none d-md-inline">팝업</span>
                        </Button>
                      </td>
                      <td>
                      </td>
                      <td>
                      {/* 보험 적용 여부 */}
                      </td>
                    </tr> 
                  </tbody>
                </Table>
              </Col>
          </Card>
        </Col>
      </Row>
      <BillKohmModal 
        showModal={showKohmModal}
        address={kemrPatientEntity?.kemrPatientAddress}
        handleClose={handleClose}
        saveMethodAddress={handleMethodAddress}
      />
      {/* &nbsp;
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
      <hr />
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
      <hr />
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
      </Row> */}
      &nbsp;
      <hr />
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            수납 방법
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Row>
              <Col md="12">
                <input type="radio" checked={cardRadioChecked} onClick={checkCardRadio} readOnly /> 카드
              </Col>
              &nbsp;
              <Col md="12">
                <input type="radio" checked={cashRadioChecked} onClick={checkCashRadio} readOnly /> 현금
              </Col>
              &nbsp;
              <Col md="12">
                <input type="radio" checked={cardCashRadioChecked} onClick={checkCardCashRadio} readOnly /> 카드 + 현금
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md="8">
          <Card>
            <Row>
              <Col md="12">
                <input type="radio" disabled={cashReceiptRadioActivated} checked={cashReceiptRadioChecked} onClick={() => checkCashReceiptRadio(cashReceiptRadioChecked)} readOnly /> 현금 영수증 발행
                <ValidatedField
                  id="kemr-medical-bill-kemrMedicalBillMethod"
                  name="kemrMedicalBillMethod"
                  data-cy="kemrMedicalBillMethod"
                  type="text"
                  placeholder='휴대폰 번호 입력 ("-" 없이 입력)'
                  disabled={cashPhoneActivated}
                  onChange={e => setCashPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  value={cashPhone}
                />
              </Col>
              &nbsp;
              <Col md="12">
                <input type="radio" disabled={!cardCashRadioAutoChecked} checked={cardCashRadioAutoChecked} readOnly /> 카드 + 현금
              </Col>
              <Col md="12">
                <input type="radio" disabled={cardCashReceiptRadioActivated} checked={cardCashReceiptRadioChecked} onClick={() => checkCardCashReceiptRadio(cardCashReceiptRadioChecked)} readOnly /> 현금 금액 입력 및 현금 영수증 발행
                <ValidatedField
                  id="kemr-medical-bill-kemrMedicalBillMethod"
                  name="kemrMedicalBillMethod"
                  data-cy="kemrMedicalBillMethod"
                  type="text"
                  placeholder="현금 금액 입력"
                  disabled={cashActivated}
                  // 값 넘길 때 value.replace(',', '')
                  onChange={e => setCash(e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
                  value={cash}
                />
                <ValidatedField
                  id="kemr-medical-bill-kemrMedicalBillMethod"
                  name="kemrMedicalBillMethod"
                  data-cy="kemrMedicalBillMethod"
                  type="text"
                  placeholder='휴대폰 번호 입력 ("-" 없이 입력)'
                  disabled={cardCashPhoneActivated}
                  onChange={e => setCardCashPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  value={cardCashPhone}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      &nbsp;
      <hr />
      &nbsp;
      {/* 환자 정보 컴포넌트 호출 */}
      <PatientInfoComponent kemrPatientId={kemrPatientEntity?.id.toString()} />
      &nbsp;
      <hr />
      &nbsp;
      <Row className="justify-content-center">
        <Col md="5" />
        <Col md="1">
          <Button outline color="primary" id="cancel-write" data-cy="entityWriteCancelButton" type="button" disabled={cancelButtonActivated}>
            <span className="d-none d-md-inline">취소</span>
          </Button>
        </Col>
        <Col md="6">
          <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="button" disabled={billButtonActivated}>
            <span className="d-none d-md-inline">수납 완료</span>
          </Button>
        </Col>
      </Row>
      &nbsp;
      <hr />
      {/* 대기 컴포넌트 호출 */}
      <WaitingComponent 
        waitingMode='billWaiting' 
        diagnosisWaitingButtonActivated={false} 
        treatmentWaitingButtonActivated={false}
        billWaitingButtonActivated={true} 
      />
    </div>
  );
};

export default BillPage;
