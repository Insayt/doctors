<template>
  <header class="docHeader">
    <div class="docHeader__col">
      <img class="docHeader__logo" src="/img/budu-logo.svg" />
      <router-link
        v-if="!isAdmin && !isRater"
        class="docHeader__link"
        :to="{ name: 'op-doc' }"
      >
        Приемная
      </router-link>
      <router-link
        v-if="isAdmin && !isRater"
        class="docHeader__link"
        :to="{ name: 'doc-admin' }"
      >
        Мониторинг
      </router-link>
      <router-link class="docHeader__link" :to="{ name: 'doc-calendar' }">
        Календарь
      </router-link>
      <router-link
        v-if="isAdmin && !isRater"
        class="docHeader__link"
        :to="{ name: 'doc-specialties' }"
      >
        Управление специальностями
      </router-link>
      <router-link
        v-if="claims.claims && !claims.claims.isOutsource"
        class="docHeader__link"
        :to="{ name: 'doc-consultations' }"
      >
        История консультаций
      </router-link>
      <router-link
        v-if="claims.claims && !claims.claims.isOutsource"
        class="docHeader__link"
        :to="{ name: 'rating-questions' }"
      >
        Оценка консультаций
      </router-link>
      <router-link
        v-if="isAdmin && !isRater"
        class="docHeader__link"
        :to="{ name: 'doc-edit' }"
      >
        Врачи
      </router-link>
      <router-link
        v-if="isAdmin && !isRater"
        class="docHeader__link"
        :to="{ name: 'doc-moderator' }"
      >
        Модерация отзывов
      </router-link>
    </div>

    <div class="docHeader__col">
      <user-avatar :avatar-id="avatarId" />
      <b-dropdown :label="accountStore.userName" button-type="uncolored">
        <b-dropdown-item>
          <div class="docHeader__item" @click="isProfileVisible = true">
            <b-icon class="docHeader__icon" name="doctor"></b-icon>
            Профиль
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="docHeader__item">
            <b-icon class="docHeader__icon" name="settings-2"></b-icon>
            Настройки шаблонов
          </div>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="docHeader__item" @click="logout">
            <b-icon class="docHeader__icon" name="logout"></b-icon>
            Выйти
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </header>
  <b-modal v-model="isProfileVisible">
    <div class="header-profile">
      <div class="header-profile__row">
        <user-avatar :avatar-id="avatarId" size="xl" />
      </div>
      <div class="header-profile__row b-h3">
        {{ accountStore.userName }}
      </div>
      <div class="header-profile__row b-caption-s">ФИО</div>
      <div class="b-text-m">
        {{ accountStore.FIO }}
      </div>
      <div class="header-profile__row b-caption-s">Пол</div>
      <div class="b-text-m">
        {{ accountStore.getGender }}
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import useAuthStore from '@/store/auth';
import useAccountStore from '@/store/account';
import { BDropdown, BDropdownItem, BIcon, BModal } from '@/ui';
import UserAvatar from '@/components/user-avatar.vue';
import { UserClaimsDto } from '@/api/account/types/v1';

@Options({
  components: {
    BDropdown,
    BDropdownItem,
    BIcon,
    BModal,
    UserAvatar,
  },
})
export default class DocHeader extends Vue {
  authStore = useAuthStore();
  accountStore = useAccountStore();
  isProfileVisible = false;

  get isAdmin() {
    return this.accountStore.isAdmin;
  }

  get isRater() {
    return this.accountStore.isRater;
  }

  get avatarId() {
    return this.accountStore.avatarId;
  }

  get claims() {
    return this.accountStore.claims as UserClaimsDto;
  }

  async logout() {
    await this.authStore.logout();
  }
}
</script>

<style lang="scss" scoped>
@import '@frontend/budu-ui/src/assets/styles/mixins/fonts';
@import '@frontend/budu-ui/src/assets/styles/variables';
.docHeader {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background-color: $b-base-01;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.08);

  &__logo {
    margin-right: 32px;
  }

  &__col {
    display: flex;
    align-items: center;
  }

  &__link {
    @include b-text-m;
    color: $b-primary-label;
    text-decoration: none;
    margin-right: 24px;

    &.router-link-active {
      color: $b-support-103;
    }
  }

  &__item {
    min-width: 190px;
  }

  &__icon {
    margin-right: 8px;
  }

  &__avatar {
    margin-right: 8px;
  }
}

.header-profile {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__row {
    margin-bottom: 15px;
  }
}
</style>
