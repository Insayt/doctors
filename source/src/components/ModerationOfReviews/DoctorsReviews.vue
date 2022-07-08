<template>
  <div class="doctors-reviews">
    <b-input
      v-model="searchDoctor"
      size="s"
      placeholder="Поиск"
      class="doctors-reviews__search"
    />

    <div v-if="filteredDoctors.length" class="doctors-reviews__doctor-list">
      <div
        v-for="doctor in filteredDoctors"
        :key="doctor.doctorId"
        class="doctors-reviews__doctor-item"
      >
        <DoctorReviewsItem
          :doctor="doctor"
          :selected="doctor.doctorId === selectedDoctor?.doctorId"
          @select="selectDoctorHandler"
        />
      </div>
    </div>
    <div v-else class="doctors-reviews__empty">Новых отзывов нет</div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import { ReturnAsyncType } from '@/types/utils';
import { getDoctorsNotModeratedComments } from '@/api/rate/v1';

import Notify from '@/utils/notify';

import { BInput } from '@/ui';
import DoctorReviewsItem from '@/components/ModerationOfReviews/DoctorReviewsItem.vue';

type Doctors = ReturnAsyncType<typeof getDoctorsNotModeratedComments>;
type Doctor = ReturnAsyncType<typeof getDoctorsNotModeratedComments>[number];

@Options({
  components: { BInput, DoctorReviewsItem },
})
export default class DoctorsReviews extends Vue {
  searchDoctor = '';
  doctors: Doctors = [];
  selectedDoctor: Doctor | null = null;

  get filteredDoctors() {
    if (!this.searchDoctor) return this.doctors;

    return this.doctors.filter((doctor) =>
      `${doctor.lastName}${doctor.firstName}${doctor.middleName}`
        .toLowerCase()
        .includes(this.searchDoctor.toLowerCase())
    );
  }

  selectDoctorHandler(doctorId: Doctor['doctorId']) {
    const foundDoctor = this.doctors.find(
      (doctor) => doctor.doctorId === doctorId
    );
    this.selectedDoctor = foundDoctor || null;
    this.$router.push({
      query: {
        ...this.$route.query,
        doctorId: foundDoctor?.doctorId,
      },
    });
  }

  @Watch('$route.query.activityId')
  async fetchDoctors() {
    try {
      this.doctors = await getDoctorsNotModeratedComments();
    } catch (error: any) {
      Notify.error(error.response.data?.error.description);
    }
  }

  mounted() {
    this.fetchDoctors().then(() =>
      this.selectDoctorHandler(this.$route.query.doctorId as string)
    );
  }
}
</script>

<style lang="scss" scoped>
.doctors-reviews {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__empty {
    @include b-body-m;
    text-align: center;
  }

  &__search {
    margin-bottom: 8px;
  }

  &__doctor-item {
    position: relative;
    padding: 4px 0;

    &:not(:last-child) {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 8px;
        height: 1px;
        width: calc(100% - 16px);
        background-color: $b-base-03;
      }
    }
  }

  &__doctor-list {
    overflow-y: scroll;
    flex: 1;
  }
}
</style>
