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

export interface ErrorDetails {
  code?: string | null;
  description?: string | null;
  arguments?: Record<string, object>;
}

export interface ErrorResponse {
  error?: ErrorDetails;
}

export enum AccountSortType {
  SortByIdAsc = 'SortByIdAsc',
  SortByIdDesc = 'SortByIdDesc',
  SortByLastNameAsc = 'SortByLastNameAsc',
  SortByLastNameDesc = 'SortByLastNameDesc',
}

/**
 * Модель адреса
 */
export interface AddressDto {
  /** Город */
  city: string;

  /** Улица */
  street?: string | null;

  /** Дом */
  house: string;

  /** Квартира */
  apartment?: string | null;

  /** Строение */
  building?: string | null;

  /** Этаж */
  floor?: string | null;

  /** Метро */
  metro?: string | null;

  /** Вход */
  entrance?: string | null;
}

/**
 * Модель адреса
 */
export interface GeoCoordinatesDto {
  /** Долгота */
  lat?: string | null;

  /** Широта */
  lon?: string | null;
}

/**
 * Модель адреса пользователя
 */
export interface UserAddressDto {
  /**
   * Идентификатор
   * @format uuid
   */
  id: string;

  /** Название */
  title?: string | null;

  /** Заголовок */
  snapshot?: string | null;

  /** Модель адреса */
  address?: AddressDto;

  /** Модель адреса */
  geo?: GeoCoordinatesDto;

  /** Домофон */
  intercom?: string | null;

  /** Комментарий */
  comment?: string | null;

  /**
   * Дата создания
   * @format date-time
   */
  creationDate: string;
}

export enum Gender {
  None = 'None',
  Male = 'Male',
  Female = 'Female',
}

export interface UserClaimsDto {
  tokenClaims?: Record<string, string>;
  claims?: Record<string, string>;
}

export enum EmailStatus {
  NotConfirmed = 'NotConfirmed',
  ConfirmationEmailSent = 'ConfirmationEmailSent',
  Confirmed = 'Confirmed',
}

export enum PhoneType {
  PrivateMobile = 'PrivateMobile',
  WorkInternal = 'WorkInternal',
}

export interface UserPhoneDto {
  /** @format uuid */
  phoneId: string;
  phoneNumber?: string | null;
  phoneType: PhoneType;
}

export enum UserProfileApp {
  APP_RENHEALTH = 'APP_RENHEALTH',
  APP_BUDU = 'APP_BUDU',
  APP_BACKOFFICE = 'APP_BACKOFFICE',
  APP_PMO = 'APP_PMO',
  APP_DOC_BUDU = 'APP_DOC_BUDU',
  APP_BUDU_RENHEALTH = 'APP_BUDU_RENHEALTH',
}

export enum UserProfileSource {
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
 * Модель профиля пользователя
 */
export interface UserProfileDto {
  /**
   * Идентификатор
   * @format uuid
   */
  userId: string;

  /** Имя */
  firstName?: string | null;

  /** Фамилия */
  lastName?: string | null;

  /** Отчество */
  middleName?: string | null;

  /**
   * День рождения
   * @format date-time
   */
  birthDate?: string | null;

  /**
   * Идентификатор аватара
   * @format uuid
   */
  avatarId?: string | null;

  /** Номер телефона */
  phoneNumber?: string | null;

  /** Логин (имя для входа). */
  login?: string | null;

  /** Логин для системы МИС */
  misLogin?: string | null;

  /** Логин для системы МИС (MIS Life) */
  misLifeLogin?: string | null;

  /** Идентификатор для системы МИС */
  misId?: string | null;

  /** Идентификатор для системы МИС (Mis Life) */
  misLifeId?: string | null;

  /** Адреса клиента */
  addresses?: UserAddressDto[] | null;

  /**
   * Дата создания профиля
   * @format date-time
   */
  creationDate: string;

  /** Клиент действующий */
  isEnabled: boolean;
  gender: Gender;

  /** Роль пользователя. */
  role?: string | null;

  /** Email */
  email?: string | null;

  /** Номер СНИЛС */
  snils?: string | null;
  claims?: UserClaimsDto;

  /**
   * Id отдела, к которому прикреплен пользователь
   * @format uuid
   */
  departmentId?: string | null;
  emailStatus: EmailStatus;
  consent?: boolean | null;

  /** список телефонов пользователя */
  userPhones?: UserPhoneDto[] | null;
  userApp?: UserProfileApp;
  source?: UserProfileSource;
  userProfile?: string | null;

  /** Наличие ЭЦП */
  hasSignature?: boolean | null;

