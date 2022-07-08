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

export interface CategoryDto {
  name?: string | null;
  description?: string | null;
  types?: string[] | null;
}

export interface PutCategoryDataArgs {
  categoryName: string;
  description: string;
}

export interface ClientSystemDto {
  /** Код системы (Budu, RenHealth, RenLife) */
  code?: string | null;

  /** Полное наименование (Ренессанс здоровье) */
  name?: string | null;

  /** Короткое наименование (РЗ) */
  shortName?: string | null;
  active: boolean;
}

export interface CreateCommentArgs {
  body: string;
}

export enum OperatorStatus {
  Offline = 'Offline',
  Ready = 'Ready',
  Busy = 'Busy',
}

export interface OperatorTagDto {
  tagName?: string | null;
}

export interface OperatorQueueDto {
  queueName?: string | null;
}

export interface OperatorDto {
  /** @format uuid */
  operatorId: string;
  operatorStatus: OperatorStatus;

  /** @format date-time */
  updateDate: string;
  tags?: OperatorTagDto[] | null;
  queues?: OperatorQueueDto[] | null;
  fullName?: string | null;

  /** Email */
  email?: string | null;

  /**
   * Id отдела в котором работает сорудник
   * @format uuid
   */
  departmentId?: string | null;

  /** Номер телефона */
  phoneNumber?: string | null;
}

export interface CommentDto {
  /** @format uuid */
  commentId: string;
  issueNumber?: string | null;

  /** @format date-time */
  creationDate: string;

  /** @format date-time */
  updateDate: string;
  body?: string | null;
  owner?: OperatorDto;
}

export interface UpdateCommentArgs {
  body: string;
}

export enum IssueOrder {
  OrderByUpdateDate = 'OrderByUpdateDate',
  OrderByIdentity = 'OrderByIdentity',
}

export enum IssueStatus {
  New = 'New',
  InProgress = 'InProgress',
  WaitingResponse = 'WaitingResponse',
  Completed = 'Completed',
  Canceled = 'Canceled',
  WaitingResponseFromClient = 'WaitingResponseFromClient',
  ClientContact = 'ClientContact',
  Record = 'Record',
  PaymentUrlSending = 'PaymentUrlSending',
  PaymentStatusChecking = 'PaymentStatusChecking',
  GuaranteeLetterSending = 'GuaranteeLetterSending',
  FollowUp = 'FollowUp',
  AgreementInsuranceCompany = 'AgreementInsuranceCompany',
}

export enum ReasonFlags {
  None = 'None',
  Transfer = 'Transfer',
  ChangeStatus = 'ChangeStatus',
  AutomaticAssign = 'AutomaticAssign',
  Force = 'Force',
  Escalate = 'Escalate',
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

  /** Флаги-причины изменения статуса задачи */
  reasonFlags?: ReasonFlags[] | null;
}

/**
 * Информация о клиенте
 */
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

export enum IssueServicePriority {
  None = 'None',
  HighSpeedOfService = 'HighSpeedOfService',
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
  data?: Record<string, object>;
  queueName?: string | null;

  /**
   * Время взятия задачи в работу
   * @format date-time
   */
  inProgressDate?: string | null;

  /**
   * Время выполнения задачи
   * @format time-span
   */
  issueInProgressTime: string;

  /**
   * Дата завершения времени выполнения задачи
   * @format date-time
   */
  expirationDate?: string | null;

  /**
   * Оставшееся время до завершения задачи
   * @format time-span
   */
  timeLeft?: string | null;

  /** Флаги-причины изменения статуса задачи */
  reasonFlags?: ReasonFlags[] | null;

  /** Метакатегория */
  metaCategory?: string | null;
  clientSystem?: ClientSystemDto;

  /** Информация о клиенте */
  clientProfile?: ClientProfileDto;

  /**
   * Id оператора, создавшего задачу.
   * @format uuid
   */
  creatorId?: string | null;
  servicePriorities?: IssueServicePriority[] | null;

  /**
   * Дата и время напоминания
   * @format date-time
   */
  notificationDateTime?: string | null;
}

