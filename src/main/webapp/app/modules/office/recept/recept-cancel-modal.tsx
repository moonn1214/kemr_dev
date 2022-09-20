// /**
//  * jkmoon
//  * 원무-접수 취소 컴포넌트
//  */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IReceptCancelModalProps {
  showModal: boolean;
  kemrPatientId: string;
  handleClose: () => void;
  confirmCancel: () => void;
}

export const ReceptCancelModal = (props: IReceptCancelModalProps) => {
  // 접수 컴포넌트(recept)에서 환자 정보 작성 여부에 따라 문구를 변경하기 위해 선언
  const existingPatientQuestion = props.kemrPatientId + '번 환자의 접수를 취소하시겠습니까?';
  const nonexistingPatientQuestion = '현재 작성 중인 환자의 접수를 취소하시겠습니까?';

  return (
    <div>
      <Modal isOpen={props.showModal} toggle={props.handleClose}>
        <ModalHeader toggle={props.handleClose} data-cy="kemrMedicalTreatmentDeleteDialogHeading">
          취소 확인
        </ModalHeader>
        <ModalBody id="jyemrApp.kemrMedicalTreatment.delete.question">
          {props.kemrPatientId ? existingPatientQuestion : nonexistingPatientQuestion}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; 취소
          </Button>
          <Button
            id="jhi-confirm-delete-kemrMedicalTreatment"
            data-cy="entityConfirmDeleteButton"
            color="danger"
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
