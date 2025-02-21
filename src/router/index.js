import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: 'app.BrowserTitle' },
  },
  { path: '/home', name:'home', component: () => import('../view/index.vue')},
  { path: '/userDetails', name:'details', component: () => import('../view/userDetails.vue')},
  { path: '/selfSubmission', name:'selfSubmission', component: () => import('../view/selfSubmission.vue')},
  { path: '/activity', name:'VolunteerActivities', component: () => import('../view/activityPage.vue'),
  },
  { path: '/activityDetail', name: 'activityDetail', component: () => import('../view/activityDetail.vue') },
  { path: '/login', ame:'login', component: () => import('../view/auth.vue'), meta: { tab: 'login' }},
  { path: '/register', name:'register', component: () => import('../view/auth.vue'), meta: { tab: 'register' }},
  { path: '/forget', name:'forget', component: () => import('../view/auth.vue'), meta: { tab: 'forget' }},
  { path: '/agreement', name:'agreement', component: () => import('../view/agreement.vue')},
  { path: '/privacy', name:'privacy', component: () => import('../view/privacy.vue')},
  { path: '/resetPasswordByUrl/:uuid', name:'resetPasswordByUrl', component: () => import('../view/resetPasswordByUrl.vue')},
  { path: '/google', name:'google', component: () => import('../components/test/Google-Auth.vue')},
  { path: '/404', name:'404',component: () => import('../view/404.vue'), hidden: true },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
  { path: '/socialLogin',component: () => import('../view/socialLogin.vue'),
    hidden: true
  },
];

const router = createRouter({
  base:'/',
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;