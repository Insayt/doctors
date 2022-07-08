import { defineStore } from 'pinia';
import { getMessages } from '@/api/renchat';
import { formatDate } from '@/utils/date';
import { MessageDto } from '@/api/renchat/types/v2';

export default defineStore('chat', {
  state: () => ({
    userId: '',
    messages: [],
    blocksAnotherMessages: [],
    connection: null,
    connected: false,
    chats: {},
    typing: false,
    showRate: false,
    unreadCount: 0,
    suggests: [],
  }),
  actions: {
    async getMessages({
      chatId = '',
      Take = 20,
      Skip = '',
    }): Promise<MessageDto[]> {
      const messages = await getMessages({
        chatId,
        Take,
        Skip: Skip ? formatDate(new Date(Skip), 'backend') : undefined,
      });
      if (Skip && messages.length < 20) {
        return this.getMessages({ chatId, Take: 20 });
      }
      return messages;
    },
  },
});
