import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Header',
    component: () => import('@/components/Header.vue'),
    children: [
      {
        path: 'offers',
        name: 'offers',
        component: () => import('@/components/Offers.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
