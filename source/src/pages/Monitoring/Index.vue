<template>
  <div class="monitoring">
    <div class="monitoring-col">
      <div class="monitoring-spec">
        <div>Специальность</div>
        <img
          class="monitoring-spec__icon"
          title="Врачей"
          src="/img/stethoscope.svg"
        />
        <img
          class="monitoring-spec__icon"
          title="Задачи по прекреплению документов"
          src="/img/receipt.svg"
        />
        <img
          class="monitoring-spec__icon"
          title="Просрочено"
          src="/img/warning.svg"
        />
      </div>
      <div
        class="monitoring-spec"
        :class="{ mActive: selectedSpeciality === 'all' }"
        @click="selectSpeciality('all')"
      >
        <div>Все врачи</div>
        <div>
          {{ specialityCount.all && specialityCount.all.doctors.length }}
        </div>
        <div>
          {{ specialityCount.all && specialityCount.all.count }}
        </div>
        <div>
          {{ specialityCount.all && specialityCount.all.overdue }}
        </div>
      </div>
      <div
        v-for="speciality in specialtiesSortedByCount"
        :key="speciality.specialityId"
        :class="{
          mActive: speciality.specialityId === selectedSpeciality,
          mOverdue: specialityCount[speciality.specialityId].overdue,
        }"
        class="monitoring-spec"
        @click="selectSpeciality(speciality.specialityId)"
      >
        <div>
          {{ speciality.specialityName }}
        </div>
        <div>
          {{ specialityCount[speciality.specialityId].doctors.length }}
        </div>
        <div>
          {{
            specialityCount[speciality.specialityId] &&
            specialityCount[speciality.specialityId].count
          }}
        </div>
        <div>
          {{
            specialityCount[speciality.specialityId] &&
            specialityCount[speciality.specialityId].overdue
          }}
        </div>
      </div>
    </div>
    <div v-if="selectedSpeciality" class="monitoring-col">
      <div class="monitoring-list">
        <div class="monitoring-list__filter">
          <b-input
            v-model="doctorLastName"
            placeholder="Фильтр по фамилии врача"
          />
        </div>
        <monitoring-item
          v-for="doctor in sortedDoctors"
          :key="doctor.doctorId"
          :doctor="doctor"
          :overdue-minutes="OVERDUE_MINUTES"
          :expires-minutes="EXPIRES_MINUTES"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { BInput } from '@/ui';
import MonitoringItem from './monitoring-item.vue';
import { getDoctors, getSpecialties } from '@/api/doctor';
import { getTasks } from '@/api/supporttask';
import { differenceInMinutes } from 'date-fns';
import { SpecialtyFlags, DoctorSpecialityDto } from '@/api/doctor/types/v1';
import { Doctor, SpecialityCount, Specialties } from './types';
import { QueueNameEnum } from '@/api/supporttask/types';
import { IssueDto, IssueStatus } from '@/api/supporttask/types/v2';

const FETCH_ISSUE_TIMEOUT = 20000;

@Options({
  components: {
    BInput,
    MonitoringItem,
  },
})
export default class Monitoring extends Vue {
  specialties: Specialties = [];
  doctors: Doctor[] = [];
  specialityCount: SpecialityCount = {
    all: { count: 0, overdue: 0, doctors: [] },
  };
  selectedSpeciality = '';
  doctorLastName = '';
  interval = 0;
  OVERDUE_MINUTES = 60;
  EXPIRES_MINUTES = 50;

  get specialtiesSortedByCount() {
    return [...this.specialties].sort((a, b) => {
      const countA =
        this.specialityCount[a.specialityId] &&
        this.specialityCount[a.specialityId].count;
      const countB =
        this.specialityCount[b.specialityId] &&
        this.specialityCount[b.specialityId].count;
      if (countA === undefined || countB === undefined || countA === countB) {
        return 0;
      }
      return countA > countB ? -1 : 1;
    });
  }

  get sortedDoctors() {
    if (
      !this.selectedSpeciality ||
      !this.specialityCount[this.selectedSpeciality] ||
      !this.specialityCount[this.selectedSpeciality].doctors ||
      !this.specialityCount[this.selectedSpeciality].doctors.length
    ) {
      return [];
    }
    return [...this.specialityCount[this.selectedSpeciality].doctors]
      .filter(
        (d) =>
          d.lastName &&
          d.lastName
            .toLocaleLowerCase()
            .startsWith(this.doctorLastName.toLocaleLowerCase())
      )
      .sort((a, b) => {
        if (a.tasks.length === b.tasks.length) {
          return 0;
        }
        return a.tasks?.length < b.tasks?.length ? 1 : -1;
      });
  }

  selectSpeciality(specialityId: string) {
    this.selectedSpeciality =
      this.selectedSpeciality === specialityId ? '' : specialityId;
  }

