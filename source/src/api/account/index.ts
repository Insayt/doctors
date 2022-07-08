import http from '../index';
import { UserProfileDto } from '@/api/account/types/v1';
import { GetAllUsersRequestDTO } from '@/api/account/types';
import { UserProfileDtoPagedData } from '@/api/account/types/v2';

const ACCOUNT_SERVICE_V1 = '/api/account/v1';
const ACCOUNT_SERVICE_V2 = '/api/account/v2';

export async function getPersonalData(): Promise<UserProfileDto> {
  const res = await http.get(`${ACCOUNT_SERVICE_V1}/me`);
  return res.data;
}

export async function getUserProfile(userId: string): Promise<UserProfileDto> {
  const res = await http.get(`${ACCOUNT_SERVICE_V1}/Account/${userId}`);
  return res.data;
}

export async function getAllUsers(
  params: GetAllUsersRequestDTO
): Promise<UserProfileDtoPagedData> {
  const res = await http.get(`${ACCOUNT_SERVICE_V2}/Account`, {
    params,
  });
  return res.data;
}

export async function deleteAvatar(userId: string): Promise<null> {
  const res = await http.delete(
    `${ACCOUNT_SERVICE_V1}/Account/${userId}/avatar`
  );
  return res.data;
}

export async function saveAvatarId(
  avatarId: string,
  userId: string
): Promise<UserProfileDto> {
  const res = await http.patch(`${ACCOUNT_SERVICE_V1}/Account/${userId}`, {
    avatarId,
  });
  return res.data;
}
