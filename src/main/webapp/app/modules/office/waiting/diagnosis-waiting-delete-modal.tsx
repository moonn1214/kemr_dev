// /**
//  * jkmoon
//  * 원무-진료 대기 삭제 모달 컴포넌트
//  */
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/config/store';
import { deleteEntity } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';

export interface IDiagnosisWaitingDeleteModalProps {
  showModal: boolean;
  kemrPatientId: string;
  kemrMedicalTreatmentId: string;
  handleClose: () => void;
};

const DiagnosisWaitingDeleteModal = (props: IDiagnosisWaitingDeleteModalProps) => {
  const dispatch = useAppDispatch();

  // 진료 대기 상의 진료 내역 삭제 메소드
  const confirmDelete = () => {
    props.handleClose();
    dispatch(deleteEntity(props.kemrMedicalTreatmentId));
  };

  return (
    <Modal isOpen={props.showModal} toggle={props.handleClose}>
      <ModalHeader toggle={props.handleClose} data-cy="kemrPatientDeleteDialogHeading">
        접수 취소 확인
      </ModalHeader>
      <ModalBody id="jyemrApp.kemrPatient.delete.question">진료 대기 중인 {props.kemrPatientId}번 환자의 접수를 취소하시겠습니까?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrPatient" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; 확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DiagnosisWaitingDeleteModal;
