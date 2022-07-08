import { getDoctors, getSpecialties } from '@/api/doctor';
import { IssueDto } from '@/api/supporttask/types/v2';
import { ReturnAsyncType } from '@/types';

export type Doctor = { tasks: IssueDto[] } & Awaited<
  ReturnType<typeof getDoctors>
>[number];
export type SpecialityCount = {
  [key: string]: { count: number; overdue: number; doctors: Doctor[] };
};
export type Specialties = ReturnAsyncType<typeof getSpecialties>;
