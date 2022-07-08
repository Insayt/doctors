import { UUID } from '@/types';

export type GetMessagesRequestDto = {
  chatId?: UUID;
  Skip?: string;
  Take?: number;
  Direction?: string;
};
