<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <div class="flex flex-col items-center justify-between w-full max-w-5xl p-4 sm:p-6 lg:p-8">
            <Header />
            <div class="flex justify-between w-full items-stretch">
                <div class="items-center">
                <Breadcrumb :items="breadcrumbItems" :currentPage="currentPage" class="" />
            </div>
                <LanguageSelector />
            </div>
            <div class="bg-white rounded-lg shadow-lg w-full flex flex-col items-center p-4 sm:p-6">
                <slot></slot>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Breadcrumb from './Breadcrumb.vue';
import { BreadcrumbItem } from '../types'; // 确保导入接口
import LanguageSelector from '@/components/LanguageSelector.vue';

export default defineComponent({
    name: 'Layout',
    components: {
        Header,
        Footer,
        Breadcrumb,
        LanguageSelector,
    },
    props: {
        breadcrumbItems: {
            type: Array as PropType<BreadcrumbItem[]>,
            required: true,
        },
        currentPage: {
            type: String,
            required: true,
        },
    },
});
</script>