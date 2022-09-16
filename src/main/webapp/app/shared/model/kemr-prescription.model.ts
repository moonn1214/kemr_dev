import { IKemrMedicine } from 'app/shared/model/kemr-medicine.model';
import { IKemrMedicalTreatment } from 'app/shared/model/kemr-medical-treatment.model';

export interface IKemrPrescription {
  id?: number;
  kemrMedicine?: IKemrMedicine | null;
  kemrMedicalTreatment?: IKemrMedicalTreatment | null;
}

export const defaultValue: Readonly<IKemrPrescription> = {};
