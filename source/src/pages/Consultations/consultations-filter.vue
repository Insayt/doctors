<template>
  <div class="consultations-filter">
    <div class="consultations-filter__tabs">
      <b-tabs v-model="tab" class="consultations-filter__tabs-content">
        <b-tab label="Доктор" name="doctor"></b-tab>
        <b-tab label="Клиент" name="client"></b-tab>
        <b-tab
          label="Консультации"
          name="consultations"
          :disabled="!userId"
        ></b-tab>
      </b-tabs>
      <div v-if="tab === 'doctor'">
        <div class="consultations-filter__tab">
          <b-select
            v-model="speciality"
            :options="specialties"
            placeholder="Специальность врача"
            option-label="specialityName"
          />
          <div class="consultations-filter__inputs">
            <div class="consultations-filter__inputsGroup">
              <b-input
                v-model="lastName"
                class="consultations-filter__lastname"
                placeholder="Фамилия"
                float-label
                canceled
              />
              <b-input
                v-model="firstName"
                placeholder="Имя"
                float-label
                canceled
              />
            </div>
            <b-input
              v-model="middleName"
              placeholder="Отчество"
              float-label
              canceled
            />
            <div class="consultations-filter__submit">
              <b-btn size="m" :loading="loading" @click="fetchDoctors">
                Искать
              </b-btn>
            </div>
          </div>

          <div class="consultations-filter-content">
            <template v-if="doctors.length">
              <div
                v-for="doctor in doctors"
                :key="getDoctorId(doctor)"
                class="consultations-filter-item _hover"
                @click="selectUser(doctor)"
              >
                <div class="consultations-filter-item__col">
                  <user-avatar :avatar-id="doctor.avatarId" />
                </div>
                <div class="consultations-filter-item__col">
                  <div class="consultations-filter-item__name b-text-m">
                    {{ fio(doctor) }}
                  </div>
                  <div class="consultations-filter-item__desc">
                    {{ role(doctor) }}
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              Уточните параметры поиска и нажмите на кнопку Искать
            </template>
          </div>
        </div>
      </div>
      <div v-if="tab === 'client'">
        <div class="consultations-filter__tab">
          <b-input
            v-model:phone="phone"
            placeholder="Номер телефона"
            is-phone
            float-label
            canceled
          />
          <div class="consultations-filter__inputs">
            <div class="consultations-filter__inputsGroup">
              <b-input
                v-model="lastName"
                class="consultations-filter__lastname"
                placeholder="Фамилия"
                float-label
                canceled
              />
              <b-input
                v-model="firstName"
                placeholder="Имя"
                float-label
                canceled
              />
            </div>
            <b-input
              v-model="middleName"
              placeholder="Отчество"
              float-label
              canceled
            />
            <div class="consultations-filter__submit">
              <b-btn size="m" :loading="loading" @click="fetchClients">
                Искать
              </b-btn>
            </div>
          </div>

          <div class="consultations-filter-content">
            <template v-if="users.length">
              <div
                v-for="user in users"
                :key="getDoctorId(user)"
                class="consultations-filter-item _hover"
                @click="selectUser(user)"
              >
                <div class="consultations-filter-item__col">
                  <user-avatar :avatar-id="user.avatarId" />
                </div>
                <div class="consultations-filter-item__col">
                  <div class="consultations-filter-item__name b-text-m">
                    {{ fio(user) }}
                  </div>
                  <div class="consultations-filter-item__desc">
                    {{ role(user) }}
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              Уточните параметры поиска и нажмите на кнопку Искать
            </template>
          </div>
        </div>
      </div>
      <div v-if="tab === 'consultations'">
        <div class="consultations-filter__tab">
          <div class="consultations-filter-item">
            <div class="consultations-filter-item__col">
              <user-avatar :avatar-id="getAvatarId(selectedUser)" />
            </div>
            <div class="consultations-filter-item__col">
              <div class="consultations-filter-item__name b-text-m">
                {{ fio(selectedUser) }}
              </div>
              <div class="consultations-filter-item__desc">
                {{ role(selectedUser) }}
              </div>
            </div>
          </div>
          <b-select
            v-model="selectedStatus"
            :options="statuses"
            placeholder="Выберите статус"
            no-reset
          />
          <div class="consultations-filter__picker">
            <b-datepicker
              v-model="filterDate"
              placeholder="Дата консультации"
              range
            />
          </div>
          <div class="consultations-filter__picker">
            <b-checkbox v-model="hasMedia">
              С медиафайлом консультации
            </b-checkbox>
          </div>

          <div class="consultations-filter-content">
            <template v-if="consultations.length">
              <div
                v-for="consultation in consultations"
                :key="consultation.consultationId"
                :class="{
                  _active: isActiveConsultation(consultation.consultationId),
                }"
                class="consultations-item"
                @click="selectConsultation(consultation)"
              >
                <div class="consultations-item__col">
                  <div class="consultations-item__name">
                    {{ consultation.issueNumber || 'По календарю' }}
                  </div>
                  <div class="consultations-item__desc">
                    {{ formatDt(consultation.calculatedDateStart) }}
                  </div>
                </div>
                <div
                  v-if="consultation.totalSize"
                  class="consultations-item__col"
                >
                  <div class="consultations-item__name">Медиа</div>
                  <div class="consultations-item__desc">
                    {{ consultation.totalSize }}
                  </div>
                </div>
              </div>
              <b-btn
                v-if="isMoreConsultations"
                size="m"
                block
                :loading="isConsultationLoading"
                @click="loadMoreConsultations"
              >
                Показать ещё
              </b-btn>
            </template>
            <template v-if="!isConsultationLoading && !consultations.length">
              Консультаций нет
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import {
  BTabs,
  BTab,
  BSelect,
  BInput,
  BBtn,
  BCheckbox,
  BDatepicker,
} from '@/ui';
import UserAvatar from '@/components/user-avatar.vue';
import { getSpecialties, getDoctors } from '@/api/doctor';
import { GetDoctorsRequestDTO } from '@/api/doctor/types';
import {
  DoctorSpecialityDto,
  FavoriteActivityType,
  SpecialtyFlags,
} from '@/api/doctor/types/v1';
import { Nullable } from '@/types';
import Notify from '@/utils/notify';
import { DoctorDto } from '@/api/doctor/types/v2';
import { bytesToSize, fio } from '@/utils/forrmaters';
import { getAllUsers, getUserProfile } from '@/api/account';
import { GetAllUsersRequestDTO } from '@/api/account/types';
import { UserProfileDto } from '@/api/account/types/v1';
import { getConsultationsQuery } from '@/api/telemed';
import { GetConsultationsQueryRequestDTO } from '@/api/telemed/types';
import { ConsultationDto } from '@/api/telemed/types/v1';
import { formatDate } from '@/utils/date';
import { endOfDay } from 'date-fns';

