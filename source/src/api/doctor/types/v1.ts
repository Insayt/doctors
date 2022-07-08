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

export interface ActivityDoctorDto {
  /**
   * ID врача
   * @format uuid
   */
  doctorId: string;
  activityTypeExclude?: ActivityTypeExclude;
}

export interface ActivitySpecialtyTypeDto {
  activityType?: string | null;

  /** @format int32 */
  priority: number;
  flags?: SpecialtyFlags[] | null;
}

export interface ActivityTypeDto {
  name?: string | null;
  description?: string | null;
}

export enum ActivityTypeExclude {
  Appointment = 'Appointment',
  Telemed = 'Telemed',
  Doctorcall = 'Doctorcall',
}

export interface AddSpecialityArgs {
  /**
   * Id специальности
   * @format uuid
   */
  specialityId: string;
}

export interface ChangeSpecialtyFlagsArgs {
  /**
   * Свойства связи специальности с activityType.
   * ConsultAvailable -  Доступна косультация
   * AskForPainScale - Запрашивать уровень боли
   * IsUrgently - Есть ли данный специалист в принципе в списке для срочной записи.
   * IsDirectly - Eсть ли данный специалист в принципе в списке для записи на дату.
   */
  flags?: SpecialtyFlags[] | null;

  /** @format int32 */
  priority?: number | null;
}

export interface ClientPersonalDoctorCreateArgs {
  /**
   * ID врача
   * @format uuid
   */
  doctorId?: string | null;

  /**
   * ID специальности врача
   * @format uuid
   */
  specialityId?: string | null;

  /** номер задачи саппорта */
  issueNumber?: string | null;

  /**
   * PolicyId полиса
   * @format uuid
   */
  policyId: string;
}

export interface ClientPersonalDoctorDto {
  issueNumber?: string | null;

  /** @format uuid */
  doctorId?: string | null;

  /** @format uuid */
  specialityId?: string | null;

  /** @format uuid */
  clientId: string;
  policyNumber?: string | null;

  /** @format uuid */
  policyId?: string | null;
  clientSystem?: ClientSystem;
}

export interface ClientPersonalDoctorTaskArgs {
  /** @format uuid */
  policyId: string;
}

export interface ClientProfileDto {
  /** @format uuid */
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  fullName?: string | null;

  /** @format date-time */
  birthDate?: string | null;
  phoneNumber?: string | null;
}

export enum ClientSystem {
  Budu = 'Budu',
  RenHealth = 'RenHealth',
  RenLife = 'RenLife',
}

export interface ClientSystemDto {
  code?: string | null;
  name?: string | null;
  shortName?: string | null;
  active: boolean;
}

export interface CommentDto {
  /** @format uuid */
  activityId: string;
  activityType?: string | null;
  clientMaskedFullName?: string | null;
  commentText?: string | null;

  /** @format int32 */
  score: number;

  /** @format date-time */
  creationDate: string;

  /** Ответ врача на комментарий пользователя */
  response?: CommentResponseDto;
}

export interface CommentDtoPagedData {
  data?: CommentDto[] | null;

  /** @format int32 */
  totalCount: number;
}

/**
 * Ответ врача на комментарий пользователя
 */
export interface CommentResponseDto {
  /**
   * Дата ответа на отзыв
   * @format date-time
   */
  creationDate: string;

  /** Текст ответа на комментарий */
  text?: string | null;
}

/**
 * Файлы можно взять по ссылке ниже.
 */
export interface CreateDoctorSpecialityArgs {
  /**
   * Идентификатор специальности
   * @format uuid
   */
  specialityId?: string | null;

  /** Строковый идентификатор специальности */
  code?: string | null;

  /** Системный код в Ренессансе */
  reninsCode?: string | null;

  /** Системный код в "Доктор Рядом" */
  doctorRyadomCode?: string | null;

  /** Название специальности */
  specialityName?: string | null;

  /** Описание специальности */
  info?: string | null;
  activityTypes?: string[] | null;

  /**
   * Код спциальности для Cda документа
   * @format int32
   */
  specialityCodeCda: number;

  /** Название спциальности для Cda документа */
  specialityNameCda?: string | null;

  /**
   * Код типа консультации для Cda документа
   * @format int32
   */
  consTypeCodeCda: number;

  /** Название типа консультации для Cda документа */
  consTypeNameCda?: string | null;
  medCardType: MedCardTypeCode;
}

export interface DoctorDto {
  doctorId?: string | null;

  /** Client's phone number */
  phoneNumber?: string | null;

  /** First name */
  firstName?: string | null;

  /** Middle name */
  middleName?: string | null;

  /** Last name */
  lastName?: string | null;

  /**
   * Birthdate
   * @format date-time
   */
  birthdate?: string | null;

  /** Role */
  role?: string | null;

