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

export interface ActivityTypeDto {
  name?: string | null;

  /** @format date-time */
  creationDate: string;

  /** @format int32 */
  minScore: number;

  /** @format int32 */
  maxScore: number;
}

export interface AnswerArg {
  value: string;
  text: string;
}

export interface AnswerDto {
  value?: string | null;
  text?: string | null;
}

/**
 * Модель ответа на вопрос прикреплённого к интевью.
 */
export interface AnswerInterviewDto {
  /**
   * Идентификатор ответа.
   * @format int64
   */
  answerId: number;

  /** Текст ответа. */
  text?: string | null;

  /** Значение ответа. */
  value?: string | null;

  /**
   * Дата создания.
   * @format date-time
   */
  creationDate: string;
}

export interface ApproveArgs {
  /** Ответ на комментрарий пользователя */
  responseText?: string | null;
}

/**
 * Comment (Rate with filled comment text)
 */
export interface CommentDto {
  /**
   * ActivityId
   * @format uuid
   */
  activityId: string;

  /**
   * DoctorId
   * @format uuid
   */
  doctorId: string;

  /**
   * ClientId
   * @format uuid
   */
  clientId: string;

  /**
   * Rate value
   * @format int32
   */
  score: number;

  /** Rate comment */
  comment?: string | null;

  /**
   * Дата создания комментрария
   * @format date-time
   */
  creationDate: string;

  /** Activity type */
  activityType?: string | null;
  moderationStatus: ModerationStatus;

  /**
   * Doctor-admin who performed the moderation
   * @format uuid
   */
  moderatedBy?: string | null;

  /**
   * Date of moderation
   * @format date-time
   */
  moderationDate?: string | null;
}

export interface CommentDtoPagedData {
  data?: CommentDto[] | null;

  /** @format int32 */
  totalCount: number;
}

export interface CreateActivityTypeArgs {
  name: string;

  /** @format int32 */
  minScore?: number | null;

  /** @format int32 */
  maxScore?: number | null;
}

/**
 * Модель для создания оценщика.
 */
export interface CreateInterviewerArgs {
  /**
   * Идентификатор доктора.
   * @format uuid
   */
  doctorId: string;

  /** Тип формы интервью, которая используется для пользователя. */
  code: string;

  /** Имя врача. */
  firstName: string;

  /** Отчество врача. */
  middleName: string;

  /** Фамилия врача. */
  lastName: string;

  /**
   * Идетификатор специальности.
   * @format uuid
   */
  specialityId: string;

  /** Название специальности. */
  specialityName: string;
}

export interface CreateRateArgs {
  /**
   * Rate value
   * @format int32
   */
  score?: number | null;

  /**
   * Quality value. Оценка качества связи.
   * @format int32
   */
  quality?: number | null;

  /** Rate comment */
  comment?: string | null;

  /** Activity type name */
  activityType: string;
  questions?: RateAnswerArg[] | null;
}

/**
 * Doctor's comments count (not moderated)
 */
export interface DoctorCommentsDto {
  /**
   * Doctor id
   * @format uuid
   */
  doctorId: string;

  /** Doctor's first name */
  firstName?: string | null;

  /** Doctor's middle name */
  middleName?: string | null;

  /** Doctor's last name */
  lastName?: string | null;

  /**
   * Doctor's not moderated comments count
   * @format int32
   */
  notModeratedCommentsCount: number;

  /**
   * Doctor's avatar id
   * @format uuid
   */
  avatarId?: string | null;
}

export interface ErrorCodes {
  /** Оценка не найдена. */
  RateNotFound?: string;

  /** Оценка должна быть от {0} до {1}. */
  RateIsOutOfRange?: string;

  /** Оценка качества связи должна быть от {0} до {1}. */
  QualityIsOutOfRange?: string;

  /** Тип события {0} уже существует. */
  ActivityTypeAlreadyExists?: string;

  /** Тип события {0} не найден. */
  ActivityTypeNotFound?: string;

  /** Комментарий не связан с врачом */
  CommentWithoutDoctor?: string;

  /** Форма опроса {0} не найдена */
  FormInterviewNotFound?: string;

  /** Ответы вопроса не соотвествуют типу */
  AnswersNotValidInQuestion?: string;

  /** Вопрос не найден */
  QuestionNotFound?: string;

  /** Оценщик {0} не найден. */
  InterviewerNotFound?: string;

  /** Оценщик уже добавлен. */
  InterviewerAlreadyAdded?: string;

  /** Невозможно изменить статус оценки консультации на значение "В очереди". */
  InterviewNewStatusNotCorrect?: string;

  /** Оценка консультации {0} не найдена. */
  InterviewNotFound?: string;

  /** Оценка консультации {0} уже проведена. */
  InterviewAlreadyCompleted?: string;

  /** Не найден шаблон ключа маршрутизации для сообщения с типом '{0}' */
  MassTransitRoutingKeyTemplateNotFound?: string;

  /** Тип активности {0} не поддерживается */
  UnsupportedActivityType?: string;

  /** Оценщик с DoctorId {0} не найден. */
  InterviewerByDoctorIdNotFound?: string;
}

export interface ErrorDetails {
  code?: string | null;
  description?: string | null;
  arguments?: Record<string, any>;
}

export interface ErrorResponse {
  error?: ErrorDetails;
}

export interface FormInterviewArgs {
  name: string;
  code: string;
  ownerEmail?: string | null;
}

