import dayjs from 'dayjs';

export interface IKemrInstitution {
  id?: number;
  kemrInstitutionId?: string;
  kemrInstitutionPassword?: string;
  kemrInstitutionName?: string;
  kemrInstitutionDepartment?: string | null;
  kemrInstitutionPosition?: string | null;
  kemrInstitutionManager?: string;
  kemrInstitutionCellphone?: string;
  kemrInstitutionEmail?: string;
  kemrInstitutionWebsite?: string | null;
  kemrInstitutionAgree?: string;
  kemrInstitutionStatus?: string;
  kemrInstitutionModification?: string | null;
  kemrInstitutionWithdrawal?: string | null;
  kemrInstitutionLandline?: string | null;
  kemrInstitutionFail?: number | null;
  kemrInstitutionFailtime?: string | null;
  kemrInstitutionNumber?: string | null;
}

export const defaultValue: Readonly<IKemrInstitution> = {};
