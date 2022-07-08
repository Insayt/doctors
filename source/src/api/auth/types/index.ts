// import { DateTimeString, Nullable, UUID } from '@/types';

// export type DeviceInfoDataArgs = {
//   deviceId?: Nullable<string>;
//   deviceName?: Nullable<string>;
//   userAppCode: UserAppCodeEnum;
//   userAppType: DeviceTypeEnum;
//   version?: Nullable<string>;
// };

// export type IssueTokenWithMaskedPhoneDto = {
//   maskedPhoneNumber: Nullable<string>;
//   confirmationToken: Nullable<string>;
//   codeExpireTime: DateTimeString;
//   codeExpireTimeSeconds: number;
//   earliestTimeNextSending: DateTimeString;
//   earliestTimeNextSendingSeconds: number;
//   smsAttempts: number;
// };

export type ConfirmSMSCodeRequestDTO = {
  confirmationCode: string;
  confirmationToken: string;
};

// export type AuthTokenDto = {
//   accessToken: Nullable<string>;
//   accessExpireTime: DateTimeString;
//   refreshExpireTime: DateTimeString;
//   refreshToken: Nullable<string>;
//   userId: UUID;
// };
