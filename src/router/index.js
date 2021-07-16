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
    component: () => import('@/views/settings/Index'),
    children: [
      {
        path: '/',
        name: 'Settings',
        component: () => import('@/views/settings/Main'),
      },
      {
        path: 'user/edit',
        name: 'SettingsUserEdit',
        component: () => import('@/views/settings/UpdateStudentInfo'),
      },
    ],
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
