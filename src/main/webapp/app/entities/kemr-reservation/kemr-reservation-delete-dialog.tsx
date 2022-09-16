import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './kemr-reservation.reducer';

export const KemrReservationDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const kemrReservationEntity = useAppSelector(state => state.kemrReservation.entity);
  const updateSuccess = useAppSelector(state => state.kemrReservation.updateSuccess);

  const handleClose = () => {
    navigate('/kemr-reservation');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(kemrReservationEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="kemrReservationDeleteDialogHeading">
        삭제 확인
      </ModalHeader>
      <ModalBody id="jyemrApp.kemrReservation.delete.question">
        Are you sure you want to delete Kemr Reservation {kemrReservationEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; 취소
        </Button>
        <Button id="jhi-confirm-delete-kemrReservation" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; 삭제
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default KemrReservationDeleteDialog;
