<template>
  <div class="auth-form">
    <img class="auth-form__logo" src="/img/budu-logo.svg" />
    <form @submit.prevent="">
      <template v-if="isLoginMode">
        <b-input
          v-model="form.login"
          :error="errors.login"
          size="l"
          placeholder="Логин"
          autofocus
        ></b-input>
        <b-btn
          :disabled="!form.login"
          :loading="isLoading"
          class="auth-form__btn"
          block
          size="m"
          @click="submitLogin"
        >
          Войти
        </b-btn>
      </template>
      <template v-if="!isLoginMode">
        <b-input
          v-model="form.code"
          ref="smsInput"
          :error="errors.code"
          size="l"
          placeholder="Код из СМС"
          maxlength="4"
          autofocus
        ></b-input>
        <div class="auth-form-sms">
          <div class="auth-form-sms__login">
            Код отправлен на номер
            <div>{{ maskedPhoneNumber }}</div>
          </div>
          <div v-show="isSmsBtnDisabled" class="auth-form-sms__counter">
            {{ counter }} секунд до повторной отправки
          </div>
          <div v-show="!isSmsBtnDisabled" class="auth-form-sms__counter">
            Код можно отправить повторно
          </div>
        </div>
        <b-btn
          :disabled="isSmsBtnDisabled"
          class="auth-form__btn"
          block
          size="m"
          type="uncolored"
          @click="submitLogin"
        >
          Отправить повторно
        </b-btn>
        <b-btn
          class="auth-form__btn"
          type="outline"
          block
          size="m"
          @click="backToLogin"
        >
          Другой логин
        </b-btn>
      </template>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import useAuthStore from '@/store/auth';
import useAccountStore from '@/store/account';
import { BBtn, BInput } from '@/ui';

@Options({
  components: {
    BBtn,
    BInput,
  },
})
export default class Auth extends Vue {
  authStore = useAuthStore();
  accountStore = useAccountStore();
  isLoading = false;
  isLoginMode = true;
  maskedPhoneNumber = '';
  smsAttempts = 0;
  confirmationToken = '';
  counter = 30;
  timeInterval = 0;
  form = {
    login: '',
    code: '',
  };
  errors = {
    login: '',
    code: '',
  };

  get isSmsBtnDisabled(): boolean {
    return this.counter > 0;
  }

  @Watch('form.code')
  async submitCode() {
    this.isLoading = true;
    this.resetErrors();
    if (this.form.code.length < 4) return;
    try {
      await this.authStore.login({
        confirmationCode: this.form.code,
        confirmationToken: this.confirmationToken,
      });
      await this.accountStore.getPersonalData();
      if (this.accountStore.isAdmin) {
        await this.$router.push({ name: 'doc-admin' });
      } else {
        await this.$router.push({ name: 'op-doc' });
      }
    } catch (e: any) {
      this.errors.code = e.response.data?.error.description;
    } finally {
      this.isLoading = false;
    }
  }

  async submitLogin() {
    this.isLoading = true;
    this.resetErrors();
    try {
      const res = await this.authStore.getSMSCode(this.form.login);
      this.maskedPhoneNumber = res.maskedPhoneNumber || '';
      this.smsAttempts = res.smsAttempts;
      this.confirmationToken = res.confirmationToken || '';
      this.countSeconds();
      this.isLoginMode = false;
      this.$nextTick(() => {
        this.$refs.smsInput.$refs.BInput.focus();
      });
    } catch (e: any) {
      if (e.response.data?.error.code === 'InvalidPhoneNumber') {
        this.errors.login =
          'В профиле не задан номер телефона для отправки СМС';
      } else if (e.response.data?.error.code === 'UserNotFound') {
        this.errors.login = `Пользователь ${this.form.login} не найден`;
      } else {
        this.errors.login = e.response.data?.error.description;
      }
    } finally {
      this.isLoading = false;
    }
  }

  backToLogin() {
    this.isLoginMode = true;
    this.form.login = '';
    this.form.code = '';
  }

  resetErrors() {
    this.errors = {
      login: '',
      code: '',
    };
  }

  resetCounter() {
    window.clearInterval(this.timeInterval);
    this.counter = 30;
  }

  countSeconds() {
    if (this.timeInterval) {
      this.resetCounter();
    }
    this.timeInterval = window.setInterval(() => {
      this.counter--;
      if (this.counter <= 0) {
        window.clearInterval(this.timeInterval);
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  max-width: 300px;
  margin: 50px auto 0;
  box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
  background: #ffffff;
  border-radius: 8px;
  padding: 40px 24px 24px 24px;

  &__logo {
    width: 122px;
    margin-bottom: 36px;
  }

  &__btn {
    margin-top: 15px;
  }
}

.auth-form-sms {
  position: relative;
  font-size: 13px;
  line-height: 24px;
  margin-top: 25px;

  &__counter {
    color: rgba(60, 60, 67, 0.6);
    font-size: 11px;
    margin-top: 8px;
  }
}
</style>
