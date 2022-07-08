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

export interface ChangeUserDataArgs {
  /** @format uuid */
  chatId: string;
}

export interface ChatDto {
  /** @format uuid */
  chatId: string;
  owner?: ClientDto;
  clients?: ClientDto[] | null;
  type: ChatTypes;
  status: ChatStatus;

  /** @format date-time */
  lastRead?: string | null;

  /** @format int32 */
  messagesUnread: number;

  /** @format date-time */
  creationDate: string;
}

export enum ChatPagingDirection {
  Up = 'Up',
  Down = 'Down',
}

export enum ChatStatus {
  New = 'New',
  Open = 'Open',
  Closed = 'Closed',
}

export enum ChatTypes {
  None = 'None',
  Support = 'Support',
  Doctor = 'Doctor',
  TeleMed = 'TeleMed',
  Personal = 'Personal',
  Other = 'Other',
  ReimbursementOfExpenses = 'ReimbursementOfExpenses',
}

export interface ChatUnreadDto {
  /** @format uuid */
  chatId: string;

  /** @format uuid */
  ownerId: string;
  type: ChatTypes;
  status: ChatStatus;

  /** @format int32 */
  messagesUnread: number;

  /** @format date-time */
  lastRead?: string | null;

  /** @format date-time */
  creationDate: string;
}

export interface ClientDto {
  /** @format uuid */
  clientId: string;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;

  /** @format uuid */
  avatarId?: string | null;
  role?: string | null;

  /** @format date-time */
  birthDate?: string | null;

  /** @format date-time */
  creationDate: string;
  isOnline: boolean;
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

export interface ClientStatusDto {
  isOnline: boolean;

  /** @format date-time */
  lastTime?: string | null;
}

export interface ClientSystemDto {
  code?: string | null;
  name?: string | null;
  shortName?: string | null;
  active: boolean;
}

export interface CreateChatDataArgs {
  type: ChatTypes;
}

export interface ErrorCodes {
  /** Клиент {0} не найден. */
  ClientNotFound?: string;

  /** Чат {0} не найден. */
  ChatNotFound?: string;

  /** Клиент {0} не может послать сообщение в чат {1}. */
  ClientNotAllowedToPost?: string;

  /** Клиент {0} не может присоединиться к чату {1}. */
  ClientNotAllowedJoinChat?: string;

  /** Клиент {0} не может очистить чат {1}. */
  ClientNotAllowedClearChat?: string;

  /** Клиент {0} не имеет доступа к чату {1}. */
  ChatIsForbiddenToAccess?: string;

  /** Параметр {0} имеет некорректное значение. */
  InvalidArgument?: string;

  /** Сообщение {0} не найдено. */
  MessageNotFound?: string;

  /** Невозможно сменить оператора с {0} на {1}. */
  OperatorExchange?: string;

  /** Не найдены чаты для {0} клиента. */
  NoChatsFound?: string;

  /** Возникла непредвиденная ошибка при входе в чат {0} клиента {1}. */
  InvalidJoin?: string;

  /** Возникла непредвиденная ошибка при выходе из чата {0} клиентом {1}. */
  InvalidLeave?: string;

  /** Невозможно выполнить операцию по ключу {0} */
  ChatRedLock?: string;

  /** Не найдены команды для обработки сообщения IssueStatusMessage */
  IssueStatusMessageCommandsNotFound?: string;

  /** Пользователь уже общается с оператором {0} по задаче {1} */
  ChatIsBusy?: string;

  /** Не найдены issue оператора {0} в чате {1}. */
  IssueNotFound?: string;
}

export interface ErrorDetails {
  code?: string | null;
  description?: string | null;
  arguments?: Record<string, any>;
}

export interface ErrorResponse {
  error?: ErrorDetails;
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
  servicePriorities?: IssueServicePriority[] | null;
}

export enum IssueServicePriority {
  None = 'None',
  HighSpeedOfService = 'HighSpeedOfService',
}

export enum IssueStatus {
  New = 'New',
  InProgress = 'InProgress',
  WaitingResponse = 'WaitingResponse',
  Completed = 'Completed',
  Canceled = 'Canceled',
}

export interface MessageDto {
  /** @format uuid */
  messageId: string;

  /** @format uuid */
  chatId: string;
  client?: ClientDto;
  message?: string | null;
  data?: Record<string, any>;
  type: MessageTypes;

  /** @format date-time */
  updateDate?: string | null;

  /** @format date-time */
  creationDate: string;
  read: boolean;
  traceId?: string | null;
}

export enum MessageTypes {
  Text = 'Text',
  File = 'File',
  ChatReference = 'ChatReference',
  TelemedSettings = 'TelemedSettings',
  Suggests = 'Suggests',
  Dialogue = 'Dialogue',
  CreateIssueAnalyzes = 'CreateIssueAnalyzes',
}

export interface PatchChatDataArgs {
  status: ChatStatus;
}

export interface PostMessageDataArgs {
  /** @format uuid */
  chatId: string;
  message: string;
  data?: Record<string, any>;
  type: MessageTypes;
}

export interface PostServiceMessageDataArgsV2 {
  /** @format uuid */
  chatId: string;
  message: string;
  data?: Record<string, any>;
  type: MessageTypes;
}

export interface PostTransientMessageDataArgsV2 {
  /** @format uuid */
  chatId: string;
  data?: Record<string, any>;
  type: string;
  connectionIds?: string[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;

  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

export interface PushSuggestsData {
  connectionId?: string | null;
  suggests: TextSuggestData[];
}

export enum ReasonFlags {
  None = 'None',
  Transfer = 'Transfer',
  ChangeStatus = 'ChangeStatus',
  AutomaticAssign = 'AutomaticAssign',
  Force = 'Force',
  Escalate = 'Escalate',
}

export interface TextSuggestData {
  title: string;
  params: TextSuggestParams;
}

export interface TextSuggestParams {
  text?: string | null;
}
