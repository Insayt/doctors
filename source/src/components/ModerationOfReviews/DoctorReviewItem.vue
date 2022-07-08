<template>
  <div class="doctor-review-item">
    <div class="doctor-review-item__name">{{ fullName || '-' }}</div>
    <div class="doctor-review-item__comment">{{ comment.comment || '-' }}</div>
    <div class="doctor-review-item__action-list">
      <b-btn
        type="uncolored"
        class="doctor-review-item__action"
        block
        size="s"
        @click="emitDecline"
      >
        Отклонить отзыв
      </b-btn>
      <b-btn
        class="doctor-review-item__action"
        block
        size="s"
        @click="emitAccept"
      >
        Утвердить отзыв
      </b-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { ReturnAsyncType } from '@/types';
import { getUserProfile } from '@/api/account';
import { getAllNotModeratedComments } from '@/api/rate/v1';

import { BBtn } from '@/ui';

type User = ReturnAsyncType<typeof getUserProfile>;
type Comments = NonNullable<
  ReturnAsyncType<typeof getAllNotModeratedComments>['data']
>;
type Comment = Comments[number] & {
  user?: User;
};

@Options({ components: { BBtn }, emits: ['accept', 'decline'] })
export default class DoctorReviewItem extends Vue {
  @Prop({ type: Object, required: true }) readonly comment!: Comment;

  get fullName() {
    const user = this.comment.user;
    if (!user) return '';

    const { lastName, firstName, middleName } = user;
    return `${lastName} ${firstName} ${middleName}`.trim();
  }

  emitAccept() {
    this.$emit('accept', this.comment.activityId);
  }
  emitDecline() {
    this.$emit('decline', this.comment.activityId);
  }
}
</script>

<style lang="scss" scoped>
.doctor-review-item {
  &__name {
    @include b-body-l-bold;
    margin-bottom: 2px;
  }

  &__comment {
    @include b-body-m;
    margin-bottom: 2px;
    word-break: break-all;
  }

  &__action {
    width: initial;
    &:not(:last-child) {
      margin-right: 8px;
    }

    &-list {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