interface Consultation extends ConsultationDto {
  totalSize?: string;
}
interface CalendarRange {
  from: string;
  to: string;
}
export interface DoctorOrUser extends DoctorDto, UserProfileDto {}

@Options({
  components: {
    BTabs,
    BTab,
    BSelect,
    BInput,
    BBtn,
    BCheckbox,
    BDatepicker,
    UserAvatar,
  },
})
export default class ConsultationsFilter extends Vue {
  tab = 'doctor';
  speciality: Nullable<DoctorSpecialityDto> = null;
  specialties: DoctorSpecialityDto[] = [];
  loading = false;
  isConsultationLoading = false;
  firstName = '';
  lastName = '';
  middleName = '';
  phone = '';
  doctors: DoctorDto[] = [];
  users: UserProfileDto[] = [];
  consultations: Consultation[] = [];
  selectedUser: Nullable<DoctorDto | UserProfileDto> = null;
  statuses = [
    { label: 'Выполненные', value: 'Completed' },
    { label: 'Отмененные врачом', value: 'CanceledByOperator' },
    { label: 'Отмененные пациентом', value: 'CanceledByClient' },
    { label: 'Будущие', value: 'New' },
  ];
  hasMedia = false;
  filterDate: CalendarRange | string | null = '';
  currentConsultationPage = 1;
  totalConsultations = 0;

