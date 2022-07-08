<template>
  <div
    class="doctor-reviews-item"
    :class="{ 'doctor-reviews-item--selected': selected }"
    @click="selectHandler"
  >
    <div class="doctor-reviews-item__detail">
      <div class="doctor-reviews-item__name">
        {{ fullName }}
      </div>
      <div class="doctor-reviews-item__count">
        Отзывы: <BBadge size="s">{{ doctor.notModeratedCommentsCount }}</BBadge>
      </div>
    </div>
    <div class="doctor-reviews-item__avatar">
      <UserAvatar :avatar-id="doctor.avatarId" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { DoctorCommentsDto } from '@/api/rate/v1/types';

import { BBadge } from '@/ui';
import UserAvatar from '@/components/user-avatar.vue';

@Options({ components: { BBadge, UserAvatar }, emits: ['select'] })
export default class DoctorReviewsItem extends Vue {
  @Prop({ type: Object, required: true }) readonly doctor!: DoctorCommentsDto;
  @Prop({ type: Boolean, default: false }) readonly selected!: boolean;

  get fullName() {
    const { lastName, firstName, middleName } = this.doctor;
    return `${lastName} ${firstName} ${middleName}`;
  }

  selectHandler() {
    this.$emit('select', this.doctor.doctorId);
  }
}
</script>

<style lang="scss" scoped>
.doctor-reviews-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  &--selected {
    background-color: $b-base-02;
  }

  &__detail {
    flex: 1;
    margin-right: 8px;
  }

  &__name {
    @include b-body-l-bold;
  }

  &__count {
    color: $b-base-07;

    @include b-body-m;
  }
}
</style>
