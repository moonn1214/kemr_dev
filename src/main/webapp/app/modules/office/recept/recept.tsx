/**
 * jkmoon
 * 원무-접수 컴포넌트
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, DropdownItem, ButtonDropdown, DropdownMenu, DropdownToggle, Card } from 'reactstrap';
import { ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity as getKemrPatientEntity } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
// 아직 리듀서 라우터에 추가 안함
// import { getEntity, reset } from './recept.reducer';
import ReceptModal from './recept-modal';
import ReceptCancelModal from './recept-cancel-modal';
import PatientInfoComponent from '../patient-info/patient-info';
// 날짜 유효성 체크를 위해 추가한 라이브러리
import moment from 'moment';

export const ReceptPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const kemrDoctors = useAppSelector(state => state.kemrDoctor.entities);
  const kemrPatientEntity = useAppSelector(state => state.kemrPatient.entity);

  // 모달을 닫는 메소드
  const handleClose = () => {
    setShowCancelModal(false);
    setShowReceptModal(false);
  };

  // 입력값 상태를 초기화하는 메소드(기존 환자 접수 취소 시 신규 환자 접수 url로 이동, 신규 환자 접수 취소 시 입력값 초기화)
  const confirmCancel = () => {
    if (id !== undefined) {
      navigate('/office/recept');
      handleClose();
    } else {
      setKemrPatient({...kemrPatient, 
                      kemrPatientName: '', kemrPatientSocialSeurityNo: '', 
                      kemrPatientQualificationCheck: '', kemrPatientAddress: '', 
                      kemrPatientCellphone: ''});
      setKemrMedicalTreatmentNurseMessageField('');
      if (kemrDoctors.length !== 1) {
        setKemrDoctorEntity({ id: '', kemrDoctorName: '', kemrDoctorField: '' });
      }
      handleClose();
    }
  };

  // (수정)공단 자격 조회 메소드
  const checkQualification = () => {
    // 공단 자격 조회 기능 추가해야 함
    // const result = testChecking();
    // setKemrPatient({...kemrPatient, kemrPatientQualificationCheck: result});
    setKemrPatient({...kemrPatient, kemrPatientQualificationCheck: "1"});
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getKemrPatientEntity(id));
    }
    dispatch(getKemrDoctors({}));
  }, []);

  // 입력값 상태
  const [kemrMedicalTreatmentNurseMessageField, setKemrMedicalTreatmentNurseMessageField] = useState('');
  const [kemrDoctorEntity, setKemrDoctorEntity] = useState({ id: '', kemrDoctorName: '', kemrDoctorField: '' });

  // 공단 자격 조회 결과 상태
  const [resultQualification, setResultQualification] = useState('');

  // 취소 및 접수 버튼 상태
  const [cancelButtonActivated, setCancelButtonActivated] = useState(true);
  const [receptButtonActivated, setReceptButtonActivated] = useState(true);

  // 진료실 선택 드롭다운 상태
  const [showDoctorDropDown, setShowDoctorDropDown] = useState(false);

  // 모달 활성 상태
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReceptModal, setShowReceptModal] = useState(false);

  // 신규 환자 접수 시 입력하는 값의 상태 (공단 조회 가능하면 속성 초기값 수정)
  const [kemrPatient, setKemrPatient] = useState({ kemrPatientName: '', kemrPatientSocialSeurityNo: '', 
                                                   kemrPatientQualificationCheck: '', kemrPatientAddress: '', 
                                                   kemrPatientCellphone: '' });

  // 기존 환자는 기존의 정보로 설정
  useEffect(() => {
    setKemrPatient({...kemrPatient,
                    kemrPatientName: kemrPatientEntity.kemrPatientName, 
                    kemrPatientSocialSeurityNo: kemrPatientEntity.kemrPatientSocialSeurityNo,
                    kemrPatientQualificationCheck: '',
                    kemrPatientAddress: kemrPatientEntity.kemrPatientAddress, 
                    kemrPatientCellphone: kemrPatientEntity.kemrPatientCellphone
                  });
  }, [kemrPatientEntity]);

  // 의사가 1명이면 상태값 초기화
  useEffect(() => {
    if (kemrDoctors.length === 1) {
      kemrDoctors.map(kemrDoctor => 
        setKemrDoctorEntity({
          ...kemrDoctorEntity,
          id: kemrDoctor.id,
          kemrDoctorName: kemrDoctor.kemrDoctorName,
          kemrDoctorField: kemrDoctor.kemrDoctorField,
        })
      );
    }
  }, [kemrDoctors]);
  
  // 입력값 상태에 따라 취소 및 접수 버튼 활성 상태 변경
  useEffect(() => {
    const onlySocialSecurityNo = kemrPatient.kemrPatientSocialSeurityNo?.replace(/[^0-9]/g, "");

    if (Object.values(kemrPatient).every(attr => (attr !== undefined && attr !== '')) && 
        onlySocialSecurityNo.length === 13 && moment(onlySocialSecurityNo.substring(0, 6), 'YYMMDD', true).isValid() &&
        kemrDoctorEntity.id && kemrMedicalTreatmentNurseMessageField) {
      setReceptButtonActivated(false);
    } else {
      setReceptButtonActivated(true);
    }

    if (Object.values(kemrPatient).filter(attr => (attr !== undefined && attr !== '')).length !== 0 || 
        kemrDoctorEntity.id || kemrMedicalTreatmentNurseMessageField) {
      setCancelButtonActivated(false);
    } else {
      setCancelButtonActivated(true);
    }
  }, [id, kemrPatient, kemrDoctorEntity, kemrMedicalTreatmentNurseMessageField]);

  // (수정)공단 자격 조회 시 결과로 반환
  useEffect(() => {
    kemrPatient.kemrPatientQualificationCheck === "1" && setResultQualification("지역 가입자");
    kemrPatient.kemrPatientQualificationCheck === "2" && setResultQualification("지역 세대원");
    kemrPatient.kemrPatientQualificationCheck === "3" && setResultQualification("임의 계속 직장 가입자");
    kemrPatient.kemrPatientQualificationCheck === "4" && setResultQualification("직장 가입자");
    kemrPatient.kemrPatientQualificationCheck === "5" && setResultQualification("직장 피부양자");
    kemrPatient.kemrPatientQualificationCheck === "6" && setResultQualification("의료급여 1종");
    kemrPatient.kemrPatientQualificationCheck === "7" && setResultQualification("의료급여 2종");
    kemrPatient.kemrPatientQualificationCheck ===  "" && setResultQualification("");
  }, [kemrPatient.kemrPatientQualificationCheck]);

  return (
    <div>
      <div className="container-fluid office-view-container" id="office-view-container">
        <Card className="jh-card">
          &nbsp;
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="jyemrApp.kemrMedicalTreatment.home.createOrEditLabel" data-cy="KemrMedicalTreatmentCreateUpdateHeading">
                {isNew ? "신규 환자 정보 입력" : "환자 정보"}
              </h2>
            </Col>
          </Row>
          &nbsp;
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
                      // defaultValue={kemrPatientEntity.kemrPatientName}
                      validate={{
                        required: { value: true, message: '필수항목입니다.' },
                        maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                      }}
                      onChange={e => setKemrPatient({...kemrPatient, kemrPatientName: e.target.value})}
                      value={kemrPatient.kemrPatientName || ''}
                      // readOnly
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
                      placeholder='"-" 없이 입력'
                      validate={{
                        required: { value: true, message: '필수항목입니다.' },
                        maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                      }}
                      onChange={e => setKemrPatient({...kemrPatient, kemrPatientSocialSeurityNo: e.target.value.replace(/[^0-9]/g, '')})}
                      value={kemrPatient.kemrPatientSocialSeurityNo || ''}
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
                      placeholder='"-" 없이 입력'
                      validate={{
                        required: { value: true, message: '필수항목입니다.' },
                        maxLength: { value: 50, message: '최대 50자 이하까지만 입력 가능합니다.' },
                      }}
                      onChange={e => setKemrPatient({...kemrPatient, kemrPatientCellphone: e.target.value.replace(/[^0-9]/g, '')})}
                      value={kemrPatient.kemrPatientCellphone || ''}
                    />
                  </Col>
                  <Col md="6">
                    {/* (수정) */}
                    <dt>
                      <span id="id">TEST 공단자격조회</span>(클릭 : 1)
                    </dt>
                    <Button
                      id="cancel-write"
                      data-cy="entityWriteCancelButton"
                      color="primary"
                      type="button"
                      onClick={checkQualification}
                    >
                      <span className="d-none d-md-inline">조회</span>
                    </Button>
                    &nbsp;
                    {resultQualification}
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
                      value={kemrPatient.kemrPatientAddress || ''}
                    />
                  </Col>
                </Row>
              </Card>
              {/* 접수 모달 컴포넌트 호출 */}
              <ReceptModal
                showModal={showReceptModal}
                kemrPatientId={id !== undefined ? kemrPatientEntity.id : false}
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
          &nbsp;
          <Row className="justify-content-center">
            <Col md="8">
              <Card>
                <dt>
                  <span id="id">진료실</span>
                </dt>
                <Row>
                  <Col md="12">
                    {/* 엔티티 개수에 따라 버튼 설정 (0개, 1개, 2개 이상) */}
                    {kemrDoctors.length > 1 ? (
                      <ButtonDropdown isOpen={showDoctorDropDown} toggle={() => setShowDoctorDropDown(!showDoctorDropDown)}>
                        <DropdownToggle caret outline color="primary">
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
                    ) : (
                      kemrDoctors.length === 1 ? (
                        kemrDoctors.map(otherEntity => (
                          <Button
                            key={otherEntity.id}
                            id="cancel-write"
                            data-cy="entityWriteCancelButton"
                            outline color="primary"
                            type="button"
                            disabled={true}
                          >
                            <span className="d-none d-md-inline">{otherEntity.kemrDoctorName}</span>
                          </Button>
                        ))
                      ) : (
                        <Button
                          id="cancel-write"
                          data-cy="entityWriteCancelButton"
                          outline color="primary"
                          tag={Link}
                          to={`/kemr-doctor/new`}
                        >
                          <span className="d-none d-md-inline">진료실 생성</span>
                        </Button>
                      )
                    )
                    }
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
          <Row className="justify-content-center">
            <Col md="5" />
            <Col md="1">
              <Button
                outline color="primary"
                id="cancel-write"
                data-cy="entityWriteCancelButton"
                type="button"
                disabled={cancelButtonActivated}
                onClick={() => setShowCancelModal(true)}
              >
                <span className="d-none d-md-inline">취소</span>
              </Button>
            </Col>
            <Col md="6">
              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="button"
                disabled={receptButtonActivated}
                onClick={() => setShowReceptModal(true)}
              >
                <span className="d-none d-md-inline">접수</span>
              </Button>
            </Col>
          </Row>
          &nbsp;
          {/* 작성 취소 모달 컴포넌트 호출 */}
          <ReceptCancelModal showModal={showCancelModal} handleClose={handleClose} confirmCancel={confirmCancel} />
        </Card>
      </div>
      <div className="container-fluid office-right-side-container" id="office-right-side-container">
        <Card className="jh-card">
          {/* 환자 정보 컴포넌트 호출 */}
          <PatientInfoComponent kemrPatientId={id} />
        </Card>
      </div>
      &nbsp;
    </div>
  );
};

export default ReceptPage;
