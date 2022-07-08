import http from '../index';
import { GetMessagesRequestDto } from './types/index';
import { MessageDto } from './types/v2';

const USERCHAT_SERVICE_V2 = '/api/renchat/v2';

export async function getMessages({
  chatId,
  Take,
  Skip,
}: GetMessagesRequestDto): Promise<MessageDto[]> {
  const params: GetMessagesRequestDto = {};
  Skip ? (params.Skip = Skip) : (params.Take = Take);
  // if skip get all messages from date, or take counted from end
  const { data } = await http.get(`${USERCHAT_SERVICE_V2}/messages/${chatId}`, {
    params,
  });
  return data;
}
