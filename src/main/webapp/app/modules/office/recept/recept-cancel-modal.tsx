/**
 * jkmoon
 * 원무-접수 취소 컴포넌트
 */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IReceptCancelModalProps {
  showModal: boolean;
  handleClose: () => void;
  confirmCancel: () => void;
}

export const ReceptCancelModal = (props: IReceptCancelModalProps) => {
  return (
    <div>
      <Modal isOpen={props.showModal} toggle={props.handleClose}>
        <ModalHeader toggle={props.handleClose} data-cy="kemrMedicalTreatmentDeleteDialogHeading">
          취소 확인
        </ModalHeader>
        <ModalBody id="jyemrApp.kemrMedicalTreatment.delete.question">
          현재 작성 중인 환자의 접수를 취소하시겠습니까?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; 취소
          </Button>
          <Button
            id="jhi-confirm-delete-kemrMedicalTreatment"
            data-cy="entityConfirmDeleteButton"
            color="primary"
            onClick={props.confirmCancel}
          >
            <FontAwesomeIcon icon="trash" />
            &nbsp; 확인
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ReceptCancelModal;
