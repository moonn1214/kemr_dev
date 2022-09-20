// /**
//  * jkmoon
//  * 원무-접수 모달 컴포넌트
//  */
import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
import { createEntity, reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';

export interface IReceptModalProps {
  showModal: boolean;
  kemrPatientId: string;
  kemrNurseMessage: string;
  kemrDoctorId: string;
  confirmCancel: () => void;
  handleClose: () => void;
}

const ReceptModal = (props: IReceptModalProps) => {
  const dispatch = useAppDispatch();

  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);

  // 접수 메소드(파라미터 정의, 입력값 상태 초기화, 진료내역 생성 액션 호출)
  const confirmRecept = () => {
    const entity = {
      kemrPatient: kemrPatients.find(it => it.id.toString() === props.kemrPatientId.toString()),
      kemrMedicalTreatmentNurseMessage: props.kemrNurseMessage,
      kemrDoctor: kemrDoctors.find(it => it.id.toString() === props.kemrDoctorId.toString()),
      kemrMedicalTreatmentDate: new Date().toISOString().replace(/\..*/, '') + 'Z',
    };

    props.confirmCancel();
    dispatch(createEntity(entity));
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
  }, []);

  return (
    <Modal isOpen={props.showModal} toggle={props.handleClose}>
      <ModalHeader toggle={props.handleClose} data-cy="kemrPatientDeleteDialogHeading">
        접수 확인
      </ModalHeader>
      <ModalBody id="jyemrApp.kemrPatient.delete.question">{props.kemrPatientId}번 환자를 접수하시겠습니까?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrPatient" data-cy="entityConfirmDeleteButton" color="primary" onClick={confirmRecept}>
          <FontAwesomeIcon icon="save" />
          &nbsp; 확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReceptModal;
