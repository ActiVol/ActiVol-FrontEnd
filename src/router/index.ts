import { createRouter, createWebHistory } from 'vue-router';

import Index from '../views/index.vue';
import SubPage from '../views/subpage.vue';
import NotFound from '../views/404.vue';
import Test from '@/views/test.vue';
import details from '@/views/details.vue';
import selfSubmission from '@/views/Activity/self-submission.vue';
import login from '@/views/user/login.vue';
import forget from '@/views/user/forget.vue';
import about from '@/views/about.vue';
import AdminPanel from '@/views/Admin/AdminPanel.vue';

import VolunteerActivities from '@/views/activityPage.vue'
import ActivityDetail from '@/components/ActivityDetail.vue'

// Define the type of route
// interface Route {
//     path: string;
//     name?: string;
//     component: any; // Can be more strictly defined according to the actual component type
// }

const routes = [
    {
        path: '/',
        component: Index,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/details',
        component: details,
    },
    {
        path: '/self-submission',
        component: selfSubmission,
    },
    {
        path: '/subpage',
        component: SubPage,
    },
    {
        path: '/login',
        component: login,
    },
    {
        path: '/forget',
        component: forget,
    },
    {
        path: '/about',
        component: about,
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: { hideTitle: true },
    },

    {
        path: '/activity',
        name: 'VolunteerActivities',
        component: VolunteerActivities,
        children: [
            {
                path: ':id',
                name: 'ActivityDetail',
                component: ActivityDetail,
            },
        ],
    },

    {
        path: '/admin',
        component: AdminPanel,
        children: [
            { path: '', name: 'Dashboard', component: () => import('@/views/Admin/Dashboard.vue') },
            { path: 'activity', name: 'ActivityManagement', component: () => import('@/views/Admin/ActivityManagement.vue') },
            // { path: 'users', name: 'UserManagement', component: () => import('@/views/Admin/UserManagement.vue') },
            // { path: 'site-settings', name: 'SiteSettings', component: () => import('@/views/Admin/SiteSettings.vue') },
            // { path: 'personal-settings', name: 'PersonalSettings', component: () => import('@/views/Admin/PersonalSettings.vue') },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;