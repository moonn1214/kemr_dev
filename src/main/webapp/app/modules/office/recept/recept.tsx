// /**
//  * jkmoon
//  * 원무-접수 컴포넌트
//  */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, DropdownItem, ButtonDropdown, DropdownMenu, DropdownToggle, Card } from 'reactstrap';
import { ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients, getEntity as getKemrPatientEntity } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
// 아직 리듀서 라우터에 추가 안함
// import { getEntity, reset } from './recept.reducer';
import ReceptModal from './recept-modal';
import WaitingComponent from '../waiting/waiting';
import ReceptCancelModal from './recept-cancel-modal';
import PatientInfoComponent from '../patient-info/patient-info';

export const ReceptPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);
  const kemrPatientEntity = useAppSelector(state => state.kemrPatient.entity);

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

  // 입력값 상태를 초기화하는 메소드(기존 환자 접수 취소 시 신규 환자 접수 url로 이동, 신규 환자 접수 취소 시 입력값 초기화)
  const confirmCancel = () => {
    if (id !== undefined) {
      navigate('/office/recept');
      handleClose();
    } else {
      setKemrPatient({kemrPatientName: '', kemrPatientSocialSeurityNo: '', kemrPatientQualificationCheck: '',
                      kemrPatientAddress: '', kemrPatientCellphone: ''});
      setKemrMedicalTreatmentNurseMessageField('');
      setKemrDoctorEntity({ id: '', kemrDoctorName: '', kemrDoctorField: '' });
      handleClose();
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getKemrPatientEntity(id));
    }
    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
  }, []);

  // 입력값 상태
  const [kemrMedicalTreatmentNurseMessageField, setKemrMedicalTreatmentNurseMessageField] = useState('');
  const [kemrDoctorEntity, setKemrDoctorEntity] = useState({ id: '', kemrDoctorName: '', kemrDoctorField: '' });

  // 취소 및 접수 버튼 상태
  const [cancelButtonActivated, setCancelButtonActivated] = useState(true);
  const [receptButtonActivated, setReceptButtonActivated] = useState(true);

  const [showDoctorDropDown, setShowDoctorDropDown] = useState(false);

  // 모달 활성 상태
  const [showModal, setShowModal] = useState(false);
  const [showReceptModal, setReceptShowModal] = useState(false);

  // 신규 환자 접수 시 입력하는 값의 상태 (공단 조회 가능하면 속성 초기값 수정 '1' -> '')
  const [kemrPatient, setKemrPatient] = useState({kemrPatientName: '', kemrPatientSocialSeurityNo: '', kemrPatientQualificationCheck: '1',
                                                  kemrPatientAddress: '', kemrPatientCellphone: ''});

  // 입력값 상태에 따라 취소 및 접수 버튼 활성 상태 변경
  useEffect(() => {
    if (id !== undefined) {
      if (kemrPatientEntity.id && kemrDoctorEntity.id && kemrMedicalTreatmentNurseMessageField) {
        setReceptButtonActivated(false);
      } else {
        setReceptButtonActivated(true);
      }

      if (kemrPatientEntity.id || kemrDoctorEntity.id || kemrMedicalTreatmentNurseMessageField) {
        setCancelButtonActivated(false);
      } else {
        setCancelButtonActivated(true);
      }
    } 
    
    else {
      if (Object.values(kemrPatient).every(attr => (attr !== null && attr !== '')) && 
      kemrDoctorEntity.id && kemrMedicalTreatmentNurseMessageField) {
        setReceptButtonActivated(false);
      } else {
        setReceptButtonActivated(true);
      }

      if (Object.values(kemrPatient).filter(attr => (attr !== null && attr !== '')).length !== 0 ||
      kemrDoctorEntity.id || kemrMedicalTreatmentNurseMessageField) {
        setCancelButtonActivated(false);
      } else {
        setCancelButtonActivated(true);
      }
    }
  }, [id, kemrPatient, kemrPatientEntity, kemrDoctorEntity, kemrMedicalTreatmentNurseMessageField]);

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
            {isNew ? "신규 환자 정보 입력" : "환자 정보"}
          </h2>
        </Col>
      </Row>
      {/* 기존 환자 접수와 신규 환자 접수 분기 */}
      {id !== undefined ? (
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Row>
                <Col md="6">
                  <dt>
                    <span id="id">성함</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    defaultValue={kemrPatientEntity.kemrPatientName}
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <dt>
                    <span id="id">주민등록번호</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    defaultValue={kemrPatientEntity.kemrPatientSocialSeurityNo}
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    readOnly
                  />
                </Col>
              </Row>
            </Card>
            <Card>
              <Row>
                <Col md="6">
                  <dt>
                    <span id="id">전화번호</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    defaultValue={kemrPatientEntity.kemrPatientCellphone}
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <dt>
                    <span id="id">공단자격조회</span>
                  </dt>
                  <Button
                    id="cancel-write"
                    data-cy="entityWriteCancelButton"
                    color="danger"
                    type="button"
                  >
                    <span className="d-none d-md-inline">test</span>
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row>
                <Col md="12">
                  <dt>
                    <span id="id">주소</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    defaultValue={kemrPatientEntity.kemrPatientAddress}
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    readOnly
                  />
                </Col>
              </Row>
            </Card>
            <ReceptModal
              showModal={showReceptModal}
              kemrPatientId={kemrPatientEntity.id}
              kemrNurseMessage={kemrMedicalTreatmentNurseMessageField}
              kemrDoctorId={kemrDoctorEntity.id}
              confirmCancel={confirmCancel}
              handleClose={handleClose}
            />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Row>
                <Col md="6">
                  <dt>
                    <span id="id">성함</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    onChange={e => setKemrPatient({...kemrPatient, kemrPatientName: e.target.value})}
                    value={kemrPatient.kemrPatientName}
                  />
                </Col>
                <Col md="6">
                  <dt>
                    <span id="id">주민등록번호</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    placeholder='("-" 없이 입력)'
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    onChange={e => setKemrPatient({...kemrPatient, kemrPatientSocialSeurityNo: e.target.value.replace(/[^0-9]/g, '')})}
                    value={kemrPatient.kemrPatientSocialSeurityNo}
                  />
                </Col>
              </Row>
            </Card>
            <Card>
              <Row>
                <Col md="6">
                  <dt>
                    <span id="id">전화번호</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    placeholder='("-" 없이 입력)'
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    onChange={e => setKemrPatient({...kemrPatient, kemrPatientCellphone: e.target.value.replace(/[^0-9]/g, '')})}
                    value={kemrPatient.kemrPatientCellphone}
                  />
                </Col>
                <Col md="6">
                  <dt>
                    <span id="id">공단자격조회</span>
                  </dt>
                  <Button
                    id="cancel-write"
                    data-cy="entityWriteCancelButton"
                    color="danger"
                    type="button"
                  >
                    <span className="d-none d-md-inline">test</span>
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row>
                <Col md="12">
                  <dt>
                    <span id="id">주소</span>
                  </dt>
                  <ValidatedField
                    id="kemr-medical-treatment-kemrMedicalTreatmentNurseMessage"
                    name="kemrMedicalTreatmentNurseMessage"
                    data-cy="kemrMedicalTreatmentNurseMessage"
                    type="text"
                    validate={{
                      required: { value: true, message: '필수항목입니다.' },
                      maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                    }}
                    onChange={e => setKemrPatient({...kemrPatient, kemrPatientAddress: e.target.value})}
                    value={kemrPatient.kemrPatientAddress}
                  />
                </Col>
              </Row>
            </Card>
            <ReceptModal
              showModal={showReceptModal}
              kemrPatientName={kemrPatient.kemrPatientName}
              kemrPatientSocialSeurityNo={kemrPatient.kemrPatientSocialSeurityNo}
              kemrPatientQualificationCheck={kemrPatient.kemrPatientQualificationCheck}
              kemrPatientAddress={kemrPatient.kemrPatientAddress}
              kemrPatientCellphone={kemrPatient.kemrPatientCellphone}
              kemrNurseMessage={kemrMedicalTreatmentNurseMessageField}
              kemrDoctorId={kemrDoctorEntity.id}
              confirmCancel={confirmCancel}
              handleClose={handleClose}
            />
          </Col>
        </Row>
      )}
      &nbsp;
      <hr />
      &nbsp;
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
            진료 정보
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <dt>
              <span id="id">진료실</span>
            </dt>
            <Row>
              <Col md="12">
                <ButtonDropdown isOpen={showDoctorDropDown} toggle={() => setShowDoctorDropDown(!showDoctorDropDown)}>
                  <DropdownToggle caret>
                    {kemrDoctorEntity.kemrDoctorName ? kemrDoctorEntity.kemrDoctorName : "진료실 선택"}
                  </DropdownToggle>
                  <DropdownMenu>
                    {kemrDoctors.map(otherEntity => (
                      <DropdownItem key={otherEntity.id} onClick={() =>
                        setKemrDoctorEntity({
                          ...kemrDoctorEntity,
                          id: otherEntity.id,
                          kemrDoctorName: otherEntity.kemrDoctorName,
                          kemrDoctorField: otherEntity.kemrDoctorField,
                        })
                      }>
                        {otherEntity.kemrDoctorName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col md="12">
                <dt>
                  <span id="id">진료실 전달 메시지</span>
                </dt>
                <ValidatedField
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
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      &nbsp;
      <hr />
      &nbsp;
      {/* 환자 정보 컴포넌트 호출 */}
      <PatientInfoComponent kemrPatientId={id} />
      &nbsp;
      <hr />
      &nbsp;
      <Row className="justify-content-center">
        <Col md="2">
          <Button
            id="cancel-write"
            data-cy="entityWriteCancelButton"
            color="danger"
            type="button"
            disabled={cancelButtonActivated}
            onClick={handleReset}
          >
            <FontAwesomeIcon icon="cancel" />
            &nbsp;
            <span className="d-none d-md-inline">취소</span>
          </Button>
          &nbsp;
          <Button
            color="primary"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            type="button"
            disabled={receptButtonActivated}
            onClick={handleRecept}
          >
            <FontAwesomeIcon icon="save" />
            &nbsp; 접수
          </Button>
        </Col>
      </Row>
      &nbsp;
      <hr />
      {/* 대기 컴포넌트 호출 */}
      <WaitingComponent 
        waitingMode='diagnosisWaiting' 
        diagnosisWaitingButtonActivated={true} 
        treatmentWaitingButtonActivated={false}
        billWaitingButtonActivated={false} 
      />
      {/* 작성 취소 모달 컴포넌트 호출 */}
      <ReceptCancelModal showModal={showModal} handleClose={handleClose} confirmCancel={confirmCancel} />
    </div>
  );
};

export default ReceptPage;
