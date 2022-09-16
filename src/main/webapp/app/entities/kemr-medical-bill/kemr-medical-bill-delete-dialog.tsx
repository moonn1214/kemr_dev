import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './kemr-medical-bill.reducer';

export const KemrMedicalBillDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const kemrMedicalBillEntity = useAppSelector(state => state.kemrMedicalBill.entity);
  const updateSuccess = useAppSelector(state => state.kemrMedicalBill.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-medical-bill');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(kemrMedicalBillEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="kemrMedicalBillDeleteDialogHeading">
        삭제 확인
      </ModalHeader>
      <ModalBody id="jyemrApp.kemrMedicalBill.delete.question">
        Are you sure you want to delete Kemr Medical Bill {kemrMedicalBillEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrMedicalBill" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; 삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default KemrMedicalBillDeleteDialog;
