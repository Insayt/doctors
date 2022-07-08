import { defineStore } from 'pinia';
import { getSMSCode, confirmSMSCode, refreshAuth, logout } from '@/api/auth';
import router from '@/router';
import http from '@/api';
import { ConfirmSMSCodeRequestDTO } from '@/api/auth/types';
import { ReturnAsyncType } from '@/types';
type AuthResult = ReturnAsyncType<typeof refreshAuth>;
type AuthState = {
  hasAuth: boolean;
} & AuthResult;

export default defineStore('auth', {
  state: (): AuthState => ({
    hasAuth: false,
    accessExpireTime: '',
    accessToken: null,
    refreshExpireTime: '',
    refreshToken: null,
    userId: '',
  }),
  actions: {
    async getSMSCode(rawLogin: string) {
      return getSMSCode(rawLogin);
    },
    setAuth(data: AuthResult) {
      this.hasAuth = true;
      this.accessExpireTime = data.accessExpireTime;
      this.accessToken = data.accessToken;
      this.refreshExpireTime = data.refreshExpireTime;
      this.refreshToken = data.refreshToken;
      this.userId = data.userId;
      window.localStorage.setItem(
        'AUTH_DATA',
        JSON.stringify({
          refreshToken: data.refreshToken,
          refreshExpireTime: data.refreshExpireTime,
        })
      );
      http.defaults.headers.common = {
        Authorization: `Bearer ${this.accessToken}`,
      };
    },
    async logout() {
      localStorage.removeItem('AUTH_DATA');
      await logout();
      this.hasAuth = false;
      this.accessExpireTime = '';
      this.accessToken = null;
      this.refreshExpireTime = '';
      this.refreshToken = null;
      this.userId = '';
      await router.replace('/login');
      window.location.reload();
    },
    async refreshAuth() {
      const authData = localStorage.getItem('AUTH_DATA');
      if (!authData) {
        return this.logout();
      }
      const res = await refreshAuth(JSON.parse(authData).refreshToken);
      this.setAuth(res);
    },
    async login({
      confirmationCode,
      confirmationToken,
    }: ConfirmSMSCodeRequestDTO) {
      const res = await confirmSMSCode({
        confirmationToken,
        confirmationCode,
      });
      this.setAuth(res);
    },
  },
});
