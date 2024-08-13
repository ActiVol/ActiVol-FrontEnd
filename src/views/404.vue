<template>
    <Layout>
        <div class="flex flex-col items-center justify-center rounded-md bg-gray-100 p-6">
            <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-rose-500 text-center drop-shadow-lg">404</h1>
            <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-blue-600 text-center drop-shadow-xl">Page Not Found</h1>
            <p class="text-gray-600 mb-4 text-lg text-center">The page you are looking for does not exist.</p>
            <router-link to="/"
                class="bg-blue-500 text-white hover:bg-blue-400 px-6 py-3 rounded-lg shadow transition duration-200 transform hover:scale-105">
                Return to Home
            </router-link>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';

export default defineComponent({
    components: { 
        Layout 
    },
    name: 'NotFound',
});
</script>