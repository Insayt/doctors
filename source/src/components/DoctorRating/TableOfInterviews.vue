<template>
  <div
    class="table-of-interviews"
    :class="{
      'table-of-interviews--complete':
        tabs.fromRouteQuery === tabs.enum.Completed,
    }"
  >
    <BTable
      class="table-of-interviews__table"
      :columns="interviewsColumns"
      :items="interviews"
      @click-row="openConsultationInNewTab"
    >
      <template #td_status="{ item: { status } }">
        <b-badge
          class="table-of-interviews__td-status"
          size="xs"
          :color="status === tabs.enum.New ? '$b-support-201' : '$b-base-02'"
          :text-color="
            status === tabs.enum.New ? '$b-support-204' : '$b-base-07'
          "
        >
          {{ formats.status(status) }}
        </b-badge>
      </template>

      <template
        #td_doctor="{
          item: {
            intervieweeFirstName,
            intervieweeMiddleName,
            intervieweeLastName,
          },
        }"
      >
        <div class="table-of-interviews__td-name">
          {{ intervieweeLastName }}
          {{ intervieweeFirstName }}
          {{ intervieweeMiddleName }}
        </div>
      </template>

      <template
        #td_intervieweeSpecialityName="{ item: { intervieweeSpecialityName } }"
      >
        <div class="table-of-interviews__td-specialty">
          {{ intervieweeSpecialityName }}
        </div>
      </template>

      <template #td_creationDate="{ item: { creationDate } }">
        <div
          class="table-of-interviews__td-date"
          :class="{
            'table-of-interviews__td-date--expired':
              isExpiredDate(creationDate) &&
              tabs.fromRouteQuery !== tabs.enum.Completed,
          }"
        >
          {{ formats.date(creationDate) }}
        </div>
      </template>
    </BTable>

    <BPagination
      v-if="interviewsColumns.length && maxPage > 1"
      v-model="currentPage"
      :max="maxPage"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options, setup } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { BTable, BPagination, BBadge } from '@/ui';

import { formatDate } from '@/utils/date';
import { useTabs } from './common/composable';
import { Interview } from './common/types';

@Options({
  components: {
    BTable,
    BPagination,
    BBadge,
  },
})
export default class TableOfInterviews extends Vue {
  @Prop({ type: Array, required: true }) interviews!: Interview[];

  @Prop({ type: Number, required: true }) page!: number;
  @Prop({ type: Number, required: true }) maxPage!: number;

  tabs = setup(useTabs);

  get currentPage() {
    return this.page;
  }
  set currentPage(page: number) {
    this.$emit('update:page', page);
  }

  interviewsColumns = [
    { key: 'status', label: 'Статус' },
    { key: 'doctor', label: 'Врач' },
    { key: 'intervieweeSpecialityName', label: 'Специальность' },
    { key: 'creationDate', label: 'Дата создания' },
  ];

  isExpiredDate(dateString: string) {
    const date = new Date(dateString);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    return +date < +startDate;
  }

  openConsultationInNewTab(interview: Interview) {
    if (this.tabs.fromRouteQuery === this.tabs.enum.Completed) return;
    const routeData = this.$router.resolve({
      name: 'doc-consultations',
      query: {
        consultationId: interview.activityId,
        interviewId: interview.interviewId,
      },
    });
    window.open(routeData.href, '_blank');
  }

  get formats() {
    const status = (status: string) => {
      const tabObject = Object.fromEntries(
        this.tabs.list.map((t) => [t.name, t.label])
      );
      return tabObject[status];
    };

    const date = (date: string) => formatDate(new Date(date));

    return {
      date,
      status,
    };
  }
}
</script>

<style lang="scss" scoped>
.table-of-interviews {
  &--complete {
    :deep(tr) {
      cursor: auto;
      pointer-events: none;
    }
  }

  &__table {
    margin-bottom: 24px;
  }

  &__td {
    &-name {
      @include b-body-m-bold;
    }

    &-specialty {
      @include b-body-m;
    }

    &-date {
      @include b-body-m;
      color: $b-base-06;

      &--expired {
        color: $b-support-104;
      }
    }
  }
}
</style>
