/**
 * jkmoon
 * 원무-수납 첩약 컴포넌트
 * kohm (Korean Oriental Herbal Medicine)
 */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidatedField } from 'react-jhipster';

export interface IBillKohmModalProps {
  showModal: boolean;
  address: string;
  handleClose: () => void;
  saveMethodAddress: (method: string, address: string) => void;
}

export const BillKohmModal = (props: IBillKohmModalProps) => {
  // 라디오 버튼 체크 상태
  const [radioChecked, setRadioChecked] = useState(true);

  // 입력값 상태
  const [method, setMethod] = useState('V');
  const [address, setAddress] = useState('');

  // 접수 버튼 클릭 여부 상태
  const [saveButtonClicked, setSaveButtonClicked] = useState({ clicked: false,  method: 'V', address: ''}); 

  // 직접 방문 라디오 버튼 체크 메소드 (V: 방문, D: 택배)
  const checkVisitRadio = () => {
    if (radioChecked) setRadioChecked(radioChecked);
    else setRadioChecked(!radioChecked);
    setMethod('V');
    setAddress('');
  };

  // 택배 라디오 버튼 체크 메소드  
  const checkDeliveryRadio = () => {
    if (!radioChecked) setRadioChecked(radioChecked);
    else setRadioChecked(!radioChecked);
    setMethod('D');
    setAddress(props.address);
  };

  // (수정)취소 버튼 클릭 시 실행  
  const closeModal = () => {
    props.handleClose();
    if (!saveButtonClicked) {
      setRadioChecked(saveButtonClicked.clicked);
      setMethod(saveButtonClicked.method);
      setAddress(saveButtonClicked.address);
    } else {
      setRadioChecked(!saveButtonClicked.clicked);
      setMethod(saveButtonClicked.method);
      setAddress(saveButtonClicked.address);
    }
  };

  return (
    <div>
      <Modal isOpen={props.showModal} toggle={closeModal}>
        <ModalHeader toggle={closeModal} data-cy="kemrMedicalTreatmentDeleteDialogHeading">
          수령 방법 및 주소
        </ModalHeader>
        <ModalBody id="jyemrApp.kemrMedicalTreatment.delete.question">
          <Row>
            <Col md="12">
              <dt>
                <span id="id">수령 방법</span>
              </dt>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col md="12">
              <input type="radio" checked={radioChecked} onClick={checkVisitRadio} readOnly /> 직접 방문
            </Col>
            &nbsp;
            <Col md="12">
              <input type="radio" checked={!radioChecked} onClick={checkDeliveryRadio} readOnly /> 택배
            </Col>
          </Row>
          &nbsp;
          <hr />
          &nbsp;
          <Row>
            <Col md="12">
              <dt>
                <span id="id">주소</span>
              </dt>
            </Col>
            &nbsp;
            <Col md="12">
              <ValidatedField
                id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                name="kemrMedicalTreatmentNurseMessage"
                data-cy="kemrMedicalTreatmentNurseMessage"
                type="text"
                disabled={radioChecked}
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
                onChange={e => setAddress(e.target.value)}
                value={address || ''}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; 취소
          </Button>
          <Button
            id="jhi-confirm-delete-kemrMedicalTreatment"
            data-cy="entityConfirmDeleteButton"
            color="primary"
            onClick={() => {
              props.saveMethodAddress(method, address);
              setSaveButtonClicked({...saveButtonClicked, clicked: true, method: method, address: address});
            }}
          >
            <FontAwesomeIcon icon="save" />
            &nbsp; 저장
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BillKohmModal;
