import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'RatingPage',
    component: () => import('@/views/rating/Rating.vue'),
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: () => import('@/views/schedule/Schedule.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
