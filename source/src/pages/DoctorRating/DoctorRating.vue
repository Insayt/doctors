<template>
  <div class="doctor-rating">
    <div class="doctor-rating__head">
      <div class="doctor-rating__title">Оценка консультации</div>
      <BTabs v-model="tabs.current" class="doctor-rating__tabs">
        <BTab
          v-for="tab in tabs.list"
          :key="tab.name"
          :name="tab.name"
          :label="tab.label"
        />
      </BTabs>
    </div>

    <div class="doctor-rating__filter">
      <div class="doctor-rating__filter-inputs">
        <BSelect
          ref="test"
          v-model="specialties.selected"
          placeholder="Специальность"
          search-placeholder="Поиск специальности"
          :options="specialties.list"
          :filter-fn="specialties.filter"
          multiple
        />
        <BSelect
          v-model="doctors.selected"
          placeholder="Врач"
          search-placeholder="Начните набирать имя"
          :options="doctors.list"
          :filter-fn="doctors.filter"
          multiple
        />
        <BDatepicker v-model="date" :value="date" placeholder="Дата" range />
      </div>

      <BBtn v-show="isShowClearFilterButton" type="ghost" @click="clearFilter">
        Очистить фильтр
      </BBtn>
    </div>

    <div v-if="!interviews.length" class="doctor-rating__empty">
      <img width="165" height="165" src="/img/rating-empty.svg" />
      <div class="doctor-rating__empty-title">Нет консультаций на оценку</div>
    </div>
    <TableOfInterviews
      v-else
      v-model:page="page"
      :interviews="interviews"
      :max-page="maxPage"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options, setup } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import { getInterviews, GetInterviewsParams } from '@/api/rate/v1';

import { BBtn, BTab, BTabs, BSelect, BDatepicker } from '@/ui';
import TableOfInterviews from '@/components/DoctorRating/TableOfInterviews.vue';

import Notify from '@/utils/notify';

import {
  useDoctorSpecialtiesSelect,
  useDoctorsSelect,
  useTabs,
} from '@/components/DoctorRating/common/composable';

import { Interviews } from '@/components/DoctorRating/common/types';

const pageCount = 20;

type Date = string | { from: string; to: string } | null;

@Options({
  components: {
    BBtn,
    BTab,
    BTabs,
    BSelect,
    BDatepicker,
    TableOfInterviews,
  },
})
export default class DoctorRating extends Vue {
  date: Date = null;
  tabs = setup(useTabs);

  // Doctors
  doctors = setup(useDoctorsSelect);

  @Watch('specialties.selectedIds')
  async updateDoctorsBySpecialty() {
    await this.doctors.fetch(this.specialties.selectedIds);

    // Оставляем в выбранных врачах - только врачей с выбранными специальностями
    const filteredDoctors = this.doctors.selected.filter((doctor) =>
      doctor.specialityIds.some((specialtyId) =>
        this.specialties.selectedIds.includes(specialtyId)
      )
    );

    this.doctors.selected = filteredDoctors;
  }

  // Doctor Specialties
  specialties = setup(useDoctorSpecialtiesSelect);

  // Interviews
  page = 1;
  totalCount = 0;
  interviews: Interviews = [];

  get maxPage() {
    return Math.ceil(this.totalCount / pageCount);
  }

  @Watch('tabs.current')
  @Watch('page')
  @Watch('date')
  @Watch('doctors.selected')
  @Watch('specialties.selected')
  async getInterviews() {
    const payload: GetInterviewsParams = {
      status: this.tabs.current,
      page: this.page,
      count: pageCount,
    };

    if (this.specialties.selected.length) {
      payload.specialityNames = this.specialties.selectedNames;
    }

    if (this.doctors.selected.length) {
      payload.doctorsIds = this.doctors.selectedIds;
    }

    if (this.date) {
      if (typeof this.date === 'object' && this.date.to) {
        payload.dateFrom = this.date.from;
        payload.dateTo = this.date.to;
      } else {
        payload.date = this.date as string;
      }
    }

    try {
      const { data, totalCount } = await getInterviews(payload);
      if (data) {
        this.interviews = data;
        this.totalCount = totalCount;
      }
    } catch (error) {
      Notify.error('Не удалось получить список всех оценщиков');
    }
  }

  // Clear
  get isShowClearFilterButton() {
    return (
      this.specialties.selected.length ||
      this.doctors.selected.length ||
      this.date
    );
  }
  clearFilter() {
    this.doctors.selected = [];
    this.specialties.selected = [];
    this.date = null;
  }

  mounted() {
    Promise.all([this.doctors.fetch(), this.specialties.fetch()]).then(() =>
      this.getInterviews()
    );
  }
}
</script>

<style lang="scss" scoped>
.doctor-rating {
  margin: 24px 32px;
  padding: 32px;
  @include card;
  min-height: calc(100vh - 104px);
  display: flex;
  flex-direction: column;

  &__head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $b-base-03;
    margin-bottom: 24px;
  }

  &__title {
    @include b-heading-1;
  }

  &__tabs {
    box-shadow: none;
  }

  &__filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    &-inputs {
      display: flex;
      & > :not(:last-child) {
        margin-right: 16px;
      }
    }
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;

    img {
      margin-bottom: 24px;
    }

    &-title {
      @include b-heading-3;
    }
  }
}
</style>
