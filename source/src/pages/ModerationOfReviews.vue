<template>
  <div class="moderation-of-reviews">
    <div class="moderation-of-reviews__side">
      <DoctorsReviews />
    </div>
    <div class="moderation-of-reviews__main">
      <DoctorReview />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import DoctorsReviews from '@/components/ModerationOfReviews/DoctorsReviews.vue';
import DoctorReview from '@/components/ModerationOfReviews/DoctorReview.vue';

@Options({
  components: { DoctorsReviews, DoctorReview },
})
export default class ModerationOfReviews extends Vue {}
</script>

<style lang="scss" scoped>
.moderation-of-reviews {
  height: calc(100vh - 56px);
  padding: 24px 32px;
  display: flex;

  &__side,
  &__main {
    background: #ffffff;

    border: 1px solid #eaecee;
    border-radius: 8px;
  }

  &__side {
    padding: 16px;
    margin-right: 16px;
    max-width: 395px;
    width: 100%;
  }

  &__main {
    flex: 1;
  }
}
</style>
