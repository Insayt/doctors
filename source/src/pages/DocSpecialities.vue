<template>
  <div class="docSpecialities">
    <b-select
      v-model="activityType"
      placeholder="Тип активностей"
      :options="activityTypes"
    />
    <div class="docSpecialities__row">
      <b-select
        v-model="newSpeciality"
        class="docSpecialities__specSelect"
        placeholder="Специальность"
        :options="specialties"
        :disabled="specialties && specialties.length < 1"
      />
      <b-btn
        block
        :disabled="!newSpeciality || loading"
        :loading="loading"
        @click="add"
      >
        Добавить
      </b-btn>
    </div>

    <div
      v-for="speciality in specialties"
      :key="speciality.specialityId"
      class="docSpecialities-item"
    >
      <div class="docSpecialities-item__title">
        <div class="b-text-mb">
          {{ speciality.specialityName }}
        </div>
        <div class="b-caption-s">
          {{ speciality.info }}
        </div>
        <b-btn
          type="pale"
          :loading="loading"
          @click="remove(speciality.specialityId)"
          >Удалить</b-btn
        >
      </div>
      <div class="docSpecialities-item__flags">
        <div
          v-for="flag in flags"
          :key="flag.key"
          class="docSpecialities-item__flag"
        >
          <b-checkbox
            :model-value="getFlagValue(speciality, flag)"
            @input="checkFlag(flag.key, speciality)"
          >
            {{ flag.label }}
          </b-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { BBtn, BSelect, BCheckbox } from '@/ui';
import {
  addSpecialityActivity,
  getActivityTypes,
  getSpecialties,
  removeActivity,
  updateFlags,
} from '@/api/doctor';
import Notify from '@/utils/notify';
import { SpecialtyFlags } from '@/api/doctor/types/v1';
import { DoctorSpecialty } from '@/api/doctor/types';

type Specialty = {
  label: DoctorSpecialty['specialityName'];
  value: DoctorSpecialty['specialityId'];
  activityType: NonNullable<DoctorSpecialty['activityTypes']>[number];
} & DoctorSpecialty;

type Flag = DocSpecialities['flags'][number];

@Options({
  components: {
    BBtn,
    BSelect,
    BCheckbox,
  },
})
export default class DocSpecialities extends Vue {
  activityTypes: Array<any> = [];
  specialties: Specialty[] = [];
  activityType: any = null;
  newSpeciality: any = null;
  loading = false;
  flags = [
    { key: SpecialtyFlags.ConsultAvailable, label: 'Доступна консультация' },
    {
      key: SpecialtyFlags.AskForPainScale,
      label: 'Запрашивать уровень боли',
    },
    {
      key: SpecialtyFlags.IsUrgently,
      label:
        'Есть ли данный специалист в принципе в списке для срочной записи.',
    },
    {
      key: SpecialtyFlags.IsDirectly,
      label:
        'Eсть ли данный специалист в принципе в списке для записи на дату.',
    },
  ];

  // eslint-disable-next-line no-undef
  getFlagValue(speciality: Specialty, flag: Flag) {
    return speciality.activityType.flags?.some((f) => f === flag.key);
  }

  async fetch() {
    this.loading = true;
    try {
      await this.fetchTypes();
    } finally {
      this.loading = false;
    }
  }

  async fetchTypes() {
    const res = await getActivityTypes();
    this.activityTypes = res.map((item) => {
      return {
        label: item.description,
        value: item.name,
      };
    });
    if (!this.activityType) {
      this.activityType =
        this.activityTypes &&
        this.activityTypes.length > 0 &&
        this.activityTypes[0];
    }
  }

  async checkFlag(flag: Flag['key'], speciality: Specialty) {
    if (this.loading) {
      return;
    }
    const flagList = speciality.activityType.flags || [];
    const hasFlag = flagList?.some((f) => f === flag);
    let flags = [...flagList];
    if (hasFlag) {
      flags = [...flagList.filter((f) => f !== flag)];
    } else {
      flags.push(flag);
    }
    this.loading = true;

    try {
      await updateFlags(this.activityType.value, speciality.specialityId, {
        priority: speciality.activityType.priority,
        flags,
      });
    } catch {
      Notify.error('Ошибка изменения флагов специальности');
    } finally {
      await this.fetchSpecialities();
      this.loading = false;
    }
  }

  async add() {
    this.loading = true;
    try {
      await addSpecialityActivity(
        this.activityType?.value,
        this.newSpeciality?.value
      );
      await this.fetchSpecialities();
      this.newSpeciality = null;
    } catch (e: any) {
      Notify.error(e.response.data?.error.description);
    } finally {
      this.loading = false;
    }
  }

  async remove(specialityId: Specialty['specialityId']) {
    if (!specialityId || !this.activityType) {
      return;
    }
    this.loading = true;
    try {
      await removeActivity(this.activityType.value, specialityId);
      await this.fetchSpecialities();
    } catch {
      Notify.error('Ошибка удаления активности специальности');
    } finally {
      this.loading = false;
    }
  }

  @Watch('activityType')
  async fetchSpecialities() {
    if (!this.activityType) {
      this.specialties = [];
      this.newSpeciality = null;
      return;
    }
    const res = await getSpecialties({
      activityType: this.activityType.value,
    });

    const specialties = res.map((s) => {
      const currentActivity = (s.activityTypes || []).find(
        (t) => t.activityType === this.activityType?.value
      );

      if (currentActivity) {
        return {
          ...s,
          label: s.specialityName,
          value: s.specialityId,
          activityType: currentActivity,
        };
      }
    });

    this.specialties = specialties.filter(Boolean) as Specialty[];
  }

  mounted() {
    this.fetch();
  }
}
</script>

<style lang="scss" scoped>
@import '../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.docSpecialities {
  width: 944px;
  margin: 0 auto;
  padding-top: 24px;

  &__row {
    display: flex;
    margin: 16px 0;
  }

  &__specSelect {
    min-width: 600px;
    margin-right: 12px;
  }
}

.docSpecialities-item {
  padding: 20px 0;
  border-bottom: 1px solid $b-base-04;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  &__flag {
    margin-bottom: 10px;
  }
}
</style>
