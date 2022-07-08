import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import 'quasar/dist/quasar.css';
import App from './App.vue';
import pinia from './store';
import router from './router';
import langRu from 'quasar/lang/ru';
import eventBus from '@/utils/eventBus';

const app = createApp(App);

/**
 * Небольшой хак - старые компоненты юзают this.$root.$on
 * который в Vue 3 вырезали. Подменим шиной событий
 */
app.config.globalProperties.$bus = eventBus;

app
  .use(Quasar, {
    lang: langRu,
    plugins: {
      Notify,
    },
  })
  .use(pinia)
  .use(router)
  .mount('#app');
