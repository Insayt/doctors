<template>
  <div class="star-rating">
    <BIcon
      v-for="(value, index) in maxRating"
      :key="index"
      :name="value <= rating ? 'star-filled' : 'star'"
      :size="size"
      :color="color"
      @click.stop="setRating(value)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

import { BBtn, BIcon } from '@/ui';

@Options({ components: { BBtn, BIcon }, emits: ['update:rating'] })
export default class StarRating extends Vue {
  @Prop({ type: Number, required: true }) readonly rating!: number;
  @Prop({ type: Number, default: 5 }) readonly maxRating!: number;
  @Prop({ type: [Number, String], default: 'inherit' }) readonly size!:
    | number
    | string;
  @Prop({ type: String, default: '$b-support-203' }) readonly color!: number;

  @Emit('update:rating')
  setRating(rating = 0) {
    return rating;
  }
}
</script>

<style lang="scss" scoped></style>
