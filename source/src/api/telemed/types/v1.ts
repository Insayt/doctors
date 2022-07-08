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

export type ActionResult = object;

export interface AttachVideoArg {
  /** @format uuid */
  roomId: string;

  /** @format uuid */
  fileId: string;
}

/**
 * Специальность врача, доступная для телемедицины
 */
export interface BaseTelemedSpecialityDto {
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
}

export enum ClientSystem {
  Budu = 'Budu',
  RenHealth = 'RenHealth',
  RenLife = 'RenLife',
}

export interface ConsultationDto {
  /** Специальность врача, доступная для телемедицины */
  doctorSpeciality?: BaseTelemedSpecialityDto;

  /** Заключения врача */
  documents?: MetaDocumentDto[] | null;

  /** Есть заключение. Рассчитывается на основе коллекции Documents */
  conclusionExists: boolean;

  /**
   * Ссылка на заключение (fileId)
   * @format uuid
   */
  conclusionId?: string | null;

  /**
   * Ссылка на файл карты здоровья (renfile)
   * @format uuid
   */
  healthCardFileId?: string | null;

  /** Флаг, отвечающий за показ опроса для той или иной специальности. */
  questionForAnamnesis: boolean;

  /** Медиа-записи консультации. */
  consultationRecords?: ConsultationRecordDto[] | null;

  /** @format uuid */
  consultationId: string;

  /** @format date-time */
  creationDate: string;

  /** @format date-time */
  updateDate: string;
  status: ConsultationState;

  /** комментарий пользователя, который он оставляет при создании консультации */
  comment?: string | null;

  /**
   * специализация врача из нашего справочника врачей
   * @format uuid
   */
  doctorSpecialityId: string;

  /** Признак, что консультация срочная */
  isUrgent: boolean;

  /**
   * желаемое время начала, только для IsUrgent = false
   * @format date-time
   */
  desiredStartDate?: string | null;

  /**
   * внутренний номер полиса
   * @format uuid
   */
  policyId?: string | null;

  /**
   * Внутренний Id подписки
   * @format uuid
   */
  subscriptionId?: string | null;

  /**
   * Идентификатор клиента, кому понадобилась консультация
   * @format uuid
   */
  clientId: string;

  /**
   * Идентификатор доктора, кто был назначен для проведения телемед консультации
   * @format uuid
   */
  doctorId?: string | null;

  /**
   * Идентификатор чата связанного с консультацией
   * @format uuid
   */
  chatId: string;

  /**
   * Имя комнаты
   * @format uuid
   */
  roomId?: string | null;

  /** @format int32 */
  rate?: number | null;
  rateDescription?: string | null;

  /** Номер саппорттаска */
  issueNumber?: string | null;

  /** Комментарий врача */
  doctorComment?: string | null;

  /** @format date-time */
  calculatedDateStart: string;

  /** Причина обращения */
  reasonDto?: ReasonDto;

  /**
   * Id слота из расписания врача
   * @format uuid
   */
  intervalId?: string | null;

  /** Задача на прикрепление заключения */
  conclusionIssue?: string | null;

  /** Код услуги */
  serviceCode?: string | null;

  /**
   * ссылка на оффер
   * @format uuid
   */
  offerId?: string | null;
  clientSystem?: ClientSystem;

  /** Признак того, что консультация была восстановлена */
  isRecovered: boolean;

  /**
   * Медиафайл консультации
   * @format uuid
   */
  videoRecordDocumentId?: string | null;

  /** Признак того, что при закрытии консультациии необходимо создать issue с направлением в ЛПУ. */
  needAnalyzes: boolean;
}

export interface ConsultationDtoPagedData {
  data?: ConsultationDto[] | null;

  /** @format int32 */
  totalCount: number;
}

/**
 * Медиа-запись консультации
 */
export interface ConsultationRecordDto {
  /**
   * Id консультации
   * @format int32
   */
  consultationId: number;

  /**
   * Id файла
   * @format uuid
   */
  fileId: string;

  /**
   * Размер файла
   * @format int64
   */
  fileSize: number;

  /** Наззвание файла */
  fileName?: string | null;
}

export enum ConsultationScenario {
  Justask = 'Justask',
  Telemed = 'Telemed',
}

/**
 * Количество консультаций по специальностям.
 */
export interface ConsultationsCountBySpecialitiesDto {
  /** Специальности врачей, которые проводили консультации. */
  doctorSpecialitiesIds?: string[] | null;

  /**
   * Количесто консультаций, проведённых данными специальностями.
   * @format int32
   */
  consultationsCount: number;
}

export enum ConsultationState {
  New = 'New',
  InProgress = 'InProgress',
  CanceledByClient = 'CanceledByClient',
  CanceledByOperator = 'CanceledByOperator',
  TransferredByClient = 'TransferredByClient',
  TransferredByOperator = 'TransferredByOperator',
  Completed = 'Completed',
}

