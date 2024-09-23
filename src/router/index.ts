import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
import Index from '@/views/index.vue';
import SubPage from '@/views/subpage.vue';
import NotFound from '@/views/404.vue';
import Test from '@/views/test.vue';
import details from '@/views/details.vue';
import selfSubmission from '@/views/Activity/self-submission.vue';
import login from '@/views/user/login.vue';
import forget from '@/views/user/forget.vue';
import about from '@/views/about.vue';
import AdminPanel from '@/views/Admin/AdminPanel.vue';
import VolunteerActivities from '@/views/activityPage.vue';
import ActivityDetail from '@/components/ActivityDetail.vue';
import AuthGuard from '@/components/AuthGuard.vue';

const routes = [
    { path: '/', component: Index },
    { path: '/test', component: Test },
    { path: '/details', component: details },
    { path: '/self-submission', component: selfSubmission },
    { path: '/subpage', component: SubPage },
    { path: '/login', component: login },
    { path: '/forget', component: forget },
    { path: '/about', component: about },
    {
        path: '/admin',
        component: AdminPanel,
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            { path: '', name: 'Dashboard', component: () => import('@/views/Admin/Dashboard.vue') },
            { path: 'activity', name: 'ActivityManagement', component: () => import('@/views/Admin/ActivityManagement.vue') },
            { path: 'users', name: 'UserManagement', component: () => import('@/views/Admin/UserManagement.vue') },
        ],
    },
    { path: '/auth-guard', component: AuthGuard, name: 'AuthGuard' },
    { path: '/:pathMatch(.*)*', component: NotFound, meta: { hideTitle: true } },
    {
        path: '/activity',
        name: 'VolunteerActivities',
        component: VolunteerActivities,
        children: [
            { path: ':id', name: 'ActivityDetail', component: ActivityDetail },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore();
    const isLoggedIn = !!localStorage.getItem('token');

    if (isLoggedIn && !userStore.isLoggedIn) {
        await userStore.fetchUser();
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            next({ name: 'AuthGuard' });
        } else if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (userStore.user.isAdmin === 1 || userStore.user.isAdmin === 2) {
                next();
            } else {
                next({ name: 'AuthGuard' });
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;