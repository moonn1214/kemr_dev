// /**
//  * jkmoon
//  * 원무-접수 모달 컴포넌트
//  */
import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients, createEntity as createKemrPatient } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
import { createEntity, reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';

// 신규 환자 등록과 기존 환자 등록(재방문)을 구분하여 처리하기 위해 받는 값
export interface IReceptModalProps {
  showModal: boolean;
  kemrPatientId?: string;
  kemrPatientName?: string;
  kemrPatientSocialSeurityNo?: string;
  kemrPatientQualificationCheck?: string;
  kemrPatientAddress?: string;
  kemrPatientCellphone?: string;
  kemrNurseMessage: string;
  kemrDoctorId: string;
  confirmCancel: () => void;
  handleClose: () => void;
}

const ReceptModal = (props: IReceptModalProps) => {
  const dispatch = useAppDispatch();

  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);

  const kemrPatientEntity = useAppSelector(state => state.kemrPatient.entity);
  const updateSuccess = useAppSelector(state => state.kemrPatient.updateSuccess);

  // 기존 환자 접수 메소드(파라미터 정의, 입력값 상태 초기화, 진료내역 생성 액션 호출)
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

  // 신규 환자 접수 메소드(파라미터 정의하여 환자 등록 액션 호출)
  const confirmPatientRecept = () => {
    const patientEntity = {
      kemrPatientName: props.kemrPatientName,
      kemrPatientSex: getPatientSex(props.kemrPatientSocialSeurityNo),
      kemrPatientBirthday: getPatientBirthday(props.kemrPatientSocialSeurityNo),
      kemrPatientRegistrationDate: new Date().toISOString().replace(/\..*/, '') + 'Z',
      kemrPatientSocialSeurityNo: props.kemrPatientSocialSeurityNo.substring(0, 6) + "-" + props.kemrPatientSocialSeurityNo.substring(6),
      kemrPatientQualificationCheck: props.kemrPatientQualificationCheck,
      kemrPatientAddress: props.kemrPatientAddress,
      kemrPatientCellphone: props.kemrPatientCellphone.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
    }
    
    dispatch(createKemrPatient(patientEntity));
  };

  // 환자 등록 성공하면 파라미터 정의하여 등록한 환자 정보로 접수
  useEffect(() => {
    if (updateSuccess) {
      const entity = {
        kemrPatient: kemrPatientEntity,
        kemrMedicalTreatmentNurseMessage: props.kemrNurseMessage,
        kemrDoctor: kemrDoctors.find(it => it.id.toString() === props.kemrDoctorId.toString()),
        kemrMedicalTreatmentDate: new Date().toISOString().replace(/\..*/, '') + 'Z',
      };
  
      props.confirmCancel();
      dispatch(createEntity(entity));
    }
  }, [updateSuccess]);

  // 주민등록번호를 성별로 변환
  const getPatientSex = (no) => {
    no = no.replace("-", "");
    if(no.substr(6, 1)==1 || no.substr(6, 1)==3) {
      return "M"
   }else{
      return "F"
   }
  };

  // 주민등록번호를 생년월일로 변환
  const getPatientBirthday = (no) => {
    no = no.replace("-", "");
    if (no.substr(6, 1) == 1 || no.substr(6, 1) == 2) {
      return "19" + no.substring(0, 2) + "-" + no.substring(2, 4) + "-" + no.substring(4, 6);
    }
    else {
      return "20" + no.substring(0, 2) + "-" + no.substring(2, 4) + "-" + no.substring(4, 6);
    }
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
      <ModalBody id="jyemrApp.kemrPatient.delete.question">환자를 접수하시겠습니까?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrPatient" data-cy="entityConfirmDeleteButton" color="primary" onClick={props.kemrPatientId ? confirmRecept : confirmPatientRecept}>
          <FontAwesomeIcon icon="save" />
          &nbsp; 확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReceptModal;
