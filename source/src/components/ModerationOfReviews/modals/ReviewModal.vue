<template>
  <BModal v-model="show" class="review-modal">
    <template #title> {{ title }}? </template>
    <BInput
      v-if="isAccepted"
      v-model="text"
      class="review-modal__text"
      type="textarea"
      placeholder="Ответ на отзыв (не обязательно)"
    />

    <template #bottom>
      <div class="review-modal__action-list">
        <b-btn
          type="ghost"
          class="review-modal__action"
          block
          size="s"
          @click="emitClose"
        >
          Отмена
        </b-btn>
        <b-btn class="review-modal__action" block size="s" @click="emitAccept">
          {{ title }}
        </b-btn>
      </div>
    </template>
  </BModal>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { BModal, BInput, BBtn } from '@/ui';

@Options({
  components: { BModal, BInput, BBtn },
  emits: ['update:modelValue', 'accept'],
})
export default class ReviewModalAccept extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isAccepted!: boolean;
  @Prop({ type: Boolean, default: false }) readonly modelValue!: boolean;

  text = '';

  get title() {
    return this.isAccepted ? 'Утвердить отзыв' : 'Отклонить отзыв';
  }

  get show() {
    console.log({ modelValue: this.modelValue });

    return this.modelValue;
  }

  set show(value: boolean) {
    console.log({ value });
    this.$emit('update:modelValue', value);
  }

  emitClose() {
    this.$emit('update:modelValue', false);
  }

  emitAccept() {
    this.$emit('accept', this.text);
  }
}
</script>

<style lang="scss" scoped>
.review-modal {
  &__text {
    display: block;
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