  /**
   * Avatar file Id
   * @format uuid
   */
  avatarId?: string | null;

  /** Клиент действующий */
  isEnabled: boolean;

  /** Коллекция специальностей */
  specialities?: DoctorSpecialityDto[] | null;

  /** Специализация */
  specialization?: string | null;

  /** Образование */
  institution?: string | null;

  /** Курсы */
  course?: string | null;

  /** Параметры рейтинга */
  rate?: DoctorInfoRateDto;

  /**
   * Ближайшая дата приема
   * @format date-time
   */
  nearestDate?: string | null;

  /** Организация из сервиса Legal */
  organizationInn?: string | null;

  /**
   * Общий опыт врача
   * @format int32
   */
  experienceTotalYears: number;

  /** Табельный номер сотрудника */
  employeePersonnelNumber?: string | null;

  /** Тип привлечения врача. */
  engagementTypeName?: string | null;

  /** Признак Лечащий врач. */
  isAssisting: boolean;
}

export interface DoctorInfoDto {
  user?: UserProfileDtoObsolete;
  nextInterval?: IntervalDto;
  doctorSpecialities?: DoctorSpecialityDto[] | null;
}

export interface DoctorInfoDtoPagedData {
  data?: DoctorInfoDto[] | null;

  /** @format int32 */
  totalCount: number;
}

/**
 * Параметры рейтинга
 */
export interface DoctorInfoRateDto {
  /**
   * Значение рейтинга (5-ти бальная шкала)
   * @format decimal
   */
  rateValue: number;

  /**
   * Количество оценок
   * @format int32
   */
  rateCount?: number | null;
}

/**
 * Файлы можно взять по ссылке ниже.
 */
export interface DoctorSpecialityDto {
  /**
   * Идентификатор специальности
   * @format uuid
   */
  specialityId: string;

  /** Строковый идентификатор специальности */
  code?: string | null;

  /** Системный код в Ренессансе */
  reninsCode?: string | null;

  /** Системный код в "Доктор Рядом" */
  doctorRyadomCode?: string | null;

  /** Название специальности */
  specialityName?: string | null;

  /** Описание специальности */
  info?: string | null;
  activityTypes?: ActivitySpecialtyTypeDto[] | null;

  /**
   * Код спциальности для Cda документа
   * @format int32
   */
  specialityCodeCda: number;

  /** Название спциальности для Cda документа */
  specialityNameCda?: string | null;

  /**
   * Код типа консультации для Cda документа
   * @format int32
   */
  consTypeCodeCda: number;

  /** Название типа консультации для Cda документа */
  consTypeNameCda?: string | null;

  /**
   * Время начала работы специальности.
   * @format time-span
   */
  startWorkTime?: string | null;

  /**
   * Время конца работы специальности.
   * @format time-span
   */
  endWorkTime?: string | null;

  /** Признак - круглосуточность. */
  aroundTheClock: boolean;

  /** Признак принадлежности той или иной специальности к опросу перед консультацией */
  availableForInterview: boolean;
  medCardType: MedCardTypeCode;
}

export interface EngagementTypeDto {
  /**
   * Id типа привлечения для клиента
   * @format uuid
   */
  engagementTypeId: string;

  /** Наименование типа привлечения (уникальное имя латиницей). */
  name?: string | null;

  /** Расшифровка. */
  description?: string | null;
}

export interface ErrorCodes {
  /** Специальность врача {0} не найдена. */
  DoctorSpecialityNotFound?: string;

  /** Тип активности {0} не найден. */
  ActivityTypeNotFound?: string;

  /** Специальность врача {0} уже существует. */
  DoctorSpecialityAlreadyExists?: string;

  /** Идентификаторы врачей не заполнены или разные */
  DoctorsIdsIsEmptyOrDifferent?: string;

  /** Специальность уже принадлежит врачу */
  DoctorAlreadyHaveSpeciality?: string;

  /** Врач не найден */
  DoctorNotFound?: string;

  /** Опыт работы не найден */
  ExperienceNotFound?: string;

  /** Места работы не найдены */
  ExperiencesNotFound?: string;

  /** Тип активности {0} уже привязан к специальности {1}. */
  DoctorSpecialityAlreadyHaveActivityType?: string;

  /** Маппинг специальности врача для инфоклиники не найден host {0}. */
  InfoclinicaDoctorSpecialityMappingNotFound?: string;

  /** Провайдер врачей не найден. */
  DoctorProviderNotFound?: string;

  /** Дата окончания интервала должна быть больше даты начала */
  InvalidInterval?: string;

  /** Дата окончания периода для конкретной позиции должна быть больше даты начала */
  InvalidIntervalByPosition?: string;

  /** Запись в избранном не найдена */
  FavoriteNotFound?: string;

  /** Операция с записью не разрешена */
  FavoriteOperationNotAllowed?: string;

