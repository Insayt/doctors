import { Platform } from 'quasar';
import http from '../index';
import { ConfirmSMSCodeRequestDTO } from './types';
import {
  AuthTokenDto,
  DeviceInfoDataArgs,
  DeviceType,
  IssueTokenWithMaskedPhoneDto,
  UserAppCode,
} from './types/v3';

const API_URL = '/api/auth/v3/auth';

function _getOrCreateDeviceId(): string {
  let deviceId = window.localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = (((new Date().getTime() / 1000) * Math.random()) | 0).toString();
    window.localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

export async function getSMSCode(
  rawLogin: string
): Promise<IssueTokenWithMaskedPhoneDto> {
  const login = encodeURIComponent(rawLogin);
  const payload: DeviceInfoDataArgs = {
    userAppType: DeviceType.WebClientApp,
    userAppCode: UserAppCode.Budu,
    deviceName: Platform.is.name,
    deviceId: _getOrCreateDeviceId(),
  };

  const { data } = await http.post<IssueTokenWithMaskedPhoneDto>(
    `${API_URL}/login-sms`,
    payload,
    { params: { login } }
  );
  return data;
}

export async function confirmSMSCode({
  confirmationToken,
  confirmationCode,
}: ConfirmSMSCodeRequestDTO): Promise<AuthTokenDto> {
  const { data } = await http.post(
    `${API_URL}/sms/${confirmationToken}/web`,
    {},
    {
      params: {
        confirmationCode,
      },
    }
  );
  return data;
}

export async function refreshAuth(refreshToken: string): Promise<AuthTokenDto> {
  const { data } = await http.post(`${API_URL}/token/refresh`, {
    refreshToken,
  });
  return data;
}

export async function logout(): Promise<void> {
  await http.post(`${API_URL}/logout/web`);
}
