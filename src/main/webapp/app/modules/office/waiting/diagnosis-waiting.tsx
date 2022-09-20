// /**
//  * jkmoon
//  * 원무-진료 대기 컴포넌트
//  */
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getKemrPatients } from 'app/entities/kemr-patient/kemr-patient.reducer';
import { getEntities as getKemrDoctors } from 'app/entities/kemr-doctor/kemr-doctor.reducer';
// import { reset } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import { getEntities as getKemrMedicalTreatments } from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import DiagnosisWaitingDeleteModal from './diagnosis-waiting-delete-modal';
import { TextFormat } from 'react-jhipster';
import { APP_KR_DATETIME_FORMAT } from 'app/config/constants';

export interface IDiagnosisWaitingComponentProps {
  getOnlyAge: (birthday: any) => string;
}

export const DiagnosisWaitingComponent = (props: IDiagnosisWaitingComponentProps) => {
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
    setKemrDeleteMedicalTreatmentInfo({
      ...kemrDeleteMedicalTreatmentInfo,
      medicalTreatmentId: deleteMedicalTreatmentId,
      patientId: deletePatientId,
    });
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
        <Col md="12">
          {kemrMedicalTreatments && kemrMedicalTreatments.length > 0 ? (
            kemrMedicalTreatments
              .filter(
                kemrMedicalTreatment => kemrMedicalTreatment.kemrDiagnosis === null && kemrMedicalTreatment.kemrTreatment === null
              )
              .map((kemrMedicalTreatment, i) => (
                <Card body key={`entity-${i}`}>
                  <CardTitle>
                    진료내역 {kemrMedicalTreatment.id}번
                    &nbsp;
                    <Button 
                      color="secondary" 
                      size="sm"
                      onClick={() => deleteRecept(kemrMedicalTreatment.id, kemrMedicalTreatment.kemrPatient.id)}
                    >
                      <span className="d-none d-md-inline">취소</span>
                    </Button>
                  </CardTitle>
                  <CardText>
                    {kemrMedicalTreatment.kemrPatient ? kemrMedicalTreatment.kemrPatient.kemrPatientName : ''}
                    &nbsp;
                    ({kemrMedicalTreatment.kemrPatient ? props.getOnlyAge(kemrMedicalTreatment.kemrPatient.kemrPatientBirthday) : ''}세)
                    <br />
                    {kemrMedicalTreatment.kemrDoctor ? kemrMedicalTreatment.kemrDoctor.kemrDoctorName : ''}
                    <br />
                    {kemrMedicalTreatment.kemrMedicalTreatmentDate ? (
                      <TextFormat value={kemrMedicalTreatment.kemrMedicalTreatmentDate} type="date" format={APP_KR_DATETIME_FORMAT} />
                    ) : null}
                  </CardText>
                </Card>
              ))
          ) : (
            !loading && <div className="alert alert-warning">No Kemr Prescriptions found</div>
          )}
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
