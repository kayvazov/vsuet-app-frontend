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
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//
//   const isAuth = store.studentLocalInfo;
//
//   console.log(!isAuth);
//
//   if (to.name !== 'WelcomePage' && isAuth) {
//     next({ name: 'WelcomePage' });
//   } else {
//     next({
//       path: '/',
//     });
//   }
// });

export default router;