  async fetchSpecialties() {
    const res = await getSpecialties();
    const specs = res.filter(
      (s) =>
        s.activityTypes &&
        s.activityTypes.some(
          (at) =>
            at.activityType === 'TELEMED' &&
            at.flags &&
            at.flags.some(
              (f) =>
                f === SpecialtyFlags.IsUrgently ||
                f === SpecialtyFlags.IsDirectly
            )
        )
    );
    specs.forEach((s) => {
      this.specialityCount = {
        ...this.specialityCount,
        [s.specialityId]: { count: 0, overdue: 0, doctors: [] },
      };
    });
    this.specialties = specs;
    this.specialityCount.all = { count: 0, overdue: 0, doctors: [] };
  }

  async fetchDoctors() {
    const res = (await getDoctors()).map(
      (d) => ({ ...d, tasks: [] } as Doctor)
    );
    res.forEach((doctor) => {
      doctor.specialities?.forEach((speciality) => {
        const specialityCount = this.specialityCount[speciality.specialityId];
        if (specialityCount) {
          this.specialityCount[speciality.specialityId].doctors = [
            ...specialityCount.doctors,
            doctor,
          ];
        }
        const isInAllDoctors = this.specialityCount.all.doctors.some(
          (d) => d.doctorId === doctor.doctorId
        );
        !isInAllDoctors && this.specialityCount.all.doctors.push({ ...doctor });
      });
    });
    this.doctors = res;
  }

  resetCount() {
    Object.keys(this.specialityCount).forEach((key) => {
      this.specialityCount[key].count = 0;
      this.specialityCount[key].overdue = 0;
      this.specialityCount[key].doctors = this.specialityCount[key].doctors.map(
        (d) => ({
          ...d,
          tasks: [],
        })
      );
    });
  }

  calcIssues(issues: IssueDto[]) {
    issues.forEach((issue) => {
      const doctor = this.doctors.find((d) => d.doctorId === issue.operatorId);
      if (!doctor || !doctor.specialities || !doctor.specialities.length)
        return;
      const doctorSpecialty =
        issue.data && (issue.data as unknown as DoctorSpecialityDto);
      let specialityId = doctorSpecialty?.specialityId;
      if (!specialityId) {
        // А вот пойди пойми теперь надо оно или нет
        // todo rm one month after release
        // fallback for old tasks
        // if task has no speciality find first doctor telemed speciality
        const speciality = doctor.specialities.find((s) => {
          return Object.keys(this.specialityCount).some(
            (sp) => sp === s.specialityId
          );
        });
        specialityId =
          speciality && speciality.specialityId
            ? speciality.specialityId
            : specialityId;
      }
      if (!specialityId) {
        return;
      }
      this.specialityCount[specialityId].count =
        this.specialityCount[specialityId].count + 1;
      this.specialityCount.all.count = this.specialityCount.all.count + 1;

      this.specialityCount[specialityId].doctors
        .find((d) => d.doctorId === doctor.doctorId)
        ?.tasks.push(issue);

      this.specialityCount.all.doctors
        .find((d) => d.doctorId === doctor.doctorId)
        ?.tasks.push(issue);

      const minutesFromStartIssue = differenceInMinutes(
        new Date(),
        new Date(issue.creationDate)
      );
      if (minutesFromStartIssue > this.OVERDUE_MINUTES) {
        this.specialityCount[specialityId].overdue =
          this.specialityCount[specialityId].overdue + 1;
        this.specialityCount.all.overdue += 1;
      }
    });
  }

  async fetchIssues() {
    const { data } = await getTasks({
      queueName: [QueueNameEnum.DOCADD_TELEMED],
      status: [IssueStatus.InProgress],
    });
    this.resetCount();
    if (data) {
      this.calcIssues(data);
    }
    if (this.interval) {
      window.clearTimeout(this.interval);
    }
    this.interval = window.setTimeout(this.fetchIssues, FETCH_ISSUE_TIMEOUT);
  }

  async mounted() {
    await this.fetchSpecialties();
    await this.fetchDoctors();
    await this.fetchIssues();
  }

  beforeUnmount() {
    if (this.interval) {
      window.clearTimeout(this.interval);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.monitoring {
  padding-top: 24px;
  display: grid;
  grid-template-columns: 340px auto;
  padding-left: 12px;
}

.monitoring-spec {
  display: grid;
  grid-template-columns: auto 40px 40px 40px;
  padding-bottom: 12px;
  padding-top: 12px;
  padding-left: 12px;
  cursor: pointer;
  border-radius: 5px;

  &:first-child {
    cursor: auto;
    margin-bottom: 24px;
    border-bottom: 1px solid $b-base-07;
    border-radius: 0;
  }

  &.mActive {
    background-color: $b-support-402;
  }
  &.mOverdue {
    color: $b-negative;
  }

  &__icon {
    width: 24px;
  }
}

.monitoring-list {
  padding: 0 15px;
  &__filter {
    margin-bottom: 20px;
  }
}
</style>