export interface IssueDtoPagedData {
  data?: IssueDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export interface CreateIssueArgs {
  comment: string;

  /** @format uuid */
  externalId: string;
  supportType: string;
  metaCategory?: string | null;
  data?: Record<string, object>;
  queueTypeName?: string | null;

  /** Клиентское приложение (Budu, RenHealth) */
  clientSystemCode?: string | null;

  /** @format uuid */
  creatorId?: string | null;

  /**
   * Срок выполнения задачи. Игнорируется, если в очереди задан TimeLimit
   * @format date-time
   */
  expirationDate?: string | null;
}

export interface UpdateCategoryDataArgs {
  issueNumber: string;
  categoryName: string;
}

export interface ChangeStatusArgs {
  status: IssueStatus;
  reason?: string | null;
  force: boolean;
}

export interface SetOperatorArgs {
  reason?: string | null;
  force: boolean;
}

export interface IssuesCountByStatusByQueueDto {
  queueName?: string | null;

  /** Описание типа очереди. */
  description?: string | null;

  /** Количества заявок сгруппированные по статусам задач. */
  count?: {
    New?: number;
    InProgress?: number;
    WaitingResponse?: number;
    Completed?: number;
    Canceled?: number;
    WaitingResponseFromClient?: number;
    ClientContact?: number;
    Record?: number;
    PaymentUrlSending?: number;
    PaymentStatusChecking?: number;
    GuaranteeLetterSending?: number;
    FollowUp?: number;
    AgreementInsuranceCompany?: number;
  };
}

/**
 * Данные добавления уведомления для задачи.
 */
export interface AddNotificationDateTimeToIssueArgs {
  /** Номер задачи. */
  number: string;

  /**
   * Дата и время уведомления.
   * @format date-time
   */
  notificationDateTime: string;
}

export interface OperatorIdDto {
  /** @format uuid */
  operatorId: string;
}

export interface AddOperatorTagArgs {
  tagName: string;
}

export interface AddOperatorQueueArgs {
  queueName: string;
}

export enum QueueSorting {
  IssueCreationDateAsc = 'IssueCreationDateAsc',
  IssueCreationDateDesc = 'IssueCreationDateDesc',
  IdAsc = 'IdAsc',
  IdDesc = 'IdDesc',
}

export interface QueueDto {
  queueName?: string | null;
  issueNumber?: string | null;
  description?: string | null;

  /** @format date-time */
  issueCreationDate: string;

  /** Помещена ли задача в очередь повторно */
  isReturn: boolean;

  /** Была ли задача уже в этой очереди */
  isRequeue: boolean;
  issueStatus: IssueStatus;

  /** @format uuid */
  ownerId: string;
  clientSystem?: ClientSystemDto;
  servicePriorities?: IssueServicePriority[] | null;
}

export interface QueueDtoPagedData {
  data?: QueueDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export interface QueueMoveToArgs {
  queueName: string;
  issueNumber: string;
}

export interface IssuePositionDto {
  /** Имя очереди */
  queueName?: string | null;

  /**
   * Всего заявок в очереди
   * @format int32
   */
  totalCount: number;

  /**
   * Позиция заявки в очереди
   * @format int32
   */
  position: number;
}

export interface QueueTypeDto {
  queueName?: string | null;
  description?: string | null;

  /**
   * Лимит времени на исполнение задачи этого типа (формат: ЧЧ:ММ:СС)
   * (Учитывается только рабочее время)
   * @format time-span
   */
  timeLimit?: string | null;

  /**
   * Лимит времени на перевод задачи в работу (формат: ЧЧ:ММ:СС)
   * (Учитывается только рабочее время)
   * @format time-span
   */
  timeLimitOnBegin?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimit */
  queueEscalation?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimitOnBegin */
  queueOnBegin?: string | null;

  /** Родитель очереди */
  parentQueue?: string | null;

  /**
   * Ответственный за очередь
   * @format uuid
   */
  headId?: string | null;

  /**
   * Время начала рабочего дня с 0:00 для операторов,
   * работающих над заявками этого типа
   * @format time-span
   */
  workHoursStart: string;

