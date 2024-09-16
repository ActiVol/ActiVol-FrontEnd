<template>
    <Layout :breadcrumbItems="breadcrumbItems" currentPage="Home">
    <!-- <LanguageSelector /> -->
        <div class="bg-gray-50 rounded-lg shadow-inner px-4 sm:px-6 py-6 sm:py-8 w-full">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{{ $t('index.welcomeMessage') }}</h1>
            <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{{ $t('index.welcomeDescription') }}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <ListBox v-for="(item, index) in listBoxItems" :key="index" :icon="item.icon" :title="$t(item.title)"
                    :content="$t(item.content)" :path="item.path" :color="item.color" />
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Layout from '../components/Layout.vue';
import ListBox from '../components/ListBox.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';

export default defineComponent({
    name: 'IndexView',
    components: {
        Layout,
        ListBox,
        LanguageSelector,
    },
    setup() {
        const { t } = useI18n();
        
        const breadcrumbItems = ref([
            { label: t('breadcrumb.home'), path: '/' },
        ]);

        const listBoxItems = ref([
            { icon: 'mdi:clipboard-text', title: 'index.logHours', content: 'index.logHoursContent', path: '/self-submission', color: 'blue' },
            { icon: 'mdi:chart-bar', title: 'index.viewStatistics', content: 'index.viewStatisticsContent', path: '/details', color: 'green' },
            // { icon: 'mdi:certificate', title: 'index.certificates', content: 'index.certificatesContent', path: '/certificates', color: 'indigo' },
            { icon: 'mdi:information', title: 'index.about', content: 'index.aboutContent', path: '/about', color: 'purple' },
            { icon: 'mdi:account-group', title: 'index.management', content: 'index.managementContent', path: '/admin', color: 'yellow' },
        ]);

        return {
            breadcrumbItems,
            listBoxItems,
            t,
        };
    },
});
</script>