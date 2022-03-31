import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/offers',
    name: 'offers',
    component: () => import('@/views/Offers.vue'),
  },
  {
    path: '/deliveries',
    name: 'Mailing',
    component: () => import('@/views/Mailing.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isEmpty) next({ name: 'offers' });
      else next();
    },
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
