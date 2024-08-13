import { createRouter, createWebHistory } from 'vue-router';

import Index from '../views/index.vue';
import SubPage from '../views/subpage.vue';

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
        path: '/subpage',
        component: SubPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;