  /**
   * Время конца рабочего дня с 0:00 для операторов,
   * работающих над заявками этого типа
   * @format time-span
   */
  workHoursEnd: string;

  /** Работают ли операторы в субботу и воскресенье */
  haveWeekends: boolean;

  /** Список допустимых перемещений */
  transitions?: string[] | null;
}

export interface AddQueueNameArgs {
  /** Queue name append to operator */
  queueName: string;

  /** Queue description */
  description: string;

  /**
   * Time limit for resove task in queue
   * @format time-span
   */
  timeLimit?: string | null;

  /**
   * Лимит времени на перевод задачи в работу (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimitOnBegin?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimit */
  queueEscalation?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimitOnBegin */
  queueOnBegin?: string | null;

  /** Указывем родителя для данной очереди */
  parentQueue?: string | null;
}

export interface PatchQueueTypeArgs {
  description?: string | null;

  /**
   * Лимит времени на исполнение задачи этого типа (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimit?: string | null;

  /**
   * Лимит времени на перевод задачи в работу (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimitOnBegin?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimit */
  queueEscalation?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimitOnBegin */
  queueOnBegin?: string | null;
}

export interface PutQueueTypeArgs {
  description?: string | null;

  /**
   * Лимит времени на исполнение задачи этого типа (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimit?: string | null;

  /**
   * Лимит времени на перевод задачи в работу (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimitOnBegin?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimit */
  queueEscalation?: string | null;

  /** Имя очереди, куда перемещается заявка по истечении времени TimeLimitOnBegin */
  queueOnBegin?: string | null;
}

/**
 * Tag args
 */
export interface CreateTagArgs {
  name: string;
  description: string;
}

export interface TagDto {
  name?: string | null;
  description?: string | null;

  /**
   * Лимит времени на исполнение задачи этого типа
   * @format time-span
   */
  timeLimit?: string | null;
}

export interface PutTagArgs {
  name: string;
  description: string;

  /**
   * Лимит времени на исполнение задачи этого типа (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimit?: string | null;
}

export interface PatchTagArgs {
  name: string;
  description?: string | null;

  /**
   * Лимит времени на исполнение задачи этого типа (формат: ЧЧ:ММ:СС)
   * @format time-span
   */
  timeLimit?: string | null;
}

export interface ErrorCodes {
  /** Тип {0} не существует */
  SupportTypeNotExist?: string;

  /** Неверный формат номера {0} */
  WrongNumberFormat?: string;

  /** Изменение статуса с {0} на {1} невозможно */
  ChangeStatusNotAllowed?: string;

  /** Заявка с номером {0} не найдена */
  IssueNotFound?: string;

  /** Заявка обработана другим оператором */
  IssueOwnerIsDifferent?: string;

  /** Оператор {0} не найден */
  OperatorNotFound?: string;

  /** Неверный формат кода {0} */
  WrongSupportCodeFormat?: string;

  /** У оператора есть открытая заявка {0} */
  OperatorHaveOpenIssue?: string;

  /** Изменение статуса с {0} на {1} невозможно */
  OperatorChangeStatusNotAllowed?: string;

  /** Комментарий не найден */
  CommentNotFound?: string;

  /** Тип очереди {0} уже существует */
  QueueTypeAlreadyExist?: string;

  /** Тип очереди {0} не существует */
  QueueTypeNotExist?: string;

  /** Заявка с номером {0} отсутствует в очереди */
  IssueNotInQueue?: string;

  /** Тип очереди для эскалации {0} не может совпадать с основным */
  WrongQueueTypeForEscalation?: string;

  /** Категория {0} не найдена */
  CategoryNotFound?: string;

  /** Клиентская система {0} не найдена */
  ClientSystemNotFound?: string;

  /** Не найден шаблон ключа маршрутизации для сообщения с типом '{0}' */
  MassTransitRoutingKeyTemplateNotFound?: string;

  /** Неверно указан диапазон дат */
  WrongDateRange?: string;

  /** Уведомление для заявки {0} уже существует */
  NotificationAlreadyExist?: string;

  /** Аккаунт не найден */
  AccountNotFound?: string;

  /** Ошибка обращения к Firebase */
  FirebaseResponseError?: string;
}
