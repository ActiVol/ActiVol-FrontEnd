<template>
    <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
        <div class="w-full max-w-5xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('volunteerActivities.title') }}</h1>
            <router-view v-if="$route.params.id" :activities="activities" />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ActivityCard v-for="activity in activities" :key="activity.id" :activity="activity"
                    @click="navigateToActivity(activity.id)" />
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Layout from '@/components/Layout.vue';
import ActivityCard from '@/components/ActivityCard.vue';
import { ActivityType } from '@/types';

export default defineComponent({
    name: 'VolunteerActivities',
    components: {
        Layout,
        ActivityCard,
    },
    setup() {
        const { t } = useI18n();
        const router = useRouter();

        const breadcrumbItems = [
            { label: t('breadcrumb.home'), path: '/' },
            { label: t('breadcrumb.volunteerActivities'), path: '/activity' },
        ];

        const currentPage = t('breadcrumb.volunteerActivities');

        const activities = ref<ActivityType[]>([
            {
                id: 1,
                title: '社区清洁日',
                description: '帮助清理本地公园和街道，美化我们的社区环境。',
                date: '2023-07-15',
                location: '中心公园',
                volunteersNeeded: 20,
                duration: 3,
                status: 'open',
                posterUrl: 'https://placehold.co/600x800/22c55e/white',
            },
            {
                id: 2,
                title: '老年人科技辅导',
                description: '教导老年人使用智能手机和基本的互联网技能。',
                date: '2023-07-20',
                location: '社区中心',
                volunteersNeeded: 10,
                duration: 2,
                status: 'open',
            },
            {
                id: 3,
                title: '食品银行志愿者',
                description: '协助分类和分发食品给有需要的家庭。',
                date: '2023-07-25',
                location: '市中心食品银行',
                volunteersNeeded: 15,
                duration: 4,
                status: 'full',
                posterUrl: 'https://placehold.co/600x800/3b82f6/white',
            },
            {
                id: 3,
                title: '在线义工培训',
                description: '参加在线培训课程，提升你的义工技能。',
                date: '2023-07-30',
                location: '线上会议',
                volunteersNeeded: 8,
                duration: 2,
                status: 'open',
            },
        ]);

        const navigateToActivity = (id: number) => {
            router.push(`/activity/${id}`);
        };

        return {
            activities,
            breadcrumbItems,
            currentPage,
            navigateToActivity,
        };
    },
});
</script>
