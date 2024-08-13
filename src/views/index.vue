<template>
    <Layout>
        <Breadcrumb :items="breadcrumbItems" currentPage="Home" />
        <div class="bg-amber-100 rounded-md px-4 py-3">
            <p class="text-gray-700">This is a small container content.</p>
            <!-- Boxes area -->
            <div class="grid grid-cols-1 gap-4 mt-4">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-lg font-bold text-gray-800">Box 1</h2>
                    <p class="text-gray-700">This is the content for box 1.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-lg font-bold text-gray-800">Box 2</h2>
                    <p class="text-gray-700">This is the content for box 2.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-lg font-bold text-gray-800">Box 3</h2>
                    <p class="text-gray-700">This is the content for box 3.</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';
import Breadcrumb from '../components/Breadcrumb.vue';

export default defineComponent({
    name: 'IndexView',
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