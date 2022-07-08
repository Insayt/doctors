<template>
  <b-accordion v-if="doctor" class="monitoring-item">
    <template #title>
      <div class="monitoring-item-content">
        <div class="monitoring-item-content__col">
          <user-avatar :avatar-id="doctor.avatarId" />
        </div>
        <div class="monitoring-item-content__col">
          <div class="monitoring-item-content__name b-text-m">
            {{ fio }}
          </div>
          <div class="monitoring-item-content__tasks">
            Задач {{ doctor.tasks && doctor.tasks.length }}, Истекает:
            {{ tasksCounts.expiresTasksCount }}, Просрочено:
            {{ tasksCounts.overdueTasksCount }}
          </div>
        </div>
      </div>
    </template>
    <b-table :columns="columns" :items="sortedTasks">
      <template #td_number="props">
        <div :class="getTdStyle(props.item)">
          {{ props.item.number }}
        </div>
      </template>
      <template #td_clientProfile="props">
        <div :class="getTdStyle(props.item)">
          {{ clientFio(props.item) }}
        </div>
      </template>
      <template #td_data="props">
        <div :class="getTdStyle(props.item)">
          {{ props.consultationTask || 'По календарю' }}
        </div>
      </template>
      <template #td_creationDate="props">
        <div :class="getTdStyle(props.item)">
          {{ date(props.item.creationDate) }}
        </div>
      </template>
    </b-table>
  </b-accordion>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { BAccordion, BTable } from '@/ui';
import UserAvatar from '@/components/user-avatar.vue';
import { Prop } from 'vue-property-decorator';
import { fio } from '@/utils/forrmaters';
import { formatDate } from '@/utils/date';
import { differenceInMinutes } from 'date-fns';
import { Doctor } from './types';

@Options({
  components: {
    BAccordion,
    BTable,
    UserAvatar,
  },
})
export default class MonitoringItem extends Vue {
  @Prop(Object) readonly doctor!: Doctor;
  @Prop(Number) readonly overdueMinutes!: number;
  @Prop(Number) readonly expiresMinutes!: number;

  columns = [
    { key: 'number', label: 'Номер задачи', sortable: false },
    { key: 'clientProfile', label: 'ФИО клиента', sortable: false },
    { key: 'data', label: 'Номер задачи консультации', sortable: false },
    {
      key: 'creationDate',
      label: 'Дата завершения консультации',
      sortable: false,
    },
  ];

  items = [
    {
      isActive: true,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
    },
    { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
    { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
  ];

  get fio() {
    return fio(this.doctor);
  }

  get sortedTasks() {
    return this.doctor.tasks
      .map((task) => {
        const minutesFromStartIssue = differenceInMinutes(
          new Date(),
          new Date(task.creationDate)
        );
        return {
          ...task,
          minutesFromStartIssue,
          overdue: minutesFromStartIssue >= this.overdueMinutes,
          expires:
            minutesFromStartIssue > this.expiresMinutes &&
            minutesFromStartIssue < this.overdueMinutes,
        };
      })
      .sort((a, b) => {
        if (a.minutesFromStartIssue == b.minutesFromStartIssue) {
          return 0;
        }
        return a.minutesFromStartIssue < b.minutesFromStartIssue ? 1 : -1;
      });
  }

  get tasksCounts() {
    let overdueTasksCount = 0;
    let expiresTasksCount = 0;
    this.sortedTasks.forEach((task) => {
      if (task.minutesFromStartIssue >= this.overdueMinutes) {
        overdueTasksCount++;
      } else if (task.minutesFromStartIssue > this.expiresMinutes) {
        expiresTasksCount++;
      }
    });
    return { overdueTasksCount, expiresTasksCount };
  }

  getTdStyle(task: any) {
    return {
      mExpires: task.expires,
      mOverdue: task.overdue,
    };
  }

  date(date: string) {
    if (!date) {
      return '—';
    }
    return formatDate(new Date(date), 'HH:mm dd/MM');
  }

  clientFio(task: Doctor['tasks'][number]) {
    if (
      !task.data ||
      !task.data.clientLastName ||
      !task.data.clientFirstName ||
      !task.data.clientMiddleName
    ) {
      return '—';
    }
    return `${task.data.clientLastName || ''} ${
      (task.data.clientFirstName &&
        (task.data.clientFirstName as string[])[0]) ||
      ''
    }.${
      (task.data.clientMiddleName &&
        (task.data.clientMiddleName as string[])[0]) ||
      ''
    }.`.trim();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.monitoring-item {
  background-color: $b-base-01;

  .mExpires {
    color: $b-support-203;
  }
  .mOverdue {
    color: $b-negative;
  }
}
.monitoring-item-content {
  display: grid;
  grid-template-columns: 56px auto;

  &__tasks {
    font-size: 14px;
    font-weight: normal;
    color: $b-base-06;
  }
}
</style>