export interface ConsultationStateArgs {
  status: ConsultationState;
}

export enum ConsultationType {
  Scheduled = 'Scheduled',
  Urgent = 'Urgent',
}

export interface CreateConclusionArgs {
  /** @format uuid */
  consultationId: string;

  /** @format uuid */
  fileId: string;
}

export interface CreateConsultationArgs {
  /**
   * Клиент, для которого необходимо создать консультацию.
   * Обязательный для ролей отличных от Client
   * @format uuid
   */
  clientId?: string | null;

  /** комментарий пользователя, который он оставляет при создании консультации */
  comment?: string | null;

  /**
   * специализация врача из нашего справочника врачей
   * @format uuid
   */
  doctorSpecialityId: string;

  /**
   * внутренний номер полиса. Не обязателен для разовых оплат
   * @format uuid
   */
  policyId?: string | null;

  /**
   * необязательный входной параметр - id подписки (для Budu)
   * @format uuid
   */
  subscriptionId?: string | null;

  /**
   * причина обращения. По умолчанию "Другое"
   * @format uuid
   */
  reasonId?: string | null;

  /**
   * Id слота из расписания врача
   * @format uuid
   */
  intervalId?: string | null;

  /**
   * Id оффера
   * @format uuid
   */
  offerId?: string | null;

  /** Источник консультации. */
  origin?: string | null;
}

export interface DeleteConclusionArgs {
  /** @format uuid */
  consultationId: string;
}

/**
 * Подробное инфо о консультации
 */
export interface DetailedConsultationDto {
  consultation?: ConsultationDto;

  /** Доктор из сервиса Doctor */
  doctor?: DoctorDto;
}

export interface DetailedConsultationDtoPagedData {
  data?: DetailedConsultationDto[] | null;

  /** @format int32 */
  totalCount: number;
}

/**
 * Доктор из сервиса Doctor
 */
export interface DoctorDto {
  /** @format uuid */
  doctorId: string;

  /** Client's phone number */
  phoneNumber?: string | null;

  /** First name */
  firstName?: string | null;

  /** Middle name */
  middleName?: string | null;

  /** Last name */
  lastName?: string | null;

  /** Short name. Example: ИвановИС (Иванов Иван Сергеевич) */
  shortName?: string | null;

  /**
   * Birthdate
   * @format date-time
   */
  birthdate?: string | null;

  /**
   * Avatar file Id
   * @format uuid
   */
  avatarId?: string | null;

  /** Образование */
  institution?: string | null;

  /** Курсы */
  course?: string | null;
}

export interface ErrorCodes {
  /** Полис принадлежит другому клиенту */
  PolicyOwnedAnotherClient?: string;

  /** Консультация не найдена */
  ConsultationNotFound?: string;

  /** Доступ к консультации запрещен */
  ConsultationAccessForbidden?: string;

  /** Полис не активен */
  PolicyNotActive?: string;

  /** Консультация может быть отклонена только из статуса "Новый" */
  StateNotNew?: string;

  /** Вы можете перенести консультацию только в статусе 'Новая' */
  TransferStateNotNew?: string;

  /** Причина обращения не найдена */
  ReasonNotFound?: string;

  /** Видеозапись уже прикреплена */
  VideoRecordAlreadyAttached?: string;

  /** Консультация для заданной комнаты не найдена */
  ConsultationByRoomIdNotFound?: string;

  /** Доктор не был назначен на эту консультацию */
  DoctorIsNull?: string;

  /** ClientId должен быть заполнен */
  ClientIdNull?: string;

  /** Время слота просрочено, выберите другой слот */
  IntervalExpired?: string;

  /** Действие Вашего полиса истекает: {0} */
  PolicyExpire?: string;

  /** Вы уже записаны к специалисту. Пожалуйста, ожидайте, когда врач с вами свяжется */
  ClientAlreadyHasCreatedConsultation?: string;

  /** По выбранной вами специальности не проводятся плановые консультации */
  ScheduledConsultationForDocSpecialityNotProvided?: string;

  /** По выбранной вами специальности не проводятся срочные консультации */
  UrgentConsultationForDocSpecialityNotProvided?: string;

  /** Видеозапись не прикреплена */
  VideoRecordDocumenNotAttached?: string;

  /** PolicyId должен быть заполнен */
  PolicyIdIsNull?: string;

  /** Невозможно перенести консультацию, до начала которой осталось менее 10 минут */
  TransferTime?: string;

  /** Невозможно перенести срочную консультацию */
  UrgentConsultationTransfer?: string;

  /** Слот занят */
  IntervalBusy?: string;

  /** Не найдены команды для обработки сообщения IssueStatusMessage */
  IssueStatusMessageCommandsNotFound?: string;