  /** Врач уже в избранном */
  FavoriteAlreadyExists?: string;

  /** Запись о назначении персонального доктора уже существует */
  PersonalDoctorAlreadyDefinite?: string;

  /** Персональный доктор для клиента не назначен */
  PersonalDoctorNotFound?: string;

  /** Персональный доктор не разрешен для полиса */
  PersonalDoctorNotAllowed?: string;

  /** Уважаемый пациент! Ваш личный врач будет назначен Вам в самое ближайшее время */
  PersonalDoctorNotAppointed?: string;

  /** Комментарий не найден */
  CommentNotFound?: string;

  /** Поле "дата начала" является обязательным. */
  DateStartFieldIsMandatory?: string;

  /** Дата начала или дата окончания больше текущей даты. */
  DateStartOrDateEndGreaterCurrentDate?: string;

  /** Дата начала больше даты окончания. */
  StartDateMoreEndDate?: string;

  /** Часы вне диапазона 0 - 23. */
  HoursOutOfRange?: string;

  /** Тип привлечения {0} не найден */
  EngagementTypeNotFound?: string;
}

export interface ErrorDetails {
  code?: string | null;
  description?: string | null;
  arguments?: Record<string, any>;
}

export interface ErrorResponse {
  error?: ErrorDetails;
}

export enum ExternalProvider {
  Infoclinica = 'Infoclinica',
}

export interface ExternalProviderDoctorSpecialityDto {
  /** Файлы можно взять по ссылке ниже. */
  doctorSpeciality?: DoctorSpecialityDto;
  externalProvider: ExternalProvider;
  infoclinicaDoctorSpecialities?: InfoclinicaDoctorSpecialityDto[] | null;
}

export interface ExternalProviderDoctorSpecialityDtoCreateArgs {
  /** @format uuid */
  doctorSpecialityId: string;
  externalProvider: ExternalProvider;
  infoclinicaDoctorSpecialities?: InfoclinicaDoctorSpecialityDto[] | null;
}

export enum FavoriteActivityType {
  TELEMED = 'TELEMED',
}

/**
 * Добавление врача в избранное
 */
export interface FavoriteCreateArgs {
  /**
   * Врач
   * @format uuid
   */
  doctorId: string;

  /**
   * Специальность
   * @format uuid
   */
  specialityId: string;
  activityType: FavoriteActivityType;
}

export interface FavoriteDto {
  /** @format uuid */
  favoriteId: string;

  /**
   * Клиент
   * @format uuid
   */
  clientId: string;
  doctor?: DoctorDto;

  /** Файлы можно взять по ссылке ниже. */
  speciality?: DoctorSpecialityDto;
  activityType: FavoriteActivityType;
}

export interface FavoriteIdReponse {
  /** @format uuid */
  favoriteId?: string | null;
}

export interface FavoriteListDto {
  /** @format uuid */
  favoriteId: string;

  /**
   * Клиент
   * @format uuid
   */
  clientId: string;

  /**
   * Врач
   * @format uuid
   */
  doctorId: string;
  doctorFirstName?: string | null;
  doctorLastName?: string | null;
  doctorMiddleName?: string | null;

  /** @format uuid */
  doctorAvatarId?: string | null;

  /**
   * Специальность
   * @format uuid
   */
  specialityId: string;
  specialityName?: string | null;
  activityType: FavoriteActivityType;

  /** Параметры рейтинга */
  rate?: DoctorInfoRateDto;

  /**
   * Число отзывов
   * @format int32
   */
  commentsCount: number;

  /**
   * Общий опыт врача
   * @format int32
   */
  experienceTotalYears: number;
  nextInterval?: IntervalDto;

  /** Специализация */
  doctorSpecialization?: string | null;

  /** Образование */
  doctorInstitution?: string | null;

  /** Курсы повышения квалификации */
  doctorCourse?: string | null;
}

export interface GroupingFavoriteListDto {
  /**
   * Специальность
   * @format uuid
   */
  specialityId: string;

  /** Наименование специальности */
  specialityName?: string | null;

  /** Элементы избранного */
  items?: FavoriteListDto[] | null;
}

export interface HistoryDto {
  /** @format date-time */
  creationDate: string;
  statusFrom: IssueStatus;
  statusTo: IssueStatus;
  reason?: string | null;
  fullName?: string | null;
  queueName?: string | null;

  /** @format uuid */
  operatorId?: string | null;
  isForce: boolean;
  reasonFlags?: ReasonFlags[] | null;
}

export interface InfoclinicaDoctorSpecialityDto {
  host?: string | null;

  /** @format int64 */
  departmentId: number;
  departmentName?: string | null;
}

export interface InsurantPersonalDoctorCreateArgs {
  /**
   * ID врача
   * @format uuid
   */
  doctorId?: string | null;