  get userId() {
    return this.$route.query.userId;
  }

  set userId(val) {
    this.$router.replace({
      ...this.$route,
      query: { ...this.$route.query, userId: val },
    });
  }

  get selectedStatus(): any {
    return this.$route.query.status
      ? this.statuses.find((s) => s.value === this.$route.query.status)
      : this.statuses[0];
  }

  set selectedStatus(status) {
    const query = {
      ...this.$route.query,
      status: status ? status.value : null,
    };
    this.$router.replace({ ...this.$route, query });
  }

  get isMoreConsultations() {
    return this.consultations.length < this.totalConsultations;
  }

  isActiveConsultation(consultationId: string) {
    return consultationId === this.$route.query.consultationId;
  }

  getDoctorId(user: any): string {
    if (user.doctorId) return user.doctorId as string;
    return user.userId as string;
  }

  getAvatarId(user: Nullable<DoctorDto | UserProfileDto>) {
    return user && user.avatarId;
  }

  fio(user: Nullable<DoctorDto | UserProfileDto>) {
    return fio(user);
  }

  role(user: Nullable<DoctorDto | UserProfileDto>) {
    if (user && user.role === 'Doctor') return 'Доктор';
    return 'Пациент';
  }

  selectUser(user: any) {
    if (user.doctorId) {
      this.userId = user.doctorId as string;
    } else {
      this.userId = user.userId as string;
    }
    this.selectedUser = user;
    this.consultations = [];
    this.totalConsultations = 0;
    this.tab = 'consultations';
  }

  selectConsultation(consultation: ConsultationDto) {
    this.$router.push({
      ...this.$route,
      query: {
        ...this.$route.query,
        consultationId: consultation.consultationId,
      },
    });
  }

  async fetchSpecialities() {
    const res = await getSpecialties();

    this.specialties = res.filter(
      (s) =>
        s.activityTypes &&
        s.activityTypes.some(
          (at) =>
            at.activityType === FavoriteActivityType.TELEMED &&
            at.flags &&
            at.flags.some(
              (f) =>
                f === SpecialtyFlags.IsUrgently ||
                f === SpecialtyFlags.IsDirectly
            )
        )
    );
  }

  async fetchClients() {
    this.loading = true;

    const payload: GetAllUsersRequestDTO = {
      Roles: ['Client'],
      Count: 30,
    };
    this.firstName ? (payload.FirstName = this.firstName) : false;
    this.lastName ? (payload.LastName = this.lastName) : false;
    this.middleName ? (payload.MiddleName = this.middleName) : false;
    this.phone ? (payload.PhoneNumber = this.phone) : false;

    try {
      let res = await getAllUsers(payload);
      this.users = res.data as UserProfileDto[];
    } catch {
      Notify.error('Ошибка получения списка клиентов');
    } finally {
      this.loading = false;
    }
  }

  async fetchDoctors() {
    this.loading = true;
    const payload: GetDoctorsRequestDTO = {};
    if (this.speciality && this.speciality.specialityId) {
      payload.DoctorSpecialityId = this.speciality.specialityId;
    }
    try {
      let doctors = await getDoctors(payload);
      if (this.firstName) {
        doctors = doctors.filter(
          (d) =>
            d.firstName &&
            d.firstName.toLowerCase().includes(this.firstName.toLowerCase())
        );
      }
      if (this.lastName) {
        doctors = doctors.filter(
          (d) =>
            d.lastName &&
            d.lastName.toLowerCase().includes(this.lastName.toLowerCase())
        );
      }
      if (this.middleName) {
        doctors = doctors.filter(
          (d) =>
            d.middleName &&
            d.middleName.toLowerCase().includes(this.middleName.toLowerCase())
        );
      }
      this.doctors = doctors;
    } catch {
      Notify.error('Ошибка получения списка врачей');
    } finally {
      this.loading = false;
    }
  }

  async fetchUser() {
    try {
      this.selectedUser = await getUserProfile(this.userId as string);
    } catch {
      Notify.error('Ошибка получения данных о клиенте');
    }
  }

