import { getInterviews } from '@/api/rate/v1';
import { ReturnAsyncType } from '@/types';

export type SelectOption = {
  value: string;
  label: string;
};

export type DoctorSelectOption = {
  specialityIds: string[];
} & SelectOption;

export type Interviews = NonNullable<
  ReturnAsyncType<typeof getInterviews>['data']
>;
export type Interview = Interviews[number];
