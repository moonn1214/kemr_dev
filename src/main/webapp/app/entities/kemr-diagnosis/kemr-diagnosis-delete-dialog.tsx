import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './kemr-diagnosis.reducer';

export const KemrDiagnosisDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const kemrDiagnosisEntity = useAppSelector(state => state.kemrDiagnosis.entity);
  const updateSuccess = useAppSelector(state => state.kemrDiagnosis.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-diagnosis');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(kemrDiagnosisEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="kemrDiagnosisDeleteDialogHeading">
        삭제 확인
      </ModalHeader>
      <ModalBody id="jyemrApp.kemrDiagnosis.delete.question">
        Are you sure you want to delete Kemr Diagnosis {kemrDiagnosisEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrDiagnosis" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; 삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default KemrDiagnosisDeleteDialog;
