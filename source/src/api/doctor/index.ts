import http from '../index';
import { GetDoctorsRequestDTO, GetSpecialitiesRequestDTO } from './types';
import {
  ActivityTypeDto,
  ChangeSpecialtyFlagsArgs,
  DoctorSpecialityDto,
  OrganizationDto,
} from './types/v1';
import {
  DoctorDto,
  ExperienceDto,
  PatchDoctorEducationArgs,
  PatchOrganizationArgs,
} from './types/v2';

// Кажись баг на бекенде с этим типом данных - костыльнем
type DoctorExperiencesDto = {
  totalYear: number;
  experiences: ExperienceDto[];
};

const DOCTOR_SERVICE = '/api/doctor/v1';
const DOCTOR_SERVICE_V2 = '/api/doctor/v2';

export async function getDoctors(
  params?: GetDoctorsRequestDTO
): Promise<DoctorDto[]> {
  const res = await http.get(`${DOCTOR_SERVICE_V2}/Doctors`, {
    params,
  });
  return res.data;
}

export async function getSpecialties(
  params?: GetSpecialitiesRequestDTO
): Promise<DoctorSpecialityDto[]> {
  const { data } = await http.get(`${DOCTOR_SERVICE}/DoctorSpeciality`, {
    params,
  });
  return data;
}

export async function getOrganizations(): Promise<OrganizationDto[]> {
  const { data } = await http.get(`${DOCTOR_SERVICE}/organizations`);
  return data;
}

export async function getActivityTypes(): Promise<ActivityTypeDto[]> {
  const res = await http.get(`${DOCTOR_SERVICE}/ActivityType`);
  return res.data;
}

export async function getExp(doctorId: string): Promise<DoctorExperiencesDto> {
  const res = await http.get(`${DOCTOR_SERVICE_V2}/experience`, {
    params: {
      doctorId,
    },
  });
  return res.data;
}

export async function addSpecialityActivity(
  activityType = '',
  specialtyId = ''
): Promise<DoctorSpecialityDto> {
  const { data } = await http.post(
    `${DOCTOR_SERVICE}/DoctorSpeciality/${activityType}/${specialtyId}`
  );
  return data;
}

export async function updateFlags(
  activityType = '',
  specialtyId = '',
  data: ChangeSpecialtyFlagsArgs
): Promise<DoctorSpecialityDto> {
  const res = await http.patch(
    `${DOCTOR_SERVICE}/DoctorSpeciality/${activityType}/${specialtyId}`,
    data
  );
  return res.data;
}

export async function removeActivity(
  activityType = '',
  specialtyId = ''
): Promise<void> {
  await http.delete(
    `${DOCTOR_SERVICE}/DoctorSpeciality/${activityType}/${specialtyId}`
  );
}

export async function updateEdu(
  doctorId: string,
  data: PatchDoctorEducationArgs
): Promise<DoctorDto> {
  const res = await http.patch(
    `${DOCTOR_SERVICE_V2}/doctors/${doctorId}/education`,
    data
  );
  return res.data;
}

export async function attachOrganization(
  doctorId: string,
  data: PatchOrganizationArgs
): Promise<DoctorDto> {
  const res = await http.patch(
    `${DOCTOR_SERVICE_V2}/doctors/${doctorId}/organization`,
    data
  );
  return res.data;
}
