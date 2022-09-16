import dayjs from 'dayjs';
import { IKemrPatient } from 'app/shared/model/kemr-patient.model';
import { IKemrDoctor } from 'app/shared/model/kemr-doctor.model';

export interface IKemrReservation {
  id?: number;
  kemrReservationStatus?: string;
  kemrReservationNewPatientName?: string | null;
  kemrReservationNewPatientPhone?: string | null;
  kemrReservationDate?: string;
  kemrReservationTime?: number;
  kemrPatient?: IKemrPatient | null;
  kemrDoctor?: IKemrDoctor | null;
}

export const defaultValue: Readonly<IKemrReservation> = {};