  formatDt(date: string) {
    return formatDate(new Date(date), '(HH:mm) dd.MM.yyyy');
  }

  getMediaSize(consultation: Consultation) {
    if (!consultation.consultationRecords) return '';
    const totalSize = consultation.consultationRecords.reduce((acc, record) => {
      return acc + record.fileSize;
    }, 0);
    return bytesToSize(totalSize);
  }

  @Watch('userId')
  @Watch('selectedStatus')
  @Watch('filterDate')
  @Watch('hasMedia')
  changeFilters() {
    this.fetchConsultations(false);
  }

  loadMoreConsultations() {
    this.currentConsultationPage += 1;
    this.fetchConsultations(true);
  }

  async fetchConsultations(isLoadMore = false) {
    this.isConsultationLoading = true;
    if (!isLoadMore) {
      this.currentConsultationPage = 1;
    }
    const payload: GetConsultationsQueryRequestDTO = {
      Status: this.selectedStatus.value,
    };
    if (this.hasMedia) {
      payload.IsConsultationRecords = true;
    }
    if (this.selectedUser && this.selectedUser.role === 'Client') {
      payload.ClientId = this.userId as string;
    }
    if (this.selectedUser && this.selectedUser.role === 'Doctor') {
      payload.DoctorId = this.userId as string;
    }
    if (
      this.filterDate !== null &&
      typeof this.filterDate === 'object' &&
      this.filterDate.from
    ) {
      payload.DateStart = new Date(this.filterDate.from).toISOString();
      payload.DateEnd = endOfDay(new Date(this.filterDate.to)).toISOString();
    } else if (this.filterDate) {
      payload.DateStart = new Date(this.filterDate as string).toISOString();
      payload.DateEnd = endOfDay(
        new Date(this.filterDate as string)
      ).toISOString();
    }
    payload.Page = this.currentConsultationPage;
    payload.Count = 50;
    try {
      const res = await getConsultationsQuery(payload);
      this.totalConsultations = res.totalCount;
      if (isLoadMore) {
        this.consultations = this.consultations.concat(
          res.data as Consultation[]
        );
      } else {
        this.consultations = res.data as Consultation[];
      }
      this.consultations.forEach((c) => {
        if (c.consultationRecords && c.consultationRecords.length) {
          c.totalSize = this.getMediaSize(c);
        }
      });
    } catch {
      Notify.error('Ошибка загрузки списка консультаций');
    } finally {
      this.isConsultationLoading = false;
    }
  }

  async mounted() {
    if (this.userId) {
      await this.fetchUser();
      await this.fetchConsultations();
      this.tab = 'consultations';
    }
    await this.fetchSpecialities();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.consultations-filter {
  &__tabs {
    padding-top: 10px;
  }
  &__tabs-content {
    margin-left: 20px;
  }
  &__tab {
    padding: 20px;
    background-color: $b-base-01;
  }
  &__inputs {
    margin-top: 10px;
  }
  &__inputsGroup {
    display: flex;
    margin-bottom: 10px;
  }
  &__lastname {
    margin-right: 10px;
  }
  &__submit {
    margin-top: 10px;
  }
  &__picker {
    margin: 15px 0;

    .b-datepicker {
      width: 100%;
    }
  }
}
.consultations-filter-content {
  margin-top: 20px;
  max-height: calc(100vh - 385px);
  overflow-y: auto;
}

.consultations-filter-item {
  display: grid;
  grid-template-columns: 56px auto;
  padding: 10px;
  border-radius: 5px;

  &._hover:hover {
    cursor: pointer;
    background-color: $b-base-03;
  }

  &__desc {
    font-size: 14px;
    font-weight: normal;
    color: $b-base-06;
  }
}

.consultations-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid $b-base-05;
  margin-bottom: 5px;
  cursor: pointer;
  padding: 8px 30px;
  font-size: 14px;

  &:hover,
  &._active {
    background-color: $b-support-401;
  }

  &__desc {
    font-size: 12px;
    color: $b-secondary-label;
  }
}
</style>
