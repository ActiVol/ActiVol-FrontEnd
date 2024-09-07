<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div class="flex flex-col items-center justify-between w-full max-w-5xl p-4 sm:p-6 lg:p-8">
            <Header />
            <Breadcrumb :items="breadcrumbItems" :currentPage="currentPage" />
            <div class="bg-white rounded-lg shadow-lg w-full flex flex-col items-center p-4 sm:p-6">
                <slot></slot>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Breadcrumb from './Breadcrumb.vue';

interface BreadcrumbItem {
    label: string;
    path: string;
}

export default defineComponent({
    name: 'Layout',
    components: {
        Header,
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