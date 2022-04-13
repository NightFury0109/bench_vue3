import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    // beforeEnter: (to, from, next) => {
    //   if (store.dispatch('fetchAccessToken')) next({ name: 'offers' });
    // },
  },
  {
    path: '/offers',
    name: 'offers',
    component: () => import('@/views/OffersPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.accessToken) next({ name: 'Login' });
  else next();
});

export default router;
