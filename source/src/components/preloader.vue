<template>
  <img class="b-preloader" src="/img/preloader.svg" alt="preloader" />
</template>

<script lang="ts">
// Тут потом можно сделать нормальный прелоадер
import { Vue, Options } from 'vue-class-component';

@Options({})
export default class Preloader extends Vue {}
</script>

<style lang="scss" scoped>
.b-preloader {
  max-width: 40px;
}
</style>
