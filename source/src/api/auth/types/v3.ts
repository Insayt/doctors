/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum ActiveDirectoryConfigType {
  Default = 'Default',
  Rc = 'Rc',
  Budu = 'Budu',
}

export interface ActiveDirectoryUserDto {
  login?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  mail?: string | null;

  /** @format date-time */
  birthDate: string;
  clientProfile?: string | null;
  role?: string | null;
  phoneNumber?: string | null;
  isEnable: boolean;
}

/**
 * Модель токена авторизации
 */
export interface AuthTokenDto {
  /** Access-токен */
  accessToken?: string | null;

  /**
   * Время жизни access-токена
   * @format date-time
   */
  accessExpireTime: string;

  /** Refresh-токен */
  refreshToken?: string | null;

  /**
   * Время жизни refresh-токена
   * @format date-time
   */
  refreshExpireTime: string;

  /**
   * Идентификатор пользователя
   * @format uuid
   */
  userId: string;
}

export interface CheckPinArgs {
  pinHash: string;
  token: string;
}

/**
 * Данные страны для авторизации
 */
export interface CountryPhoneDataDto {
  /**
   * Идентификатор
   * @format int64
   */
  id: number;

  /** Ссылка на флаг страны x1 */
  flagUrl?: string | null;

  /** Ссылка на флаг страны x2 */
  flagUrlX2?: string | null;

  /** Ссылка на флаг страны x3 */
  flagUrlX3?: string | null;

  /** Название страны */
  country?: string | null;

  /** Телефоный код страны */
  phoneCode?: string | null;

  /** Сокращение страны (формат ISO 3166-1) */
  countryCode?: string | null;
}

/**
 * Модель устройства входа
 */
export interface DeviceInfoDataArgs {
  /** Имя устройства */
  deviceName?: string | null;

  /** Идентификатор устройства */
  deviceId?: string | null;
  userAppType: DeviceType;

  /** Версия устройства */
  version?: string | null;
  userAppCode?: UserAppCode;
}

export enum DeviceType {
  AndroidApp = 'AndroidApp',
  IOSApp = 'iOSApp',
  WebClientApp = 'WebClientApp',
  WebAdminApp = 'WebAdminApp',
  Unknown = 'Unknown',
}

export interface ErrorCodes {
  /** Администратор не может удалить себя. */
  AdminTriedRemoveHimself?: string;

  /** Код подтверждения устарел. */
  ConfirmationCodeExpired?: string;

  /** Оператор {0} не найден. */
  OperatorNotFound?: string;

  /** Почта уже подтверждена. */
  EmailAlreadyConfirmed?: string;

  /** Почта {0} уже была использована. */
  EmailAlreadyUsed?: string;

  /** Неверный код подтверждения {0}. */
  InvalidConfirmationCode?: string;

  /** Неверный токен {0}. */
  InvalidConfirmationToken?: string;

  /** Неверный пароль. */
  InvalidPassword?: string;

  /** Неверный токен обновления. */
  InvalidRefreshToken?: string;

  /** Неверный токен авторизации. */
  InvalidAuthToken?: string;

  /** Логин уже был использован. */
  LoginAlreadyUsed?: string;

  /** Пароли не совпадают. */
  PasswordAndRepeatedPasswordDifferent?: string;

  /** Телефон уже подтвержден. */
  PhoneAlreadyConfirmed?: string;

  /** Токен обновления просрочен. */
  RefreshTokenExpired?: string;

  /** Ошибка отправки почты. */
  SendEmail?: string;

  /** Ошибка отправки смс. */
  SendSms?: string;

  /** До следующей отправки осталось {0}. */
  TooEarlyForSendCode?: string;

  /** Превышено количество попыток авторизоваться. */
  TooManyAttempts?: string;

  /** Системная ошибка. */
  DataIsEmptyCache?: string;

  /** Пользователь {0} не найден. */
  UserNotFound?: string;

  /** Введен неверный номер телефона {0}. */
  InvalidPhoneNumber?: string;

  /** Пользователь с ролью сервисного аккаунта не найден. */
  ServiceAccountNotFound?: string;

  /** Версия приложения устарела! Для продолжения работы необходимо обновить приложение. */
  AppVersionIsObsolete?: string;

  /** Неверный формат версии. */
  InvalidVersionFormat?: string;

  /** ИНН уже был использован. */
  InnAlreadyUsed?: string;

  /** Партнер не найден. */
  PartnerNotFound?: string;

  /** У партнера есть клиенты. */
  PartnerHasUsers?: string;

  /** Нельзя создать пользователя с ролью {0}. */
  InvalidRoleException?: string;

  /** Ошибка безопасности */
  UserSecurity?: string;

  /** Пароль слишком простой */
  PasswordInvalid?: string;

  /** Не удалось авторизоваться через active directory */
  ADLoginFailed?: string;

  /** Пользователь {0} не найдене в active directory */
  ADUserNotFound?: string;

  /** Пользователю {0} не позволено авторизоваться через active directory */
  ADLoginNotAllowed?: string;

  /** Пользователь {0} должен авторизоваться с помощью active directory. */
  ADLoginOnlyAllowed?: string;

  /** Не удалось определить профиль клиента */
  ADInvalidClientProfile?: string;

  /** Не удалось определить роль клиента */
  ADInvalidRole?: string;

  /** Информация об устройстве не была найдена. */
  DeviceInfoNotFound?: string;

  /** Срок действия токена истек */
  AuthorizedRefreshToken?: string;

  /** Требуется {0} */
  ClientProfileMismatch?: string;

  /** Номер телефона {0} уже добавлен в белый список. */
  PhoneIsAlreadyInTheWhiteList?: string;

  /** Номер телефона {0} не был найден в белом списке. */
  PhoneNotFoundInTheWhiteList?: string;

