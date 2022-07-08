import { IssueStatus } from './v2';

export enum QueueNameEnum {
  DOCADD_TELEMED = 'DOCADD.TELEMED',
}

export type GetIssueDTO = {
  active?: boolean;
  filterByTags?: boolean;
  filterByQueues?: boolean;
  orderBy?: 'OrderByUpdateDate' | 'OrderByIdentity';
  onlyMy?: boolean;
  status?: IssueStatus[];
  ownerId?: string;
  phoneNumber?: string;
  queueName?: string[];
  clientSystemCode?: string;
  doctors?: string[];
  client?: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  creationDateStart?: string;
  creationDateEnd?: string;
  page?: number;
  count?: number;
};
