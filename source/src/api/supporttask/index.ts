import http from '../index';
import { GetIssueDTO } from './types';
import { IssueDtoPagedData } from './types/v2';

const SUPPORTTASK_SERVICE_V2 = '/api/supporttask/v2';

export async function getTasks(
  params?: GetIssueDTO
): Promise<IssueDtoPagedData> {
  const { data } = await http.get(`${SUPPORTTASK_SERVICE_V2}/issue`, {
    params,
  });
  return data;
}