  /** Комментарий. */
  comment?: string | null;
}

export interface UserProfileDtoPagedData {
  data?: UserProfileDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export interface CreateAccountProfileArgsV2 {
  /** @format uuid */
  userId?: string | null;
  login?: string | null;
  misLogin?: string | null;
  misLifeLogin?: string | null;
  misId?: string | null;
  misLifeId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;

  /** @format date-time */
  birthDate?: string | null;
  role?: string | null;
  gender: Gender;

  /** @format uuid */
  avatarId?: string | null;

  /** @format email */
  email?: string | null;
  snils?: string | null;
  isEnabled: boolean;
  phoneNumber?: string | null;
  userProfileSource: UserProfileSource;

  /** Id пользователя ЕСИА */
  esiaId?: string | null;
}

export interface UserProfileExternalDto {
  /**
   * Идентификатор
   * @format uuid
   */
  userId: string;

  /** Имя */
  firstName?: string | null;

  /** Фамилия */
  lastName?: string | null;

  /** Отчество */
  middleName?: string | null;

  /**
   * День рождения
   * @format date-time
   */
  birthDate?: string | null;

  /** Номер телефона */
  phoneNumber?: string | null;

  /** Логин (имя для входа). */
  login?: string | null;

  /**
   * Дата создания профиля
   * @format date-time
   */
  creationDate: string;

  /** Клиент действующий */
  isEnabled: boolean;
  gender: Gender;

  /** Email */
  email?: string | null;

  /** Номер СНИЛС */
  snils?: string | null;

  /** Наличие согласия на мед. вмешательство */
  consent?: boolean | null;
  userApp?: UserProfileApp;
  source?: UserProfileSource;
}

export interface UserProfileSlimDto {
  /**
   * Идентификатор
   * @format uuid
   */
  userId: string;

  /** Имя */
  firstName?: string | null;

  /** Фамилия */
  lastName?: string | null;

  /** Отчество */
  middleName?: string | null;

  /**
   * День рождения
   * @format date-time
   */
  birthDate?: string | null;

  /** Номер телефона */
  phoneNumber?: string | null;

  /** Email */
  email?: string | null;
  gender: Gender;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;

  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  extensions?: Record<string, object>;
}

export interface UserProfileSlimDtoPagedData {
  data?: UserProfileSlimDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export interface PatchAccountProfileArgsV2 {
  userApp?: UserProfileApp;
  source?: UserProfileSource;

  /** Id пользователя ЕСИА */
  esiaId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;

  /** @format date-time */
  birthDate?: string | null;

  /** @format uuid */
  avatarId?: string | null;
  gender?: Gender;

  /** @format email */
  email?: string | null;

  /** Номер СНИЛС. Пробел - удаление снилс, null - без изменений. */
  snils?: string | null;
}

export interface UserProfileIdDto {
  /** @format uuid */
  userId: string;
}

export interface GuidPagedData {
  data?: string[] | null;

  /** @format int32 */
  totalCount: number;
}

/**
 * Аргументы для обновления эл. почт в аккаунтах.
 */
export interface SyncEmailsFrom1CArgs {
  /** Фамилия доктора. */
  lastName?: string | null;

  /** Имя доктора. */
  firstName?: string | null;

  /** Отчество доктора. */
  middleName?: string | null;

  /** Электронная почта. */
  email?: string | null;
}

export interface PatchAccountCommentArgs {
  comment?: string | null;
}

export enum PassportType {
  RussianPassport = 'RussianPassport',
  ForeignPassport = 'ForeignPassport',
}

export interface UserPassportDto {
  /**
   * ID
   * @format uuid
   */
  passportId: string;

  /**
   * ID владельца
   * @format uuid
   */
  userId: string;

  /**
   * Дата добавления
   * @format date-time
   */
  creationDate: string;

  /** Полный номер документа (серия и номер) */
  fullNumber?: string | null;

  /** Серия */
  series?: string | null;

  /** Номер */
  number?: string | null;
  passportType: PassportType;

  /** Описание типа документа. */
  passportTypeDescription?: string | null;

  /**
   * Дата выдачи
   * @format date-time
   */
  issueDate?: string | null;

  /** Кем выдан */
  issuer?: string | null;

  /**
   * Срок действия
   * @format date-time
   */
  expireDate?: string | null;
}

export interface UserPassportDtoPagedData {
  data?: UserPassportDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export interface FeatureToggleDto {
  /** Номер договора */
  agreementNumber?: string | null;
}

export interface SourceMappingDto {
  source?: UserProfileSource;
  userApp?: UserProfileApp;
}

/**
 * Сертификат и номер телефона пользователя
 */
export interface UserCertificateWithPhoneNumberDto {
  /**
   * Id сертификата
   * @format uuid
   */
  certificateId?: string | null;

  /**
   * Guid пользователя
   * @format uuid
   */
  userId: string;

  /** Имя (логин) пользователя в CryptoPro */
  cryptoProUserName?: string | null;

  /** Номер сертификата */
  number?: string | null;

  /**
   * Дата и время начала действия сертификата
   * @format date-time
   */
  startDate?: string | null;

  /**
   * Дата и время окончания действия сертификата
   * @format date-time
   */
  endDate?: string | null;