  /** Невозможно определить IP адрес. */
  CannotResolveIp?: string;

  /** Превышено количество неудачных запросов. Повторите попытку через {0} секунд. */
  FailedAttemptsLimitExceeded?: string;

  /** Время блокировки ещё не закончилось. Повторите попытку. */
  BlockTimeNotExpired?: string;

  /** Пользователь {0} не активен! Пожалуйста, подтвердите профиль или создайте новый. */
  UserNotEnabled?: string;

  /** Данный пользователь ранее имел роль {0}. */
  InvalidRestoreUserWithDifferentRole?: string;

  /** Данный пользователь ранее имел тип профиля {0}. */
  InvalidRestoreUserWithDifferentClientProfile?: string;

  /** Сессия не найдена для пользователя */
  SessionNotFound?: string;

  /** Пин-код не установлен */
  PinCodeNotFound?: string;

  /** Пин-код не валиден */
  InvalidPinCode?: string;

  /** Превышено допустимое число вводов пин-кода */
  MaxNumberAttempts?: string;

  /** Данные стран(ы) {0} не найдены. */
  CountryPhoneDataNotFound?: string;

  /** Неверный логин {0} */
  InvalidGuestClientLogin?: string;

  /** Не найден UserProfileSource соответствующий UserApp={0} */
  UserProfileSourceNotFoundByUserApp?: string;

  /** Получен неверный токен доступа при обращении в ЕСИА API. */
  EsiaInvalidAccessToken?: string;

  /** Получен некорректный идентификатор пользователя при обращении в ЕСИА API. */
  EsiaInvalidUserId?: string;

  /** Пользователь {0} не найден в системе ЕСИА. */
  EsiaUserNotFound?: string;

  /** Проверочный набор символов {0} запроса (тип: {2}) отличается от проверочного набора символов {1} в ответе от ЕСИА. */
  EsiaDifferentRequestAndResponseStates?: string;

  /** Неверный код аутентификации для обращения в ЕСИА. */
  EsiaInvalidAuthCode?: string;

  /** Неверный проверочный набор символов при обращении в ЕСИА. */
  EsiaInvalidState?: string;

  /** Возникла ошибка в процессе авторизации в системе ЕСИА. */
  EsiaErrorDuringAuthorization?: string;

  /** Информация о запросе аутентификации {0} в системе ЕСИА не найдена. */
  EsiaAuthInfoNotFound?: string;

  /** Невозможно войти с помощью сервиса ЕСИА из-за проблем с сервисом подписей. Пожалуйста, обратитесь в поддержку. */
  EsiaSignatureServiceNotAvailable?: string;
}

export interface ErrorDetails {
  code?: string | null;
  description?: string | null;
  arguments?: Record<string, any>;
}

export interface ErrorResponse {
  error?: ErrorDetails;
}

/**
 * Модель запроса токена
 */
export interface IssueTokenDto {
  /** Токен подтверждения */
  confirmationToken?: string | null;

  /**
   * Время жизни кода подтверждения
   * @format date-time
   */
  codeExpireTime: string;

  /**
   * Время жизни кода (сек.)
   * @format int32
   */
  codeExpireTimeSeconds: number;

  /**
   * Время следующего запроса
   * @format date-time
   */
  earliestTimeNextSending: string;

  /**
   * Время следующего запроса (сек.)
   * @format int32
   */
  earliestTimeNextSendingSeconds: number;

  /**
   * Количество попыток
   * @format int32
   */
  smsAttempts: number;
}

export interface IssueTokenWithMaskedPhoneDto {
  maskedPhoneNumber?: string | null;

  /** Токен подтверждения */
  confirmationToken?: string | null;

  /**
   * Время жизни кода подтверждения
   * @format date-time
   */
  codeExpireTime: string;

  /**
   * Время жизни кода (сек.)
   * @format int32
   */
  codeExpireTimeSeconds: number;

  /**
   * Время следующего запроса
   * @format date-time
   */
  earliestTimeNextSending: string;

  /**
   * Время следующего запроса (сек.)
   * @format int32
   */
  earliestTimeNextSendingSeconds: number;

  /**
   * Количество попыток
   * @format int32
   */
  smsAttempts: number;
}

/**
 * одноразовый код авторизации
 */
export interface OneTimeCodeDto {
  /**
   * код
   * @format uuid
   */
  code: string;
}

export enum ProfileSource {
  RENHEALTH = 'RENHEALTH',
  BUDU = 'BUDU',
  BUDUB2B = 'BUDU_B2B',
  RENLIFE = 'RENLIFE',
  BUDU_OP = 'BUDU_OP',
  PMO_LK = 'PMO_LK',
  RENHEALTH_API = 'RENHEALTH_API',
  DSKY = 'DSKY',
  BUDU_LK = 'BUDU_LK',
}

/**
 * Модель запроса аворизации по refresh-токену
 */
export interface RefreshAuthTokenDataArgs {
  /** Токен обновления */
  refreshToken: string;
}

export interface SavePinArgs {
  pinHash: string;
}

export enum UserAppCode {
  RenHealth = 'RenHealth',
  Budu = 'Budu',
}

/**
 * Модель запроса авторизации пользователя
 */
export interface UserAuthByActiveDirectoryDataArgs {
  /** Логин */
  login: string;

  /** Пароль */
  password: string;

  /** Модель устройства входа */
  appInfo: DeviceInfoDataArgs;
}

/**
 * Модель запроса авторизации пользователя
 */
export interface UserAuthByLoginAndPasswordDataArgs {
  /** Логин */
  login: string;

  /** Пароль */
  password: string;

  /** Модель устройства входа */
  appInfo: DeviceInfoDataArgs;
}
