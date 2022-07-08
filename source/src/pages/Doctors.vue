<template>
  <div class="doctors">
    <div class="doctors__left">
      <b-input
        v-model="searchText"
        canceled
        autofocus
        size="m"
        icon="search"
        placeholder="Введите имя врача"
      />
      <div class="doctors-list">
        <div v-if="doctorsList.length">
          <div
            v-for="(doctor, index) in doctorsList"
            :key="index"
            :class="isChosen(doctor) && 'doctors-list-item--active'"
            class="doctors-list-item"
            @click="selectDoctor(doctor)"
          >
            <div class="doctors-list-item__col">
              <user-avatar :avatar-id="doctor.avatarId" />
            </div>
            <div class="doctors-list-item__col b-text-m">
              <div class="doctors-list-item__name">
                {{ fio(doctor) }}
              </div>
              <div class="doctors-list-item__desc">
                {{ formatSpeciality(doctor) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="doctors-list__empty">
          <preloader v-if="doctorsLoading" />
          <template v-if="!doctorsLoading"> Врач не найден </template>
        </div>
      </div>
    </div>
    <div class="doctors__right">
      <div v-if="!chosenDoctor" class="doctors__right-empty">
        <div>
          <img
            src="/img/my-patients-search.png"
            class="doctors__right-emptyImage"
          />
          <div class="b-h4">
            Чтобы найти врача, воспользуйтесь<br />
            поиском или выберите из списка
          </div>
        </div>
      </div>
      <div v-if="!profileLoading && chosenDoctor" class="doctors__rightContent">
        <div class="chosen-doctor">
          <div class="chosen-doctor__col">
            <user-avatar size="xxl" :avatar-id="chosenDoctor.avatarId" />
          </div>
          <div class="chosen-doctor__col b-text-m">
            <div class="chosen-doctor__name b-h4">
              {{ fio(chosenDoctor) }}
            </div>
            <div class="chosen-doctor__desc b-text-m">
              {{ formatSpeciality(chosenDoctor) }}

              <div class="chosen-doctor__photoBtn">
                <label
                  :class="
                    isLoadingPhoto && 'chosen-doctor__avatarActionDisabled'
                  "
                  class="b-text-link"
                  for="avatarInput"
                >
                  {{
                    chosenDoctor.avatarId ? 'Изменить фото' : 'Загрузить фото'
                  }}
                  <input
                    id="avatarInput"
                    ref="inputAvatar"
                    class="chosen-doctor__avatarInput"
                    accept="image/jpeg,image/png"
                    type="file"
                    :disabled="isLoadingPhoto"
                    @input="uploadAvatar(chosenDoctor)"
                  />
                </label>
                <a class="b-text-link" @click="showDeletePopup = true">
                  Удалить фото
                </a>
                <b-cancellable
                  v-model="showDeletePopup"
                  message="Фотография удалена"
                  button-label="Отменить"
                  cancel-message="Действие отменено"
                  :timeout="5000"
                  @timer-end="deleteAvatar(chosenDoctor)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="chosen-doctor-filter">
          <div class="chosen-doctor-filter__col">
            <div class="chosen-doctor-filter__input">
              <b-input
                v-model="phoneNumber"
                placeholder="Телефон"
                float-label
                disabled
              />
            </div>
            <div class="chosen-doctor-filter__input">
              <b-select
                v-model="organization"
                placeholder="Организация"
                button-size="m"
                option-label="name"
                no-reset
                :options="organizations"
              />
            </div>
          </div>
          <div class="chosen-doctor-filter__col">
            <div class="chosen-doctor-filter__input">
              <b-input
                v-model="login"
                placeholder="Логин"
                float-label
                disabled
              />
            </div>
            <div class="chosen-doctor-filter__input">
              <b-input
                v-model="employeePersonnelNumber"
                placeholder="Табельный номер"
                float-label
              />
            </div>
          </div>
        </div>
        <div class="chosen-doctor-filter__checkbox">
          <b-checkbox>ЭЦП</b-checkbox>
        </div>
        <div>
          <b-tabs v-model="currentTab">
            <b-tab label="Образование" name="education"></b-tab>
            <b-tab label="Опыт работы" name="experience"></b-tab>
          </b-tabs>
          <div v-if="currentTab === 'education'">
            <b-input
              v-model="institution"
              class="chosen-doctor__textarea"
              type="textarea"
              size="m"
              float-label
              placeholder="Образование"
              canceled
              :max="4000"
            />
            <b-input
              v-model="course"
              class="chosen-doctor__textarea"
              type="textarea"
              size="m"
              float-label
              canceled
              placeholder="Курсы повышения квалификации"
              :max="4000"
            />
          </div>
          <div v-if="currentTab === 'experience'">
            <div class="experiences-wrap">
              <div class="experiences-row">
                <div
                  v-for="exp in experiences"
                  :key="exp.experienceId"
                  class="experiences"
                >
                  <div class="experiences__wrap">
                    <div class="experiences__row experiences__place">
                      <b-input
                        v-model="exp.organization"
                        size="m"
                        float-label
                        canceled
                        placeholder="Место работы"
                      />
                      <div class="experiences__remove">
                        <b-icon
                          name="trash"
                          color="$b-secondary-label"
                        ></b-icon>
                      </div>
                    </div>
                    <b-input
                      v-model="exp.position"
                      class="experiences__row"
                      size="m"
                      float-label
                      canceled
                      placeholder="Должность"
                    />
                    <div class="experiences__row">
                      <div class="b-caption-s experiences__title">
                        Начало работы
                      </div>
                      <div class="experiences__select">
                        <b-select
                          v-model="exp.monthStart"
                          :options="months"
                          placeholder="Месяц"
                          button-size="m"
                          option-label="name"
                        ></b-select>
                        <b-select
                          v-model="exp.yearStart"
                          :options="years"
                          placeholder="Год"
                        ></b-select>
                      </div>
                      <div class="experiences__now">
                        <b-checkbox
                          v-if="isShowCurrentWork(exp)"
                          @input="setCurrentWork()"
                        >
                          Работаю здесь в настоящий момент
                        </b-checkbox>
                      </div>
                    </div>
                    <div class="experiences__row">
                      <div class="b-caption-s experiences__title">
                        Окончание работы
                      </div>
                      <div class="experiences__select">
                        <b-select
                          v-model="exp.monthEnd"
                          :options="months"
                          placeholder="Месяц"
                          button-size="m"
                          option-label="name"
                        ></b-select>
                        <b-select
                          v-model="exp.yearEnd"
                          :options="years"
                          placeholder="Год"
                        ></b-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <b-btn
            class="chosen-doctor__save"
            size="m"
            :loading="isDoctorSaving"
            @click="saveDoctor(chosenDoctor)"
          >
            Сохранить
          </b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/*
    Этот компонент потом разобьется на два - часть уедет в профиль врача.
    Пока просто не понятно какая именно часть :)
 */

import { Options, Vue } from 'vue-class-component';
import {
  BBtn,
  BCancellable,
  BCheckbox,
  BInput,
  BSelect,
  BTab,
  BTabs,
  BIcon,
} from '@/ui';
import UserAvatar from '@/components/user-avatar.vue';
import {
  attachOrganization,
  getDoctors,
  getExp,
  getOrganizations,
  updateEdu,
} from '@/api/doctor';
import { DoctorDto, ExperienceDto } from '@/api/doctor/types/v2';
import { fio } from '@/utils/forrmaters';
import { Nullable } from '@/types';
import Notify from '@/utils/notify';
import Preloader from '@/components/preloader.vue';
import { deleteAvatar, getUserProfile, saveAvatarId } from '@/api/account';
import { postFile } from '@/api/renfiles';
import { OrganizationDto } from '@/api/doctor/types/v1';

let cacheDoctorsList = [];

const months = [
  {
    value: 0,
    name: 'Январь',
  },
  {
    value: 1,
    name: 'Февраль',
  },
  {
    value: 2,
    name: 'Март',
  },
  {
    value: 3,
    name: 'Апрель',
  },
  {
    value: 4,
    name: 'Май',
  },
  {
    value: 5,
    name: 'Июнь',
  },
  {
    value: 6,
    name: 'Июль',
  },
  {
    value: 7,
    name: 'Август',
  },
  {
    value: 8,
    name: 'Сентябрь',
  },
  {
    value: 9,
    name: 'Октябрь',
  },
  {
    value: 10,
    name: 'Ноябрь',
  },
  {
    value: 11,
    name: 'Декабрь',
  },
];

type DocExp = ExperienceDto & {
  isDelete: boolean;
  isNew: boolean;
  monthStart: any;
  yearStart: number;
  monthEnd: any;
  yearEnd: number | null;
  currentWork: boolean;
};

@Options({
  components: {
    BInput,
    BCheckbox,
    BCancellable,
    BTabs,
    BTab,
    BBtn,
    BSelect,
    BIcon,
    UserAvatar,
    Preloader,
  },
})
export default class Consultations extends Vue {
  doctorsLoading = false;
  profileLoading = false;
  searchText = '';
  doctorsList: DoctorDto[] = [];
  chosenDoctor: Nullable<DoctorDto> = null;
  login: string | null | undefined;
  isSignature = false;
  phoneNumber: string | null | undefined;
  showDeletePopup = false;
  isLoadingPhoto = false;
  currentTab = 'education';
  institution: string | null = '';
  course: string | null = '';
  organization: Nullable<OrganizationDto> = null;
  organizations: Array<OrganizationDto> = [];
  employeePersonnelNumber: string | null = null;
  isDoctorSaving = false;
  experiences: Array<DocExp> = [];
  months = months;
  test = '';
  test1 = '';

  get years(): Array<string> {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 50))
      .fill('')
      .map((v, idx) => String(now - idx));
  }

  get avatarId() {
    return this.chosenDoctor && this.chosenDoctor.avatarId;
  }

  setCurrentWork() {
    console.log(1);
  }

  isShowCurrentWork(exp: DocExp) {
    let isShow = false;

    return isShow;
  }

  async getAccount() {
    if (!this.chosenDoctor) return;
    this.profileLoading = true;
    this.institution = this.chosenDoctor.institution || null;
    this.course = this.chosenDoctor.course || null;

    const organization = this.organizations.find(
      (o) => o.inn === this.chosenDoctor?.organizationInn
    );
    this.organization = organization ? organization : null;
    this.employeePersonnelNumber =
      this.chosenDoctor.employeePersonnelNumber || null;
    try {
      const res = await getUserProfile(this.chosenDoctor.doctorId as string);
      this.login = res.login;
      this.phoneNumber = res.phoneNumber;
      this.isSignature = !!res.hasSignature;

      const exp = await getExp(this.chosenDoctor.doctorId as string);
      this.experiences = exp.experiences.map((exp: ExperienceDto) => {
        const expDateStart = new Date(exp.dateStart);
        const expDateEnd = exp.dateEnd ? new Date(exp.dateEnd) : null;
        const monthStart = months.find(
          (m) => m.value === expDateStart.getMonth()
        );
        const monthEnd = expDateEnd
          ? months.find((m) => m.value === expDateEnd.getMonth())
          : null;
        return {
          isDelete: false,
          isNew: false,
          monthStart: monthStart,
          yearStart: expDateStart.getFullYear(),
          monthEnd: monthEnd,
          yearEnd: expDateEnd ? expDateEnd.getFullYear() : null,
          currentWork: false,
          ...exp,
        };
      });
      console.log(this.experiences);
    } catch (e) {
      Notify.error('Ошибка получения данных доктора');
    } finally {
      this.profileLoading = false;
    }
  }

  async selectDoctor(doctor: DoctorDto) {
    this.chosenDoctor = doctor;
    this.currentTab = 'education';
    await this.getAccount();
  }

  isChosen(doctor: DoctorDto) {
    return this.chosenDoctor && doctor.doctorId === this.chosenDoctor.doctorId;
  }

  fio(doctor: DoctorDto) {
    return fio(doctor);
  }

  formatSpeciality(doctor: DoctorDto) {
    if (!doctor.specialities?.length) return '-';
    return doctor.specialities[0]?.specialityName || '-';
  }

  async saveEducation(doctorId: string) {
    await updateEdu(doctorId, {
      institution: this.institution,
      course: this.course,
    });
  }

  async saveOrganization(doctorId: string) {
    await attachOrganization(doctorId, {
      employeePersonnelNumber: this.employeePersonnelNumber,
      organizationInn: this.organization?.inn,
    });
  }

  async saveDoctor(chosenDoctor: Nullable<DoctorDto>) {
    if (!chosenDoctor) return;
    const doctorId = chosenDoctor.doctorId as string;
    this.isDoctorSaving = true;
    try {
      await this.saveEducation(doctorId);
      await this.saveOrganization(doctorId);
      Notify.success('Информация сохранена');
    } catch {
      Notify.error('Ошибка сохранения доктора');
    } finally {
      this.isDoctorSaving = false;
    }
  }

  async uploadAvatar(chosenDoctor: Nullable<DoctorDto>) {
    if (!chosenDoctor) return;
    const doctorId = chosenDoctor.doctorId as string;
    const avatar = this.$refs.inputAvatar.files[0];
    this.isLoadingPhoto = true;
    try {
      await this.deleteAvatar(chosenDoctor);
      const formData = new FormData();
      formData.append('file', avatar, avatar.name);
      formData.append('ReadAccessMode', 'Public');
      formData.append('WriteFileAccessMode', 'ApplicationOperators');
      this.$refs.inputAvatar.value = '';
      const res = await postFile(formData);
      const { avatarId } = await saveAvatarId(res.fileId, doctorId);
      await this.updateAvatarUrl(doctorId, avatarId);
    } catch {
      Notify.error('Ошибка загрузки фото');
    } finally {
      this.isLoadingPhoto = false;
    }
  }

  updateAvatarUrl(doctorId: string, newAvatarId: string | null = null) {
    let docInList = this.doctorsList.find((d) => d.doctorId === doctorId);
    if (docInList) {
      docInList.avatarId = newAvatarId;
    }
  }

  async deleteAvatar(chosenDoctor: Nullable<DoctorDto>) {
    if (!chosenDoctor) return;
    const doctorId = chosenDoctor.doctorId as string;
    if (!this.avatarId) {
      return;
    }
    this.isLoadingPhoto = false;
    this.showDeletePopup = false;
    try {
      await deleteAvatar(doctorId);
      this.updateAvatarUrl(doctorId);
    } catch {
      Notify.error('Ошибка удаления фото');
    }
  }

  async fetchOrganizations() {
    this.organizations = await getOrganizations();
  }

  async fetchDoctors() {
    this.doctorsLoading = true;
    try {
      this.doctorsList = cacheDoctorsList = await getDoctors();
    } catch {
      Notify.error('Ошибка получения списка докторов');
    } finally {
      this.doctorsLoading = false;
    }
  }

  async mounted() {
    await this.fetchOrganizations();
    await this.fetchDoctors();
  }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.b-tabs {
  box-shadow: none !important;
}
.doctors {
  display: flex;
  height: calc(100vh - 56px);
  padding: 24px 32px;
  &__left {
    min-width: 385px;
    margin-right: 16px;
  }
  &__right {
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    padding: 32px;
    background-color: $b-base-01;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
  &__right-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }
  &__right-emptyImage {
    display: block;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  &__rightContent {
    max-width: 700px;
  }
}
.doctors-list {
  background-color: $b-base-01;
  border-radius: 8px;
  margin-top: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  &__empty {
    padding: 28px 0;
    color: $b-secondary-label;
    font-size: 15px;
    text-align: center;
  }
}

.doctors-list {
  background-color: $b-base-01;
  padding: 8px;
  width: 100%;
  max-height: calc(100% - 60px);
  overflow-y: auto;
}

.doctors-list-item {
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 15px;

  &:hover,
  &--active {
    background-color: $b-base-02;
  }

  &__col:first-child {
    margin-right: 12px;
  }

  &__desc {
    color: $b-base-07;
  }
}

.chosen-doctor {
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  &__col:first-child {
    margin-right: 24px;
  }

  &__desc {
    color: $b-base-07;
  }

  &__photoBtn {
    margin-top: 8px;
    font-size: 11px;

    a,
    label {
      margin-right: 8px;
    }
  }
  &__avatarInput {
    display: none;
  }

  &__textarea {
    margin-top: 24px;
    display: block;
  }
  &__save {
    margin-top: 24px;
  }
}

.chosen-doctor-filter {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
  &__col {
    width: 50%;
    flex: 1;
    margin-right: 20px;
  }
  &__input {
    margin-bottom: 20px;
  }
  &__checkbox {
    margin-bottom: 44px;
  }
}

.experiences-wrap {
  padding-top: 24px;
}
.experiences-row {
  border-bottom: 1px solid $b-base-03;
  padding-bottom: 32px;
  margin-bottom: 32px;

  &:last-child {
    border: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

.experiences {
  padding: 32px 0;
  border-bottom: 1px solid $b-base-03;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border: none;
  }

  &__wrap {
    max-width: 334px;
  }

  &__row {
    display: block;
    margin-top: 20px;
    position: relative;

    &:first-child {
      margin-top: 0;
    }
  }

  &__title {
    margin-bottom: 8px;
  }

  &__select {
    display: flex;

    .b-select:first-child {
      margin-right: 20px;
    }
  }

  &__now {
    position: absolute;
    top: 45px;
    right: -317px;
  }
  &__remove {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: -26px;
  }
}
</style>
