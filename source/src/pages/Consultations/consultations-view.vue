<template>
  <div class="consultation-view">
    <div v-if="loading" class="consultation-view__loading">
      <preloader />
    </div>
    <template v-else-if="!loading && consultationId && consultation">
      <b-icon
        :size="'35'"
        name="close"
        class="consultation-view__closeBtn"
        @click="close"
      ></b-icon>
      <div class="consultation-view__title">
        {{ formatDt(consultation.calculatedDateStart) }}
        {{ consultation.issueNumber || 'По записи' }}
      </div>
      <div class="consultation-view__field" v-if="patient">
        <span class="consultation-view__fieldLabel">Пациент:</span>
        {{ fio(patient) }}
      </div>
      <div class="consultation-view__field" v-if="doctor">
        <span class="consultation-view__fieldLabel">Врач:</span>
        {{ consultation.doctorSpeciality.specialityName }} {{ fio(doctor) }}
      </div>
      <div class="consultation-view__field" v-if="consultation.doctorComment">
        <span class="consultation-view__fieldLabel">Комментарии:</span>
        {{ consultation.doctorComment }}
      </div>
      <div class="consultation-view__field">
        <b-btn
          v-if="isConsultationCanceled && isAdmin"
          :disabled="isRestoreLoading"
          @click="restoreConsultation"
        >
          Восстановить консультацию
        </b-btn>
      </div>
      <section class="consultation-view__attachments">
        <div class="consultation-view__field">
          <a class="b-text-link" :href="recordUrl()" target="_blank">
            Мед.карта
          </a>
        </div>

        <div class="consultation-view__field">
          <span class="consultation-view__fieldLabel">Медиа:</span>
          <doc-documents
            v-if="medias.length"
            :documents="medias"
            label="fileLabel"
          />
          <template v-else>Медиафайлы не найдены или обрабатываются.</template>
        </div>

        <div class="consultation-view__field">
          <span class="consultation-view__fieldLabel">Документы:</span>
          <doc-documents :documents="consultation.documents" label="fileName" />
        </div>
      </section>
      <section class="consultation-view__chat">
        <div class="consultation-view__chatContainer">
          <doc-chat
            v-if="hasChatMessages"
            :chatId="consultation.chatId"
            type="operator"
            role="operator"
            disabled
          />
          <span v-else>Сообщений нет</span>
        </div>
      </section>
    </template>
    <template v-else> Выберите консультацию </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { BBtn, BIcon } from '@/ui';
import Preloader from '@/components/preloader.vue';
import DocDocuments from '@/components/doc-documents.vue';
import DocChat from '@/components/doc-chat.vue';
import {
  getConsultation,
  getConsultationRecord,
  recoverConsultation,
} from '@/api/telemed';
import Notify from '@/utils/notify';
import { formatDate } from '@/utils/date';
import { ConsultationDto, ConsultationRecordDto } from '@/api/telemed/types/v1';
import { DoctorDto } from '@/api/doctor/types/v2';
import { UserProfileDto } from '@/api/account/types/v1';
import { getUserProfile } from '@/api/account';
import { DoctorOrUser } from '@/pages/Consultations/consultations-filter.vue';
import { fio } from '@/utils/forrmaters';
import EventBus from '@/utils/eventBus';
import useAccountStore from '@/store/account';
import useChatStore from '@/store/chat';

@Options({
  components: {
    Preloader,
    DocDocuments,
    BBtn,
    BIcon,
    DocChat,
  },
})
export default class ConsultationsView extends Vue {
  accountStore = useAccountStore();
  chatStore = useChatStore();
  loading = false;
  hasChatMessages = false;
  consultation: ConsultationDto | undefined;
  doctor: DoctorDto | undefined;
  patient: UserProfileDto | undefined;
  isRestoreLoading = false;
  isPolicy = false;
  medias: ConsultationRecordDto[] = [];

  get consultationId(): string {
    return this.$route.query.consultationId as string;
  }

  get isAdmin() {
    return this.accountStore.isAdmin;
  }

  get isConsultationCanceled() {
    return (
      this.consultation &&
      this.consultation.status &&
      this.consultation.status.includes('Canceled')
    );
  }

  recordUrl() {
    if (this.isPolicy) {
      return window.location.origin + '/op/doc/record/' + this.consultationId;
    } else {
      return (
        window.location.origin +
        '/op/doc/consultations/c/record/' +
        this.consultationId
      );
    }
  }

  async restoreConsultation() {
    this.isRestoreLoading = true;

    try {
      if (this.consultation) {
        await recoverConsultation(this.consultation?.consultationId);
        EventBus.$emit('consultationRestore');
        Notify.success('Консультация восстановлена');
      }
    } catch {
      Notify.error('Ошибка восстановления консультации');
    } finally {
      this.isRestoreLoading = false;
    }
  }

  async fetchConsultationInfo() {
    this.loading = true;
    try {
      this.consultation = await getConsultation(this.consultationId);
      await this.fetchUser(this.consultation.clientId);
      await this.fetchUser(this.consultation.doctorId as string);
      await this.fetchMedia(this.consultation.consultationId);
      await this.fetchChatMessages(this.consultation.chatId);
    } catch (e) {
      console.log(e);
      Notify.error('Ошибка загрузки информации о консультации');
    } finally {
      this.loading = false;
    }
  }

  async fetchUser(userId: string) {
    if (!userId) {
      return Promise.resolve();
    }
    try {
      const res = (await getUserProfile(userId)) as DoctorOrUser;
      if (res.role === 'Doctor') {
        this.doctor = res;
      } else if (res.role === 'Client') {
        this.patient = res;
      }
    } catch {
      Notify.error('Пользователь не найден');
    }
  }

  async fetchMedia(consultationId: string) {
    if (!this.consultation) return;
    const res = await getConsultationRecord(consultationId);
    const date = formatDate(new Date(this.consultation.calculatedDateStart));
    const patient = 'Пациент_' + fio(this.patient).split(' ').join('_');
    const doctor = 'врач_' + fio(this.doctor).split(' ').join('_');
    this.medias = res.map((m: any, i) => ({
      ...m,
      fileLabel: `${date}_${patient}_${doctor}${
        i > 0 ? '_' + i : ''
      }.${m.fileName.replace(/.*\./, '')}`,
    }));
  }

  async fetchChatMessages(chatId: string) {
    try {
      const res = await this.chatStore.getMessages({ chatId });
      this.hasChatMessages = !!res.length;
    } catch {
      Notify.error('Ошибка получения списка сообщений');
    }
  }

  close() {
    let query = { ...this.$route.query };
    delete query.consultationId;
    this.$router.replace({ ...this.$route, query });
  }

  fio(user: DoctorDto | UserProfileDto) {
    return fio(user);
  }

  formatDt(date: string) {
    return formatDate(new Date(date), '(HH:mm) dd.MM.yyyy');
  }

  @Watch('consultationId', {
    immediate: true,
  })
  changeConsultationId(newVal: string) {
    this.hasChatMessages = false;
    if (newVal) {
      this.fetchConsultationInfo();
    } else {
      this.consultation = undefined;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.consultation-view {
  padding: 20px;
  position: relative;
  &__loading {
    text-align: center;
  }
  &__closeBtn {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1;
  }
  &__title {
    font-size: 24px;
    margin-bottom: 12px;
  }
  &__field {
    margin-bottom: 12px;
    line-height: 24px;
  }
  &__fieldLabel {
    display: inline-block;
    width: 120px;
  }
  &__attachments {
    margin-top: 50px;
  }
}
</style>