export interface FormInterviewDto {
  name?: string | null;
  code?: string | null;
  ownerEmail?: string | null;
}

/**
 * ДТО интервью.
 */
export interface InterviewDto {
  /**
   * Идентификатор интервью.
   * @format uuid
   */
  interviewId: string;

  /**
   * Идентификатор клиента.
   * @format uuid
   */
  clientId: string;

  /**
   * Идентификатор оцениваемого действия.
   * @format uuid
   */
  activityId: string;

  /**
   * Идентификатор типа оцениваемого действия.
   * @format int64
   */
  activityTypeId: number;

  /** Название типа оцениваемого действия. */
  activityType?: string | null;

  /**
   * Дата создания.
   * @format date-time
   */
  creationDate: string;

  /** Имя интервьюируемого. */
  intervieweeFirstName?: string | null;

  /** Отчество интервьюируемого. */
  intervieweeMiddleName?: string | null;

  /** Фамилия интервьюируемого. */
  intervieweeLastName?: string | null;

  /** Специальность интервьюируемого (для врачей). */
  intervieweeSpecialityName?: string | null;
  status: InterviewStatus;

  /** Комментарий. */
  comment?: string | null;
}

export interface InterviewDtoPagedData {
  data?: InterviewDto[] | null;

  /** @format int32 */
  totalCount: number;
}

/**
 * ДТО оценщика.
 */
export interface InterviewerDto {
  /**
   * Идентификатор оценщика.
   * @format uuid
   */
  interviewerId: string;

  /**
   * Идентификатор доктора.
   * @format uuid
   */
  doctorId: string;

  /** Тип формы интервью, которая используется для пользователя. */
  code?: string | null;

  /** Имя врача. */
  firstName?: string | null;

  /** Отчество врача. */
  middleName?: string | null;

  /** Фамилия врача. */
  lastName?: string | null;

  /**
   * Идетификатор специальности.
   * @format uuid
   */
  specialityId: string;

  /** Название специальности. */
  specialityName?: string | null;
}

/**
 * ДТО конкретного вопроса для интервью.
 */
export interface InterviewQuestionAnswerDto {
  /**
   * Идентификатор интервью.
   * @format uuid
   */
  interviewId: string;

  /**
   * Дата создания.
   * @format date-time
   */
  creationDate: string;

  /** Значение ответа на вопрос. */
  value?: string[] | null;

  /** ДТО вопроса прикреплённого к интервью. */
  question?: QuestionInterviewDto;

  /** Список возможных ответов на вопрос. */
  answerDtos?: AnswerInterviewDto[] | null;
}

export enum InterviewStatus {
  New = 'New',
  Completed = 'Completed',
}

export enum ModerationStatus {
  NotModerated = 'NotModerated',
  Approved = 'Approved',
  Declined = 'Declined',
}

/**
 * Модель для обновления значения ответа на вопрос.
 */
export interface PatchQuestionAnswerArgs {
  /**
   * Идентификатор вопроса.
   * @format uuid
   */
  questionId: string;

  /** Значение ответа на вопрос. */
  value?: string[] | null;
}

export interface QuestionArgs {
  text: string;
  type: QuestionType;
  formCode: string;

  /** @format int32 */
  order: number;
  isMailing: boolean;
  options?: AnswerArg[] | null;
}

export interface QuestionDto {
  /** @format uuid */
  questionId: string;
  text?: string | null;
  type: QuestionType;
  formCode?: string | null;

  /** @format int32 */
  order: number;
  isMailing: boolean;
  options?: AnswerDto[] | null;
}

/**
 * ДТО вопроса прикреплённого к интервью.
 */
export interface QuestionInterviewDto {
  /**
   * Идентификатор вопроса.
   * @format uuid
   */
  questionId: string;

  /**
   * Идентификатор формы интервью.
   * @format int64
   */
  formId?: number | null;

  /** Текст вопроса. */
  text?: string | null;
  questionType: QuestionType;

  /**
   * Порядок следования вопроса.
   * @format int32
   */
  order: number;

  /**
   * Дата создания.
   * @format date-time
   */
  creationDate: string;

  /** Группа. */
  group?: string | null;

  /** Дополнительный текст в вопросе. */
  additionalText?: string | null;
}

export enum QuestionType {
  Single = 'Single',
  Text = 'Text',
  Multiple = 'Multiple',
}

export interface RateAnswerArg {
  /** @format uuid */
  id: string;
  value?: string | null;
}

/**
 * Rate
 */
export interface RateDto {
  /**
   * ActivityId
   * @format uuid
   */
  activityId: string;

  /**
   * ClientId
   * @format uuid
   */
  clientId: string;

  /**
   * Rate value
   * @format int32
   */
  score: number;

  /** Rate comment */
  comment?: string | null;

  /**
   * Date of rating creation
   * @format date-time
   */
  creationDate: string;

  /** Activity type */
  activityType?: string | null;

  /** Rate update history */
  history?: RateHistoryDto[] | null;

  /** Visible Review Form */
  visibleReview: boolean;
}

export interface RateHistoryDto {
  /**
   * Rate value
   * @format int32
   */
  score: number;

  /** Rate comment */
  comment?: string | null;

  /**
   * Date of rating creation
   * @format date-time
   */
  creationDate: string;
}

export interface UpdateInterviewStatusArgs {
  newStatus: InterviewStatus;
  comment?: string | null;
}
