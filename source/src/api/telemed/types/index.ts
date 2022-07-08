import { UUID } from '@/types';

export type GetConsultationsQueryRequestDTO = {
  ClientId?: UUID;
  DoctorId?: UUID;
  DateStart?: string;
  DateEnd?: string;
  Status?: string;
  IsConsultationRecords?: boolean;
  DoctorSpecialities?: Array<string>;
  Page?: number;
  Count?: number;
};
