<template>
    <Layout>
        <Breadcrumb :items="breadcrumbItems" currentPage="SubPage" />
        <div class="bg-gray-200 rounded-md p-4">
            <p class="text-center text-gray-700">This is the content for the subpage.</p>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

export default defineComponent({
    name: 'SubPage',
    components: {
        Layout,
        Breadcrumb,
    },
    data() {
        return {
            breadcrumbItems: [
                { label: 'Home', path: '/' },
                { label: 'SubPage', path: '/subpage' },
                { label: 'CurrentPage', path: '/current' },
            ],
        };
    },
});
</script>