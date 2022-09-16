import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './kemr-prescription.reducer';

export const KemrPrescriptionDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const kemrPrescriptionEntity = useAppSelector(state => state.kemrPrescription.entity);
  const updateSuccess = useAppSelector(state => state.kemrPrescription.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-prescription');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(kemrPrescriptionEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="kemrPrescriptionDeleteDialogHeading">
        삭제 확인
      </ModalHeader>
      <ModalBody id="jyemrApp.kemrPrescription.delete.question">
        Are you sure you want to delete Kemr Prescription {kemrPrescriptionEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrPrescription" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; 삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default KemrPrescriptionDeleteDialog;
