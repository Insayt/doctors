import { createRouter, createWebHistory } from 'vue-router';
import useAuthStore from '@/store/auth';
import useAccountStore from '@/store/account';

const AuthPage = () => import('@/pages/Auth.vue');
const LobbyPage = () => import('@/pages/Lobby.vue');
const MonitoringPage = () => import('@/pages/Monitoring/Index.vue');
const DocSpecialitiesPage = () => import('@/pages/DocSpecialities.vue');
const ConsultationsPage = () =>
  import('@/pages/Consultations/Consultations.vue');
const DoctorsPage = () => import('@/pages/Doctors.vue');
const ModerationOfReviewsPage = () => import('@/pages/ModerationOfReviews.vue');
const DoctorRatingPage = () => import('@/pages/DoctorRating/DoctorRating.vue');
// Тестовый роут для проверки компонентов либы
const UIPage = () => import('@/pages/Ui.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Вход' },
      component: AuthPage,
    },
    {
      path: '/lobby',
      name: 'op-doc',
      meta: { title: 'Очередь' },
      component: LobbyPage,
    },
    {
      path: '/lobby/a',
      name: 'doc-admin',
      meta: { title: 'Мониторинг' },
      component: MonitoringPage,
    },
    {
      path: '/calendar',
      name: 'doc-calendar',
      meta: { title: 'Календарь' },
      component: LobbyPage,
    },
    {
      path: '/specialties',
      name: 'doc-specialties',
      meta: { title: 'Управление специальностями' },
      component: DocSpecialitiesPage,
    },
    {
      path: '/consultations',
      name: 'doc-consultations',
      meta: { title: 'История консультаций' },
      component: ConsultationsPage,
    },
    {
      path: '/doctors',
      name: 'doc-edit',
      meta: { title: 'Редактировать врача' },
      component: DoctorsPage,
    },
    {
      path: '/moderator',
      name: 'doc-moderator',
      meta: { title: 'История консультаций' },
      component: ModerationOfReviewsPage,
    },
    {
      path: '/rating-questions',
      name: 'rating-questions',
      meta: { title: 'Оценка консультаций' },
      component: DoctorRatingPage,
    },
    // Тестовый роут для проверки компонентов либы
    {
      path: '/ui',
      name: 'ui',
      meta: { title: 'Ui' },
      component: UIPage,
    },
    { path: '/', redirect: { name: 'login' } },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title as string;
  const authStore = useAuthStore();
  const accountStore = useAccountStore();
  if (to.name !== 'login') {
    if (!authStore.hasAuth) {
      try {
        await authStore.refreshAuth();
        await accountStore.getPersonalData();
      } catch (e) {
        next({ name: 'login' });
      }
    } else if (authStore.hasAuth && !accountStore.userId) {
      await accountStore.getPersonalData();
    }
  }
  next();
});

export default router;
