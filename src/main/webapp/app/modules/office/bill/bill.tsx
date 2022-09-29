/**
 * jkmoon
 * 원무-수납 컴포넌트
 */
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { ValidatedField } from 'react-jhipster';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from 'reactstrap';
import {  getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrPrescriptions } from 'app/entities/kemr-prescription/kemr-prescription.reducer';
import { getEntity, reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import PatientInfoComponent from '../patient-info/patient-info';
import BillKohmModal from './bill-kohm-modal';

export const BillPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  // 입력 값을 초기화하는 메소드
  const setDefault = () => {
    checkCardRadio();
  };
  
  useEffect(() => {
    // 주석 처리하면 오류 있는지 확인 필요
    // dispatch(reset());
    if(id !== undefined) {
      dispatch(getEntity(id));
      dispatch(getKemrPatients({}));
      dispatch(getKemrPrescriptions({}));
    }
  }, []);

  const kemrMedicalTreatmentEntity = useAppSelector(state => state.kemrMedicalTreatment.entity);
  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrPrescriptions = useAppSelector(state => state.kemrPrescription.entities);

  // 진료내역 테이블에 저장된 값으로 다른 테이블에서 정보를 찾음
  const kemrPatientEntity = kemrPatients.find(kemrPatient => kemrPatient.id.toString() === kemrMedicalTreatmentEntity?.kemrPatient?.id.toString());

  // 첩약 수령 방법 및 주소 상태 설정 메소드
  const handleMethodAddress = (method, address) => {
    setMethodAddress({...methodAddress,
                      method: method,
                      address: address});
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

    setCashPhone('');
    setCash('');
    setCardCashPhone('');
  };

  // 진료내역이 변경되면 값 초기화, 진료내역 선택 있으면 버튼 활성화
  useEffect(() => {
    setDefault();
  }, [id]);

  // 카드 + 현금 라디오의 현금 금액 입력 값 변경 시, 아래 휴대폰 번호 입력란 활성 상태 설정
  useEffect(() => {
    if (cash !== '') setCardCashPhoneActivated(false);
    else setCardCashPhoneActivated(true);
  }, [cash]);

  return (
    <div>
      <div className="container-fluid office-view-container" id="office-view-container">
        <Card className="jh-card">
          &nbsp;
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
                진료 비용
              </h2>
            </Col>
          </Row>
          &nbsp;
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
          &nbsp;
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
          <div className="justify-content-center d-flex">
            <Button outline color="primary" id="cancel-write" data-cy="entityWriteCancelButton" type="button" disabled={cancelButtonActivated}>
              <span className="d-none d-md-inline">취소</span>
            </Button>
            &nbsp;
            <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="button" disabled={billButtonActivated}>
              <span className="d-none d-md-inline">수납 완료</span>
            </Button>
          </div>
          &nbsp;
        </Card>
      </div>
      <div className="container-fluid office-right-side-container" id="office-right-side-container">
          {/* 환자 정보 컴포넌트 호출 */}
          &nbsp;
          <PatientInfoComponent kemrPatientId={kemrPatientEntity?.id.toString()} />
      </div>
    </div>
  );
};

export default BillPage;
