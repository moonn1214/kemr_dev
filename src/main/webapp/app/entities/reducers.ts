import kemrInstitution from 'app/entities/kemr-institution/kemr-institution.reducer';
import kemrPatient from 'app/entities/kemr-patient/kemr-patient.reducer';
import kemrMedicalTreatment from 'app/entities/kemr-medical-treatment/kemr-medical-treatment.reducer';
import kemrMedicalBill from 'app/entities/kemr-medical-bill/kemr-medical-bill.reducer';
import kemrPrescription from 'app/entities/kemr-prescription/kemr-prescription.reducer';
import kemrMedicine from 'app/entities/kemr-medicine/kemr-medicine.reducer';
import kemrDoctor from 'app/entities/kemr-doctor/kemr-doctor.reducer';
import kemrDiagnosis from 'app/entities/kemr-diagnosis/kemr-diagnosis.reducer';
import kemrTreatment from 'app/entities/kemr-treatment/kemr-treatment.reducer';
import kemrReservation from 'app/entities/kemr-reservation/kemr-reservation.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  kemrInstitution,
  kemrPatient,
  kemrMedicalTreatment,
  kemrMedicalBill,
  kemrPrescription,
  kemrMedicine,
  kemrDoctor,
  kemrDiagnosis,
  kemrTreatment,
  kemrReservation,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
