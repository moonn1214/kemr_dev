import dayjs from 'dayjs';

export interface IKemrPatient {
  id?: number;
  kemrPatientName?: string;
  kemrPatientSex?: string;
  kemrPatientBirthday?: string;
  kemrPatientRegistrationDate?: string;
  kemrPatientSocialSecurityNo?: string;
  kemrPatientQualificationCheck?: string;
  kemrPatientAddress?: string | null;
  kemrPatientNurseMemo?: string | null;
  kemrPatientCellphone?: string | null;
  kemrPatientLandline?: string | null;
}

export const defaultValue: Readonly<IKemrPatient> = {};
