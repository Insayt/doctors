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

export enum ReadFileAccessMode {
  Private = 'Private',
  ApplicationOperators = 'ApplicationOperators',
  ApplicationsPmoUsers = 'ApplicationsPmoUsers',
  ApplicationUsers = 'ApplicationUsers',
  Public = 'Public',
}

export enum WriteFileAccessMode {
  Private = 'Private',
  ApplicationOperators = 'ApplicationOperators',
  ReadOnly = 'ReadOnly',
}

export enum StorageType {
  Local = 'Local',
  Direct = 'Direct',
}

/**
 * File information
 */
export interface RenFileData {
  /**
   * Id
   * @format uuid
   */
  fileId: string;

  /** File name */
  fileName?: string | null;

  /** Content type */
  contentType?: string | null;

  /**
   * Upload date
   * @format date-time
   */
  uploadDate: string;
  readAccessMode: ReadFileAccessMode;
  writeAccessMode: WriteFileAccessMode;

  /**
   * Owner Id
   * @format uuid
   */
  ownerId: string;

  /** Owner role */
  ownerRole?: string | null;

  /** Is file an image */
  isPicture: boolean;

  /** All available scales of preview */
  previewsScales?: number[] | null;
  sharedTo?: string[] | null;

  /**
   * Размер файла (в байтах)
   * @format int64
   */
  fileSize: number;
  storageType: StorageType;

  /** Относительный путь к папке */
  storageDirectoryPath?: string | null;

  /** Относительное имя файла */
  storageFileName?: string | null;
}

export interface PatchAccessFileData {
  readAccessMode?: ReadFileAccessMode;
  writeAccessMode?: WriteFileAccessMode;
}

export interface UpdateFilesSizeResult {
  /**
   * Всего обнаружено файлов с 0 размером
   * @format int64
   */
  totalFilesCount: number;

  /**
   * Количество файлов, размер которых был успешно обновлен
   * @format int64
   */
  succeededFilesUpdates: number;
}

export interface ShareFileData {
  /**
   * FileId.
   * @format uuid
   */
  fileId: string;

  /**
   * ClientId who can access the file.
   * @format uuid
   */
  shareToId: string;
}

export interface TrustedOwner {
  /** @format uuid */
  userId: string;

  /** @format int32 */
  allowedSizeMb: number;
}

export interface ErrorCodes {
  /** Файл {0} уже существует. */
  FileAlreadyExist?: string;

  /** Файл {0} не найден. */
  FileNotFound?: string;

  /** У пользователя {0} нет прав на чтение файла {1}. */
  FileReadAccessDenied?: string;

  /** У пользователя {0} нет прав на запись файла {1}. */
  FileWriteAccessDenied?: string;

  /** Превышено допустимое количество загруженных файлов в {0} шт. */
  UploadedFilesCountExceeded?: string;

  /** Не найден загружаемый файл. */
  FileFormEmptyException?: string;

  /** Недопустимое расширение файла. */
  WrongFileExtension?: string;

  /** Файл по пути {0} не найден. */
  FileByPathNotFound?: string;

  /** Недопустимый контент файла */
  WrongFileContent?: string;

  /** Используйте для документов форматы Docx или Xlsx */
  DocOldFormat?: string;

  /** Максимальный допустимый размер хранилища {0} Мб. Пожалуйста освободите место. Недостаточно места для файла размером в {1} Мб */
  MaximumAllowableStorageSize?: string;

  /** Доверенный пользователь уже существует */
  TrustedOwnerAlreadyExists?: string;

  /** Укажите значение больше 1 */
  TrustedOwnerStorageSize?: string;

  /** У пользователя {0} нет прав на чтение. */
  TrustedOwnerReadAccessDenied?: string;

  /** У пользователя {0} нет прав на запись. */
  TrustedOwnerWriteAccessDenied?: string;
}
