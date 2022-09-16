// /**
//  * jkmoon
//  * 원무-진료 대기 컴포넌트
//  */
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
// import { reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import DiagnosisWaitingDeleteModal from './diagnosis-waiting-delete-modal';
import { TextFormat } from 'react-jhipster';
import { APP_TIME_FORMAT } from 'app/config/constants';

export const DiagnosisWaitingComponent = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.kemrMedicalTreatment.loading);
  const kemrMedicalTreatments = useAppSelector(state => state.kemrMedicalTreatment.entities);

  // 진료 대기 삭제 모달을 닫는 메소드
  const handleClose = () => {
    setReceptDeleteWaitingShowModal(false);
  };
  
  // 진료 대기 삭제 모달을 열고 파라미터를 설정하는 메소드
  const deleteRecept = (deleteMedicalTreatmentId, deletePatientId) => {
    setReceptDeleteWaitingShowModal(true);
    setKemrDeleteMedicalTreatmentInfo({ ...kemrDeleteMedicalTreatmentInfo, medicalTreatmentId: deleteMedicalTreatmentId, patientId: deletePatientId });
  };

  useEffect(() => {
    // dispatch(reset());
    dispatch(getKemrMedicalTreatments({}));
    dispatch(getKemrPatients({}));
    dispatch(getKemrDoctors({}));
  }, []);

  // 진료 대기 삭제 모달 상태 및 파라미터 상태
  const [showReceptDeleteWaitingModal, setReceptDeleteWaitingShowModal] = useState(false);
  const [kemrDeleteMedicalTreatmentInfo, setKemrDeleteMedicalTreatmentInfo] = useState({ medicalTreatmentId: '', patientId: '' });

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <div className="table-responsive">
            {kemrMedicalTreatments && kemrMedicalTreatments.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>kemrMedicalTreatment.id</th>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>성별</th>
                    <th>환자번호</th>
                    <th>접수시간</th>
                    <th>의사명</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {kemrMedicalTreatments
                    .filter(kemrMedicalTreatment => ( 
                      kemrMedicalTreatment.kemrDiagnosis === null && 
                      kemrMedicalTreatment.kemrTreatment === null
                    ))
                    .map((kemrMedicalTreatment, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>{kemrMedicalTreatment.id}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientName : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientBirthday : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientSex : ''}</td>
                        <td>{kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.id : ''}</td>
                        <td>
                          {kemrMedicalTreatment.kemrMedicalTreatmentDate ? (
                            <TextFormat value={kemrMedicalTreatment.kemrMedicalTreatmentDate} type="date" format={APP_TIME_FORMAT} />
                          ) : null}
                        </td>
                        <td>{kemrMedicalTreatment.kemrDoctor ? kemrMedicalTreatment.kemrDoctor.kemrDoctorName : ''}</td>
                        <td className="text-end">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              color="info"
                              size="sm"
                              data-cy="entityDetailsButton"
                              onClick={() => deleteRecept(kemrMedicalTreatment.id, kemrMedicalTreatment.kemrPatient.id)}
                            >
                              <span className="d-none d-md-inline">취소</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            ) : (
              !loading && <div className="alert alert-warning">No Kemr Prescriptions found</div>
            )}
          </div>
        </Col>
      </Row>
      {/* 진료 대기 삭제 모달 컴포넌트 호출 */}
      <DiagnosisWaitingDeleteModal 
        showModal={showReceptDeleteWaitingModal} 
        kemrPatientId={kemrDeleteMedicalTreatmentInfo.patientId} 
        kemrMedicalTreatmentId={kemrDeleteMedicalTreatmentInfo.medicalTreatmentId}
        handleClose={handleClose}
      />
    </div>
  );
};

export default DiagnosisWaitingComponent;