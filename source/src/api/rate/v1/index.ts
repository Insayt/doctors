import http from '@/api';
import {
  CommentDtoPagedData,
  DoctorCommentsDto,
  ApproveArgs,
  CommentDto,
  InterviewDtoPagedData,
} from './types';

const SERVICE = '/api/rate/v1';

export async function getDoctorsNotModeratedComments(): Promise<
  DoctorCommentsDto[]
> {
  const { data } = await http.get<DoctorCommentsDto[]>(
    `${SERVICE}/Comments/doctors/with-not-moderated-comments`
  );
  return data;
}

type GetAllNotModeratedCommentsParams = {
  doctorId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  count?: number;
};

export async function getAllNotModeratedComments(
  params?: GetAllNotModeratedCommentsParams
): Promise<CommentDtoPagedData> {
  const { data } = await http.get<CommentDtoPagedData>(
    `${SERVICE}/Comments/notmoderated`,
    { params }
  );
  return data;
}

export async function approveComment(
  params: {
    activityId: string;
    activityTypeName: string;
  },
  payload: ApproveArgs
): Promise<CommentDto> {
  const { data } = await http.patch<CommentDto>(
    `${SERVICE}/Comments/approve`,
    payload,
    { params }
  );

  return data;
}

export async function declineComment(params: {
  activityId: string;
  activityTypeName: string;
}): Promise<CommentDto> {
  const { data } = await http.patch<CommentDto>(
    `${SERVICE}/Comments/decline`,
    null,
    { params }
  );

  return data;
}

export type GetInterviewsParams = {
  status?: 'New' | 'Completed';
  doctorsIds?: string[];
  specialityNames?: string[];
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  count?: number;
};
export async function getInterviews(
  params: GetInterviewsParams
): Promise<InterviewDtoPagedData> {
  const { data } = await http.get(`${SERVICE}/Interviews`, { params });
  return data;
}
