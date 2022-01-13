import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/offers',
    name: 'offers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/components/Offers.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
