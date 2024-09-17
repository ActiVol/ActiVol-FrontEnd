<template>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        @click="$emit('click')">
        <div class="relative">
            <div v-if="activity.posterUrl" class="h-48 overflow-hidden">
                <img :src="activity.posterUrl" :alt="activity.title" class="w-full h-full object-cover" />
            </div>
            <div v-else :class="['h-48 flex items-center justify-center', gradientClass]">
                <span class="text-4xl text-white">{{ activity.title.charAt(0) }}</span>
            </div>
            <div class="absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs font-bold"
                :class="getStatusClass(activity.status)">
                {{ $t(`activityCard.status.${activity.status}`) }}
            </div>
        </div>
        <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ activity.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ truncateDescription(activity.description) }}</p>
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center text-sm text-gray-500">
                    <Icon icon="mdi:calendar" class="w-4 h-4 mr-1" />
                    {{ formatDate(activity.date) }}
                </div>
                <div class="flex items-center text-sm text-gray-500">
                    <Icon icon="mdi:clock-outline" class="w-4 h-4 mr-1" />
                    {{ activity.duration }} {{ $t('activityCard.hours') }}
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                    <Icon icon="mdi:map-marker" class="w-4 h-4 mr-1" />
                    {{ activity.location }}
                </div>
                <div class="flex items-center text-sm font-medium text-indigo-600">
                    <Icon icon="mdi:account-group" class="w-4 h-4 mr-1" />
                    {{ $t('activityCard.volunteersNeeded', { count: activity.volunteersNeeded }) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { ActivityType } from '@/types';

const gradients = {
    blue: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    green: 'bg-gradient-to-br from-green-400 to-emerald-600',
    purple: 'bg-gradient-to-br from-purple-400 to-fuchsia-600',
    orange: 'bg-gradient-to-br from-orange-400 to-red-600',
    teal: 'bg-gradient-to-br from-teal-400 to-cyan-600',
};

export default defineComponent({
    name: 'ActivityCard',
    components: {
        Icon,
    },
    props: {
        activity: {
            type: Object as PropType<ActivityType>,
            required: true,
        },
    },
    setup(props) {
        const { t } = useI18n();

        const gradientClass = computed(() => {
            if (props.activity.gradientColor && gradients[props.activity.gradientColor as keyof typeof gradients]) {
                return gradients[props.activity.gradientColor as keyof typeof gradients];
            }
            const colors = Object.values(gradients);
            return colors[Math.floor(Math.random() * colors.length)];
        });

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        };

        const getStatusClass = (status: string) => {
            switch (status) {
                case 'open':
                    return 'bg-green-500 text-white';
                case 'full':
                    return 'bg-yellow-500 text-white';
                case 'closed':
                    return 'bg-red-500 text-white';
                default:
                    return 'bg-gray-500 text-white';
            }
        };

        const truncateDescription = (description: string, maxLength = 100) => {
            return description.length > maxLength
                ? description.substring(0, maxLength) + '...'
                : description;
        };

        return { formatDate, getStatusClass, truncateDescription, t, gradientClass };
    },
});
</script>