<template>
    <Layout :breadcrumbItems="breadcrumbItems" currentPage="Home">
        <div class="bg-gray-50 rounded-lg shadow-inner px-4 sm:px-6 py-6 sm:py-8 w-full">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Welcome to Volunteer Hours Tracker
            </h1>
            <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Track and manage your volunteer hours efficiently
                with our easy-to-use platform.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ListBox v-for="(item, index) in listBoxItems" :key="index" :icon="item.icon" :title="item.title"
                    :content="item.content" :path="item.path" :color="item.color" />
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';
import ListBox from '../components/ListBox.vue';
import { BreadcrumbItem, ListBoxItem } from '../types'; // 导入接口

export default defineComponent({
    name: 'IndexView',
    components: {
        Layout,
        ListBox,
    },
    data() {
        return {
            breadcrumbItems: [
                { label: 'Home', path: '/' },
            ] as BreadcrumbItem[],
            listBoxItems: [
                { icon: 'mdi:clipboard-text', title: 'Log Hours', content: 'Record your volunteer activities and hours', path: '/log-hours', color: 'blue' },
                { icon: 'mdi:chart-bar', title: 'View Statistics', content: 'Analyze your volunteering data and impact', path: '/statistics', color: 'green' },
                { icon: 'mdi:account-group', title: 'Manage Organizations', content: 'Add and edit volunteer organizations', path: '/organizations', color: 'yellow' },
                { icon: 'mdi:certificate', title: 'Certificates', content: 'Generate and download certificates', path: '/certificates', color: 'indigo' },
                { icon: 'mdi:cog', title: 'Settings', content: 'Customize your account preferences', path: '/settings', color: 'purple' },
            ] as ListBoxItem[],
        };
    },
});
</script>