  /** Файлы консультации не найдены */
  ConsultationFilesNotFound?: string;

  /** Консультация не найдена по идентификатору консультации из файлов консультаций */
  ConsultationNotFoundFromConsultationFiles?: string;

  /** Следующие поля не валидны */
  FieldsIsNotValid?: string;

  /** Ошибка обращения к Firebase */
  FirebaseResponseError?: string;

  /** Восстановление срочных консультаций не поддерживается */
  UrgentConsultationRecoveryNotSupported?: string;

  /** Данная специальность недоступна в подписке */
  SpecialityForbiddenInSubscription?: string;

  /** Подписка не активна */
  SubscriptionNotActive?: string;

  /** Подписка не найдена */
  SubscriptionNotFound?: string;

  /** Интервью не найдено */
  InterviewNotFound?: string;

  /** Ошибка обработки ответа typeform */
  TypeformResponseError?: string;

  /** Специальность не найдена */
  SpecialityNotFound?: string;
}

export interface ErrorDetails {
  code?: string | null;
  description?: string | null;
  arguments?: Record<string, any>;
}

export interface ErrorResponse {
  error?: ErrorDetails;
}

export interface ExternalCreateConsultationArgs {
  /** @format uuid */
  clientId: string;
  policyNumber: string;

  /** комментарий пользователя, который он оставляет при создании консультации */
  comment?: string | null;

  /**
   * специализация врача из нашего справочника врачей
   * @format uuid
   */
  doctorSpecialityId: string;

  /**
   * внутренний номер полиса. Не обязателен для разовых оплат
   * @format uuid
   */
  policyId?: string | null;

  /**
   * необязательный входной параметр - id подписки (для Budu)
   * @format uuid
   */
  subscriptionId?: string | null;

  /**
   * причина обращения. По умолчанию "Другое"
   * @format uuid
   */
  reasonId?: string | null;

  /**
   * Id слота из расписания врача
   * @format uuid
   */
  intervalId?: string | null;

  /**
   * Id оффера
   * @format uuid
   */
  offerId?: string | null;

  /** Источник консультации. */
  origin?: string | null;
}

export interface FeedModel {
  PushActivityMessage?: {
    ClientId?: string;
    ActivityId?: string;
    Type?: string;
    Payload?: ConsultationDto;
    ActivityDateStart?: string;
    ActivityDateEnd?: string;
    ActivityDate?: string;
  };
}

export interface FileDto {
  /** Имя файла */
  fileName?: string | null;

  /** Путь до файла */
  relativeDirectoryPath?: string | null;
}

export interface GetFileLocationDto {
  /**
   * Id консультации.
   * @format uuid
   */
  consultationId: string;

  /**
   * Id доктора.
   * @format uuid
   */
  doctorId?: string | null;

  /**
   * Id комнаты.
   * @format uuid
   */
  roomId?: string | null;

  /** Имя файла консультации. */
  fileName?: string | null;

  /** Подкаталог консультации. */
  relativeDirectoryPath?: string | null;
}

export interface IntreviewAfterConsultationArgs {
  /** @format uuid */
  consultationId: string;
  consultationType: ConsultationType;
  activityType?: string | null;
  scenario: ConsultationScenario;
}

export interface MetaDocumentDto {
  /** @format uuid */
  documentId: string;

  /** @format uuid */
  fileId: string;
  fileName?: string | null;

  /** @format int64 */
  fileSize: number;
}

/**
 * Причина обращения
 */
export interface ReasonDto {
  /** @format uuid */
  reasonId: string;

  /** текст причины */
  description?: string | null;
}

export interface SetServiceCodeArgs {
  /** Код услуги. */
  serviceCode?: string | null;
}

export interface StartAudioArgs {
  /** @format uuid */
  consultationId: string;

  /** @format uuid */
  doctorId: string;

  /** @format uuid */
  roomId: string;
  clientPhone: string;
  doctorPhone: string;
}

/**
 * Специальность врача, доступная для телемедицины
 */
export interface TelemedSpecialityDto {
  /** специалист есть в списке для срочной записи */
  isUrgently: boolean;

  /** возможность в текущий момент создать заявку к специалисту */
  urgentActivity: boolean;

  /** специалист есть в списке для записи на дату */
  isDirectly: boolean;

  /** true, если есть свободные слоты для календарной консультации у любого врача данной специальности */
  directActivity: boolean;

  /**
   * Время начала работы специальности.
   * @format date-time
   */
  startWorkTime?: string | null;

  /**
   * Время конца работы специальности.
   * @format date-time
   */
  endWorkTime?: string | null;

  /** Признак - круглосуточность. */
  aroundTheClock: boolean;

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
}

export interface UpdateDoctorCommentArgs {
  /** комментарий доктора */
  doctorComment: string;
}
