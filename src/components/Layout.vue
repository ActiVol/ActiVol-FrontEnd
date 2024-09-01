<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div class="flex flex-col items-center justify-between w-full max-w-5xl p-4 sm:max-lg:p-12 xl:max-2xl:p-24">
            <header class="mb-6 text-center">
                <div class="bg-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-lg inline-block">
                    标题/LOGO
                </div>
            </header>
            <Breadcrumb :items="breadcrumbItems" :currentPage="currentPage" />
            <div class="bg-white rounded-lg shadow-lg flex-grow flex flex-col items-center p-6">
                <!-- <h1 v-if="!$route.meta.hideTitle" class="text-2xl font-bold text-center mb-4">Title</h1> -->
                <!-- Use the slot to insert the content -->
                <slot></slot>
            </div>

            <!-- Footer -->
            <Footer />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './Footer.vue';
import Breadcrumb from './Breadcrumb.vue';

interface BreadcrumbItem {
    label: string;
    path: string;
}

export default defineComponent({
    name: 'Layout',
    components: {
        Footer,
        Breadcrumb,
    },
    props: {
        breadcrumbItems: {
            type: Array as () => BreadcrumbItem[],
            required: false,
        },
        currentPage: {
            type: String,
            required: false,
        },
    },
});
</script>