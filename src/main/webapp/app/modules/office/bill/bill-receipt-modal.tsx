// /**
//  * jkmoon
//  * 원무-수납 현금영수증발행 모달 컴포넌트
//  */
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidatedField } from 'react-jhipster';

export interface IBillReceiptModalProps {
  showModal: boolean;
  kemrPatientId: string;
  kemrPatientCellphone: string;
  handleClose: () => void;
};

export const BillReceiptModal = (props: IBillReceiptModalProps) => {

  const [patientCellphoneValue, setPatientCellphoneValue] = useState('');
  const [receiptButtonActivated, setReceiptButtonActivated] = useState(true);

  useEffect(() => {
    if (patientCellphoneValue !== '') setReceiptButtonActivated(false);
    else setReceiptButtonActivated(true);
  }, [patientCellphoneValue]);

  useEffect(() => {
    if (props.kemrPatientCellphone !== '') setReceiptButtonActivated(false);
    else setReceiptButtonActivated(true);
  }, [props.showModal]);

  return (
    <div>
      <Modal isOpen={props.showModal} toggle={props.handleClose}>
        <ModalHeader toggle={props.handleClose} data-cy="kemrMedicalTreatmentDeleteDialogHeading">
          현금 영수증 발행
        </ModalHeader>
        <ModalBody id="jyemrApp.kemrMedicalTreatment.delete.question">
          <ValidatedField
            label="휴대폰번호"
            id="kemr-medical-bill-kemrMedicalBillMethod"
            name="kemrMedicalBillMethod"
            data-cy="kemrMedicalBillMethod"
            type="text"
            defaultValue={props.kemrPatientCellphone}
            onChange={e => setPatientCellphoneValue(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; 취소
          </Button>
          {/* 발행 메소드 추가 필요 */}
          <Button id="jhi-confirm-delete-kemrMedicalTreatment" data-cy="entityConfirmDeleteButton" color="primary" disabled={receiptButtonActivated}>
            <FontAwesomeIcon icon="save" />
            &nbsp; 확인
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BillReceiptModal;