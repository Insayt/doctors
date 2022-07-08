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

export interface AccountsDto {
  accounts?: UserProfileDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export enum UserAppCode {
  RenHealth = 'RenHealth',
  Budu = 'Budu',
}

export interface CreateAccountProfileArgs {
  /** @format uuid */
  userId: string;
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
  userAppCode?: UserAppCode;
  phoneNumber?: string | null;
}

/**
 * Patch account profiles query params
 */
export interface PatchAccountProfileArgs {
  /** Роль пользователя */
  role?: string | null;

  /** Логин пользователя */
  login?: string | null;

  /** Логин для системы МИС */
  misLogin?: string | null;

  /** Идентификатор для системы МИС */
  misId?: string | null;

  /** Логин для системы МИС (MIS Life) */
  misLifeLogin?: string | null;

  /** Идентификатор для системы МИС (MIS Life) */
  misLifeId?: string | null;

  /** Номер телефона */
  phoneNumber?: string | null;
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

export interface CreatePhoneArgs {
  /** @format uuid */
  userId: string;
  phoneNumber: string;
  isMain: boolean;
  phoneType: PhoneType;
}

export interface AddPhoneDto {
  /** @format uuid */
  phoneId: string;
}

export interface UpdatePhoneArgs {
  /** @format uuid */
  userId: string;

  /** @format uuid */
  phoneId: string;
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

export interface CreateUserPassportArgs {
  /** Серия */
  series?: string | null;

  /** Номер */
  number: string;
  passportType: PassportType;

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

export interface PatchUserPassportArgs {
  /** Серия */
  series?: string | null;

  /** Номер */
  number?: string | null;

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

export enum DepartmentSortType {
  SortByIdAsc = 'SortByIdAsc',
  SortByIdDesc = 'SortByIdDesc',
  SortByNameAsc = 'SortByNameAsc',
  SortByNameDesc = 'SortByNameDesc',
}

/**
 * Отдел
 */
export interface DepartmentDto {
  /** @format uuid */
  departmentId: string;

  /** Наименование */
  name?: string | null;

  /** @format date-time */
  creationDate: string;

  /**
   * Id родительского отдела (для формирования иерархии)
   * @format uuid
   */
  parentId?: string | null;

  /** Локация, список территорий расположений */
  location?: string | null;

  /**
   * Id пользователя-руководителя отдела (уникальный)
   * @format uuid
   */
  headId?: string | null;
}

export interface CreateDepartmentArgs {
  /** Наименование */
  name: string;

  /**
   * Id родительского отдела (для формирования иерархии)
   * @format uuid
   */
  parentId?: string | null;

  /** Локация, список территорий расположений */
  location?: string | null;

  /**
   * Id пользователя-руководителя отдела (уникальный)
   * @format uuid
   */
  headId?: string | null;
}

export interface PutDepartmentArgs {
  /** Наименование */
  name: string;

  /**
   * Id родительского отдела (для формирования иерархии)
   * @format uuid
   */
  parentId?: string | null;

  /** Локация, список территорий расположений */
  location?: string | null;

  /**
   * Id пользователя-руководителя отдела (уникальный)
   * @format uuid
   */
  headId?: string | null;
}

export interface PatchDepartmentArgs {
  /**
   * Id пользователя-руководителя отдела (уникальный)
   * @format uuid
   */
  headId: string;
}

export enum HotlineRegion {
  General = 'general',
  Moscow = 'moscow',
  Spb = 'spb',
}

export interface HotLineRegion {
  region: HotlineRegion;
  phone?: string | null;
}

export enum KindOfHotLine {
  Support = 'Support',
  AmbulanceCall = 'AmbulanceCall',
}

/**
 * Модель адреса пользователя
 */
export interface CreateUserAddressArgs {
  /** Название */
  title?: string | null;

  /** Заголовок */
  snapshot: string;

  /** Модель адреса */
  address: AddressDto;

  /** Модель адреса */
  geo?: GeoCoordinatesDto;

  /** Домофон */
  intercom?: string | null;

  /** Комментарий */
  comment?: string | null;
}

/**
 * Модель адреса пользователя
 */
export interface PatchUserAddressArgs {
  /** Название */
  title?: string | null;

  /** Комментарий */
  comment?: string | null;

  /** Квартира */
  apartment?: string | null;

  /** Этаж */
  floor?: string | null;

  /** Вход */
  entrance?: string | null;

  /** Домофон */
  intercom?: string | null;
}

/**
 * Patch user profiles query params
 */
export interface PatchUserProfileArgs {
  /** Номер телефона */
  phoneNumber?: string | null;

  /** Согласие на мед. вмешатесльтво и обработку персональных данных */
  consent?: boolean | null;

  /** Наличие ЭЦП */
  hasSignature?: boolean | null;
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

export interface UpdateUserProfileArgs {
  /** @pattern ^$|^([\p{L}]*[\s|\-]*)+$ */
  firstName?: string | null;

  /** @pattern ^$|^([\p{L}]*[\s|\-]*)+$ */
  lastName?: string | null;

  /** @pattern ^$|^([\p{L}]*[\s|\-]*)+$ */
  middleName?: string | null;

  /** @format date-time */
  birthDate?: string | null;

  /** @format uuid */
  avatarId?: string | null;
  gender: Gender;

  /** @format email */
  email?: string | null;

  /** Наличие ЭЦП */
  hasSignature?: boolean | null;
}

export interface UserRestrictionDto {
  name?: string | null;
  value?: string | null;
}

export enum ImportanceLevels {
  SupportServiceHighPriority = 'SupportServiceHighPriority',
  AppointmentToLpuThroughSupport = 'AppointmentToLpuThroughSupport',
  AppointmentToLpuThroughTelemed = 'AppointmentToLpuThroughTelemed',
  DoctorCall = 'DoctorCall',
  BuyingDmsPolicyForRelative = 'BuyingDmsPolicyForRelative',
  BuyingExtendedDmsPolicy = 'BuyingExtendedDmsPolicy',
  SupportChatOnMainPage = 'SupportChatOnMainPage',
}

export enum PrivilegeSource {
  PolicyDms = 'PolicyDms',
  PolicyNs = 'PolicyNs',
}

export interface UserServiceLevelRemoveRequest {
  /** ИНН корпоративного клиента */
  inn?: string | null;
  servicePriority: ImportanceLevels;
  source: PrivilegeSource;
}

export interface UserServiceLevelAddRequest {
  /** ИНН корпоративного клиента, для сотрудников которой добавляется привилегия */
  inn?: string | null;

  /**
   * Дата начала действия привилегии
   * @format date-time
   */
  startDate: string;

  /**
   * Дата окончания действия привилегии
   * @format date-time
   */
  endDate?: string | null;
  servicePriority: ImportanceLevels;
  source: PrivilegeSource;
}

/**
 * Настройки пользователя.
 */
export interface UserSettingsDto {
  /**
   * UserId
   * @format uuid
   */
  userId: string;

  /** Отображать или нет убытки в ленте клиента. */
  showLosses: boolean;

  /** Подписан ли клиент на пуш-уведомления. */
  pushActive: boolean;
}

export interface PutUserSettingsArgs {
  /** Отображать или нет убытки в ленте клиента. */
  showLosses: boolean;

  /** Подписан ли клиент на пуш-уведомления. */
  pushActive: boolean;
}

export interface PatchUserSettingsArgs {
  /** Отображать или нет убытки в ленте клиента. */
  showLosses?: boolean | null;

  /** Подписан ли клиент на пуш-уведомления. */
  pushActive?: boolean | null;
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
