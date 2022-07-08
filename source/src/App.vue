<template>
  <doc-header v-if="hasAuth">Header</doc-header>
  <router-view />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import DocHeader from './components/doc-header.vue';
import useAuthStore from '@/store/auth';

@Options({
  components: {
    DocHeader,
  },
})
export default class App extends Vue {
  authStore = useAuthStore();

  get hasAuth() {
    return this.authStore.hasAuth;
  }
}
</script>

<style lang="scss">
@import 'icons.css';
@import 'ui-fonts.css';
@import '@frontend/budu-ui/src/assets/styles/mixins/fonts';
@import '@frontend/budu-ui/src/assets/styles/variables';
@import '@frontend/budu-ui/src/assets/styles/base';

html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
body {
  @include b-text-m;
  background-color: $b-base-02;
}
</style>
