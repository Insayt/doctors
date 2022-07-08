import { UUID } from '@/types';
import { ReturnAsyncType } from '@/types';
import { getSpecialties } from '@/api/doctor';

export type DoctorSpecialty = ReturnAsyncType<typeof getSpecialties>[number];

type DoctorSourceQuery = {
  hospitalId: string;
  lpuId: string;
  policyId: string;
};

export enum PlaceCodeEnum {
  TELEMED = 'TELEMED',
  INFOCLINICA = 'INFOCLINICA',
  HOMEVISIT = 'HOMEVISIT',
  POLYCLINIC = 'POLYCLINIC',
}

export type GetDoctorsRequestDTO = {
  Id?: UUID[];
  DoctorSpecialityId?: UUID;
  DoctorSpecialitiesIds?: UUID[];
  PlaceCode?: PlaceCodeEnum;
  DoctorSourceQuery?: DoctorSourceQuery;
  ActivityTypeName?: string;
  OrganizationInn?: string;
};

export type GetSpecialitiesRequestDTO = {
  specialityId?: string[];
  code?: string;
  reninsCode?: string;
  doctorRyadomCode?: string;
  specialityName?: string;
  activityType?: string;
  withDisabled?: boolean;
};
