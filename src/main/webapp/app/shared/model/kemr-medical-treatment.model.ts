import dayjs from 'dayjs';
import { IKemrPatient } from 'app/shared/model/kemr-patient.model';
import { IKemrDoctor } from 'app/shared/model/kemr-doctor.model';
import { IKemrDiagnosis } from 'app/shared/model/kemr-diagnosis.model';
import { IKemrTreatment } from 'app/shared/model/kemr-treatment.model';

export interface IKemrMedicalTreatment {
  id?: number;
  kemrMedicalTreatmentDoctorNote?: string | null;
  kemrMedicalTreatmentNurseMessage?: string | null;
  kemrMedicalTreatmentDate?: string | null;
  kemrPatient?: IKemrPatient | null;
  kemrDoctor?: IKemrDoctor | null;
  kemrDiagnosis?: IKemrDiagnosis | null;
  kemrTreatment?: IKemrTreatment | null;
}

export const defaultValue: Readonly<IKemrMedicalTreatment> = {};
