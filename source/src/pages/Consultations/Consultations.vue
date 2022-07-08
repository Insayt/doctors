<template>
  <div class="consultations">
    <div class="consultations__filter">
      <consultations-filter />
    </div>
    <div class="consultations__view">
      <consultations-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import ConsultationsFilter from '@/pages/Consultations/consultations-filter.vue';
import ConsultationsView from '@/pages/Consultations/consultations-view.vue';

@Options({
  components: {
    ConsultationsFilter,
    ConsultationsView,
  },
})
export default class Consultations extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/@frontend/budu-ui/src/assets/styles/variables';
.consultations {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 56px);
  &__filter {
    width: 400px;
    border-right: 1px solid $b-base-05;
  }
  &__view {
    width: calc(100% - 400px);
  }
}
</style>
