import { createRouter, createWebHistory } from 'vue-router';

import Index from '../views/index.vue';
import SubPage from '../views/subpage.vue';
import NotFound from '../views/404.vue';
import Test from '@/views/test.vue';
import details from '@/views/details.vue';
import selfSubmission from '@/views/Activity/self-submission.vue';

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
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: { hideTitle: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;