  /**
   * Id сертификата в CryptoPro
   * @format int32
   */
  cryptoProCertId?: number | null;

  /** Телефон пользователя */
  phoneNumber?: string | null;
}

/**
 * Сертификат пользователя
 */
export interface CreateUserCertificateArgs {
  /**
   * Guid пользователя
   * @format uuid
   */
  userId: string;

  /** Имя (логин) пользователя в CryptoPro */
  cryptoProUserName?: string | null;

  /** Номер сертификата */
  number?: string | null;

  /**
   * Дата и время начала действия сертификата
   * @format date-time
   */
  startDate: string;

  /**
   * Дата и время окончания действия сертификата
   * @format date-time
   */
  endDate: string;

  /**
   * Id сертификата в CryptoPro
   * @format int32
   */
  cryptoProCertId: number;
}

/**
 * Сертификат пользователя
 */
export interface UserCertificateDto {
  /**
   * Id сертификата
   * @format uuid
   */
  certificateId: string;

  /**
   * Guid пользователя
   * @format uuid
   */
  userId: string;

  /** Имя (логин) пользователя в CryptoPro */
  cryptoProUserName?: string | null;

  /** Номер сертификата */
  number?: string | null;

  /**
   * Дата и время начала действия сертификата
   * @format date-time
   */
  startDate: string;

  /**
   * Дата и время окончания действия сертификата
   * @format date-time
   */
  endDate: string;

  /**
   * Id сертификата в CryptoPro
   * @format int32
   */
  cryptoProCertId: number;
}

/**
 * Сертификат пользователя
 */
export interface PatchUserCertificateArgs {
  /** Имя (логин) пользователя в CryptoPro */
  cryptoProUserName?: string | null;

  /** Номер сертификата */
  number?: string | null;

  /**
   * Дата и время начала действия сертификата
   * @format date-time
   */
  startDate?: string | null;

  /**
   * Дата и время окончания действия сертификата
   * @format date-time
   */
  endDate?: string | null;

  /**
   * Id сертификата в CryptoPro
   * @format int32
   */
  cryptoProCertId?: number | null;
}

export interface ErrorCodes {
  /** Пользователь не найден. */
  UserNotFound?: string;

  /** Файл не найден */
  FileNotFound?: string;

  /** Неизвестный формат файла */
  InvalidFormat?: string;

  /** Адрес не найден. */
  AddressNotFound?: string;

  /** Аватар не найден. */
  AvatarNotFound?: string;

  /** Некорректное название или значение ограничения '{0}'. */
  WrongRestriction?: string;

  /** Некорректное название или значение метаданных '{0}'. */
  WrongClaim?: string;

  /** Необходимо указать Mis login И mis id. */
  NoMisCredentialsProvided?: string;

  /** Учетные данные mis-системы недопустимы для роли {0}. */
  MisCredentialsIsForbidden?: string;

  /** Ограничение пользователя не найдено. */
  RestrictionNotFound?: string;

  /** Метаданные {0} пользователя не найдены. */
  ClaimNotFound?: string;

  /** Документ, удостоверяющий личность, не найден. */
  PassportNotFound?: string;

  /** Некорректный номер документа, удостоверяющего личность. */
  InvalidPassportNumber?: string;

  /** Введен неверный номер СНИЛС {0}. */
  InvalidSnils?: string;

  /** Поле может содержать только буквы, пробелы и тире. */
  NameValidation?: string;

  /** Отдел не найден. */
  DepartmentNotFound?: string;

  /** Пользователь уже является главой отдела {0}. */
  UserIsHeadOfAnotherDepartment?: string;

  /** У департамента есть субэлементы. */
  DepartmentHasChildren?: string;

  /** Истекло время жизни ссылки. Запросите подтверждение почты повторно. */
  ConfirmationKeyExpired?: string;

  /** Email уже подтвержден. */
  EmailIsAlreadyConfirmed?: string;

  /** Введен неверный номер телефона {0}. */
  InvalidPhoneNumber?: string;

  /** Количество профилей пользователей не должно превышать '{0}'. */
  UserProfilesTooMany?: string;

  /** Не найден шаблон ключа маршрутизации для сообщения с типом '{0}' */
  MassTransitRoutingKeyTemplateNotFound?: string;

  /** Источник создания пользователя не найден */
  UserSourceNotFound?: string;

  /** Номер телефона {0} уже указан у клиента */
  AccountPhoneExist?: string;

  /** Номер телефона не найден у пользователя */
  AccountPhoneNotFound?: string;

  /** Нельзя удалить главный номер телефона */
  IsMainPhone?: string;

  /** Профиль с данным телефоном {0} и источником уже создан */
  UserProfileWithPhoneAndSourceAlreadyExists?: string;

  /** Сертификат пользователя не найден. */
  UserCertificateNotFound?: string;

  /** Не найден номер телефона пользователя. */
  UserPhoneNotFound?: string;
}