  /** номер задачи саппорта */
  issueNumber?: string | null;

  /**
   * PolicyId полиса
   * @format uuid
   */
  policyId: string;

  /** наименование организации */
  insurantName: string;

  /** @format uuid */
  specialityId?: string | null;
}

export interface InsurantPersonalDoctorDto {
  issueNumber?: string | null;

  /** @format uuid */
  doctorId?: string | null;

  /** @format uuid */
  specialityId?: string | null;
  insurantInn?: string | null;
  insurantName?: string | null;

  /** @format uuid */
  policyId?: string | null;
  policyNumber?: string | null;
  clientSystem?: ClientSystem;
}

export interface InsurantPersonalDoctorTaskArgs {
  /** @format uuid */
  policyId: string;
}

export interface IntervalDto {
  intervalId?: string | null;
  doctorId?: string | null;

  /** @format date-time */
  beginInterval: string;

  /** @format date-time */
  endInterval: string;
  place?: PlaceDto;

  /** @format uuid */
  clientId?: string | null;

  /** @format uuid */
  externalId?: string | null;
  source?: string | null;
  isFree: boolean;
  onHold: boolean;
  type: IntervalType;
}

export enum IntervalType {
  DoctorByAppointmentForTelemed = 'DoctorByAppointmentForTelemed',
  DutyDoctorForTelemed = 'DutyDoctorForTelemed',
  DutyDoctorForJustAsk = 'DutyDoctorForJustAsk',
}

export interface IssueDto {
  number?: string | null;
  comment?: string | null;
  code?: string | null;
  status: IssueStatus;

  /** @format date-time */
  creationDate: string;

  /** @format date-time */
  updateDate: string;

  /** @format uuid */
  ownerId: string;

  /** @format uuid */
  operatorId?: string | null;

  /** @format uuid */
  externalId: string;
  histories?: HistoryDto[] | null;
  data?: Record<string, any>;
  queueName?: string | null;

  /** @format date-time */
  inProgressDate?: string | null;

  /** @format time-span */
  issueInProgressTime: string;

  /** @format date-time */
  expirationDate?: string | null;

  /** @format time-span */
  timeLeft?: string | null;
  reasonFlags?: ReasonFlags[] | null;
  metaCategory?: string | null;
  clientSystem?: ClientSystemDto;
  clientProfile?: ClientProfileDto;

  /** @format uuid */
  creatorId?: string | null;
}

export enum IssueStatus {
  New = 'New',
  InProgress = 'InProgress',
  WaitingResponse = 'WaitingResponse',
  Completed = 'Completed',
  Canceled = 'Canceled',
}

export enum MedCardTypeCode {
  BasicCard = 'BasicCard',
  PsychologicCard = 'PsychologicCard',
}

export interface OrganizationDto {
  /** Инн организации */
  inn?: string | null;

  /** Краткое наименование организации */
  name?: string | null;
}

/**
 * Файлы можно взять по ссылке ниже.
 */
export interface PatchCdaDoctorSpecialityArgs {
  /**
   * Код спциальности для Cda документа
   * @format int32
   */
  specialityCodeCda: number;

  /** Название спциальности для Cda документа */
  specialityNameCda?: string | null;

  /**
   * Код типа консультации для Cda документа
   * @format int32
   */
  consTypeCodeCda: number;

  /** Название типа консультации для Cda документа */
  consTypeNameCda?: string | null;
}

export interface PersonalDoctorDto {
  doctor?: DoctorDto;

  /** @format uuid */
  specialityId?: string | null;

  /**
   * Врач в избранном у клиента
   * @format uuid
   */
  favoriteId?: string | null;
}

export interface PlaceDto {
  code?: string | null;
  name?: string | null;
  isWholeDay: boolean;
  activityTypeName?: string | null;
}

export enum ReasonFlags {
  None = 'None',
  Transfer = 'Transfer',
  ChangeStatus = 'ChangeStatus',
  AutomaticAssign = 'AutomaticAssign',
  Force = 'Force',
  Escalate = 'Escalate',
}

export interface RefreshPersonalDoctorArgs {
  /**
   * ID врача, которого нужно заменить как личного врача
   * @format uuid
   */
  doctorId: string;
}

export enum SpecialtyFlags {
  None = 'None',
  ConsultAvailable = 'ConsultAvailable',
  AskForPainScale = 'AskForPainScale',
  IsUrgently = 'IsUrgently',
  IsDirectly = 'IsDirectly',
}

export interface UserProfileDtoObsolete {
  role?: string | null;
  isEnabled: boolean;

  /** @format uuid */
  avatarId?: string | null;

  /** @format date-time */
  birthDate?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  firstName?: string | null;

  /** @format uuid */
  userId: string;
  phoneNumber?: string | null;
  email?: string | null;
}
