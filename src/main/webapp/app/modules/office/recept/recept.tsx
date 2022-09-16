// /**
//  * jkmoon
//  * 원무-접수 컴포넌트
//  */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, DropdownItem } from 'reactstrap';
import { ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
// 아직 리듀서 라우터에 추가 안함
// import { getEntity, reset } from './recept.reducer';
import { getEntity, reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import ReceptModal from './recept-modal';
import ReceptCancelModal from './recept-cancel-modal';
import WaitingComponent from '../waiting/waiting';

export const ReceptPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrPatients = useAppSelector(state => state.kemrPatient.entities);
  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);

  // 작성 취소 메소드
  const handleReset = () => {
    setShowModal(true);
  };

  // 접수 메소드
  const handleRecept = () => {
    setReceptShowModal(true);
  };

  // 모달을 닫는 메소드
  const handleClose = () => {
    setShowModal(false);
    setReceptShowModal(false);
  };

  // 입력값 상태를 초기화하는 메소드
  const confirmCancel = () => {
    setKemrPatientId({ id: '' });
    setKemrMedicalTreatmentNurseMessageField('');
    setKemrDoctorEntity({ id: '', kemrDoctorName: '', kemrDoctorField: '' });
    handleClose();
  };
  
  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
  }, []);

  // 입력값 상태
  const [kemrPatientId, setKemrPatientId] = useState({ id: '' });
  const [kemrMedicalTreatmentNurseMessageField, setKemrMedicalTreatmentNurseMessageField] = useState('');
  const [kemrDoctorEntity, setKemrDoctorEntity] = useState({ id: '', kemrDoctorName: '', kemrDoctorField: '' });

  // 취소 및 접수 버튼 상태
  const [cancelButtonActivated, setCancelButtonActivated] = useState(true);
  const [receptButtonActivated, setReceptButtonActivated] = useState(true);

  // 모달 활성 상태
  const [showModal, setShowModal] = useState(false);
  const [showReceptModal, setReceptShowModal] = useState(false);

  // 입력값 상태에 따라 취소 및 접수 버튼 활성 상태 변경
  useEffect(() => {
    if (kemrPatientId.id && kemrDoctorEntity.id && kemrMedicalTreatmentNurseMessageField) {
      setReceptButtonActivated(false)
    } else {
      setReceptButtonActivated(true)
    }
    if (kemrPatientId.id || kemrDoctorEntity.id || kemrMedicalTreatmentNurseMessageField) {
      setCancelButtonActivated(false)
    } else {
      setCancelButtonActivated(true)
    }
  }, [kemrPatientId, kemrDoctorEntity, kemrMedicalTreatmentNurseMessageField]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="12">
          <div className="d-flex justify-content-end">
            <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">돌아가기</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            환자 접수
          </h2>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dt>
                <span id="id">환자 정보</span>
              </dt>
              <ValidatedField
                id="kemr-medical-treatment-kemrPatient"
                name="kemrPatient"
                data-cy="kemrPatient"
                label="Kemr Patient(환자 정보)"
                type="text"
                value={kemrPatientId.id}
                readOnly
              />
              <NavDropdown
                icon="th-list"
                name="kemrPatient 선택"
                id="entity-menu"
                data-cy="entity"
                style={{ maxHeight: '80vh', overflow: 'auto' }}
              >
                <option value="" key="0" />
                {kemrPatients.map(otherEntity => (
                  <DropdownItem key={otherEntity.id}>
                    <option
                      onClick={() =>
                        setKemrPatientId({ 
                          ...kemrPatientId, 
                          id: otherEntity.id
                        })
                      }
                    >
                      {otherEntity.id}
                    </option>
                  </DropdownItem>
                ))}
              </NavDropdown>
              &nbsp;
              <dt>
                <span id="id">진료 정보</span>
              </dt>
              <ValidatedField
                label="진료실 전달 메시지"
                id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                name="kemrMedicalTreatmentNurseMessage"
                data-cy="kemrMedicalTreatmentNurseMessage"
                type="text"
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                  maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                }}
                onChange={e => setKemrMedicalTreatmentNurseMessageField(e.target.value)}
                value={kemrMedicalTreatmentNurseMessageField}
              />
              <ValidatedField
                id="kemr-medical-treatment-kemrDoctor"
                name="kemrDoctor"
                data-cy="kemrDoctor"
                label="진료실(담당의)"
                type="text"
                value={kemrDoctorEntity.kemrDoctorName}
                validate={{
                  required: { value: true, message: '필수항목입니다.' },
                }}
                readOnly
              />
              <NavDropdown
                icon="th-list"
                name="진료실(담당의) 선택"
                id="entity-menu"
                data-cy="entity"
                style={{ maxHeight: '80vh', overflow: 'auto' }}
              >
                <option value="" key="0" />
                {kemrDoctors.map(otherEntity => (
                  <DropdownItem key={otherEntity.id}>
                    <option
                      onClick={() =>
                        setKemrDoctorEntity({ 
                          ...kemrDoctorEntity, 
                          id: otherEntity.id, 
                          kemrDoctorName: otherEntity.kemrDoctorName, 
                          kemrDoctorField: otherEntity.kemrDoctorField 
                        })
                      }
                    >
                      {otherEntity.kemrDoctorName} / 분야-{otherEntity.kemrDoctorField}
                    </option>
                  </DropdownItem>
                ))}
              </NavDropdown>
            </Col>
          </Row>
          &nbsp;
          <Row className="justify-content-center">
            <Col md="12">
              <Button id="cancel-write" data-cy="entityWriteCancelButton" color="danger" type="button" disabled={cancelButtonActivated} onClick={handleReset}>
                <FontAwesomeIcon icon="cancel" />
                &nbsp;
                <span className="d-none d-md-inline">취소</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="button" disabled={receptButtonActivated} onClick={handleRecept}>
                <FontAwesomeIcon icon="save" />
                &nbsp; 접수
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      &nbsp;
      {/* 대기 컴포넌트 호출 */}
      <WaitingComponent 
        waitingMode='diagnosisWaiting' 
        diagnosisWaitingButtonActivated={true} 
        treatmentWaitingButtonActivated={false}
        billWaitingButtonActivated={false} 
      />

      {/* 작성 취소 모달 컴포넌트 호출 */}
      <ReceptCancelModal
        showModal={showModal}
        kemrPatientId={kemrPatientId.id} 
        handleClose={handleClose}
        confirmCancel={confirmCancel}
      />
      {/* 접수 모달 컴포넌트 호출 */}
      <ReceptModal 
        showModal={showReceptModal} 
        kemrPatientId={kemrPatientId.id} 
        kemrNurseMessage={kemrMedicalTreatmentNurseMessageField}
        kemrDoctorId={kemrDoctorEntity.id}
        confirmCancel={confirmCancel}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ReceptPage;