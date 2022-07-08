import http from '../index';
import { GetConsultationsQueryRequestDTO } from '@/api/telemed/types';
import {
  ConsultationDtoPagedData,
  ConsultationDto,
  ConsultationRecordDto,
  TelemedSpecialityDto,
} from '@/api/telemed/types/v1';

const TELEMED_SERVICE = '/api/telemed/v1';

export async function getConsultationsQuery(
  params?: GetConsultationsQueryRequestDTO
): Promise<ConsultationDtoPagedData> {
  const { data } = await http.get(`${TELEMED_SERVICE}/consultations/paged`, {
    params,
  });
  return data;
}

export async function getConsultation(id: string): Promise<ConsultationDto> {
  const { data } = await http.get(`${TELEMED_SERVICE}/consultations/${id}`);
  return data;
}

export async function recoverConsultation(
  consultationId: string
): Promise<void> {
  const { data } = await http.patch(
    `${TELEMED_SERVICE}/consultations/${consultationId}/recover`
  );
  return data;
}

export async function getConsultationRecord(
  consultationId: string
): Promise<ConsultationRecordDto[]> {
  const { data } = await http.get(`${TELEMED_SERVICE}/ConsultationRecord`, {
    params: {
      consultationId,
    },
  });
  return data;
}

export async function GetSpecialities(params: {
  withDisabled?: boolean;
}): Promise<TelemedSpecialityDto[]> {
  const { data } = await http.get(`${TELEMED_SERVICE}/Specialty`, { params });
  return data;
}
