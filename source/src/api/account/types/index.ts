import { AccountSortType } from '@/api/account/types/v2';

export type GetAllUsersRequestDTO = {
  PhoneNumber?: string;
  LastName?: string;
  FirstName?: string;
  MiddleName?: string;
  Roles?: string[];
  IsActive?: boolean;
  Login?: string;
  DepartmentId?: string;
  SortType?: AccountSortType;
  Page?: number;
  Count?: number;
};
