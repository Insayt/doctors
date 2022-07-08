<template>
  <div class="doctor-review">
    <h1 class="doctor-review__title">Очередь на модерацию</h1>
    <div v-if="comments.length" class="doctor-review__review-list">
      <BAccordion
        v-for="comment in comments"
        :key="comment.activityId"
        :expanded="comment.activityId === selectedActivityId"
        @select="setActivityId(comment.activityId)"
      >
        <template #title>
          <div class="doctor-review__review-title">
            <StarRating
              class="doctor-review__review-rating"
              :rating="comment.score"
            />
            <router-link :to="getLinkToConsultation(comment.activityId)">
              Посмотреть консультацию
            </router-link>
            <span>
              {{ comment.user?.lastName }} {{ comment.user?.firstName }}
              {{ comment.user?.middleName }}
            </span>
          </div>
        </template>
        <DoctorReviewItem
          class="doctor-review__review"
          :comment="comment"
          @accept="acceptHandler"
          @decline="declineHandler"
        />
      </BAccordion>
    </div>
    <div v-else class="doctor-review__empty">Очередь пуста</div>

    <!-- Modals -->
    <ReviewModal
      v-model="showAcceptModal"
      is-accepted
      @accept="(text: string) => modalHandler(true, text)"
    />
    <ReviewModal v-model="showDeclineModal" @accept="modalHandler" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import { ReturnAsyncType } from '@/types';
import { getUserProfile } from '@/api/account';
import {
  getAllNotModeratedComments,
  approveComment,
  declineComment,
} from '@/api/rate/v1';

import { BAccordion } from '@/ui';
import Notify from '@/utils/notify';
import StarRating from '@/components/StarRating.vue';
import ReviewModal from '@/components/ModerationOfReviews/modals/ReviewModal.vue';
import DoctorReviewItem from '@/components/ModerationOfReviews/DoctorReviewItem.vue';

type User = ReturnAsyncType<typeof getUserProfile>;
type Comments = NonNullable<
  ReturnAsyncType<typeof getAllNotModeratedComments>['data']
>;
type Comment = Comments[number] & {
  user?: User;
};

@Options({
  components: { DoctorReviewItem, ReviewModal, BAccordion, StarRating },
})
export default class DoctorReview extends Vue {
  comments: Comment[] = [];

  get doctorId() {
    return this.$route.query.doctorId as string | undefined;
  }

  get selectedActivityId() {
    return this.$route.query.activityId as string | undefined;
  }

  getLinkToConsultation(activityId: Comment['activityId']) {
    const routeData = this.$router.resolve({
      name: 'doc-consultations',
      query: {
        role: 'Doctor',
        userId: this.doctorId,
        consultationId: activityId,
      },
    });
    return routeData.href;
  }

  @Watch('comments')
  async fetchUserInfo() {
    const commentsWithoutUserInfo = this.comments.filter(
      (comment) => !comment.user
    );
    commentsWithoutUserInfo.forEach(async (comment) => {
      try {
        comment.user = await getUserProfile(comment.clientId);
      } catch (error) {
        console.log(error);
      }
    });
  }

  @Watch('$route.query.doctorId')
  async fetchReviews() {
    const doctorId = this.doctorId;
    if (!doctorId) return;

    try {
      const { data } = await getAllNotModeratedComments({ doctorId });
      if (data?.length) {
        this.comments = data as Comments;
        this.setActivityId(this.comments[0].activityId);
      }
    } catch (error: any) {
      Notify.error(error.response.data?.error.description);
    }
  }

  acceptHandler(activityId: Comment['activityId']) {
    this.showAcceptModal = true;
    this.setActivityId(activityId);
  }
  declineHandler(activityId: Comment['activityId']) {
    this.showDeclineModal = true;
    this.setActivityId(activityId);
  }

  setActivityId(activityId?: Comment['activityId']) {
    this.$router.push({
      query: {
        ...this.$route.query,
        activityId,
      },
    });
  }

  // Modals
  showAcceptModal = false;
  showDeclineModal = false;

  async modalHandler(isAccept = false, text: string | null = null) {
    try {
      const queryActivityId = this.$route.query.activityId as string;
      const comment = this.comments.find(
        (comment) => (comment.activityId = queryActivityId)
      );
      if (!comment) throw new Error('Комментарий не обновлен');

      const { activityId, activityType } = comment;

      if (isAccept) {
        await approveComment(
          { activityId, activityTypeName: activityType || '' },
          { responseText: text }
        );
      } else {
        await declineComment({
          activityId,
          activityTypeName: activityType || '',
        });
      }
    } catch (error: any) {
      Notify.error(error.response.data?.error.description);
    } finally {
      this.showAcceptModal = false;
      this.showDeclineModal = false;
      this.fetchReviews();
      this.setActivityId();
    }
  }

  // Hooks
  mounted() {
    this.fetchReviews();
  }

  unmounted() {
    this.setActivityId();
  }
}
</script>

<style lang="scss" scoped>
.doctor-review {
  &__title {
    @include b-heading-4;
    padding: 13px 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid $b-base-03;
  }

  &__empty {
    @include b-body-m;
    text-align: center;
  }

  &__review {
    &-title {
      display: flex;
      align-items: center;

      & > * {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
      a {
        text-decoration: none;
        color: $b-primary;
      }
    }

    &-rating {
      display: inline-flex;
      cursor: initial;
    }

    &-list {
      padding: 13px 16px;
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
