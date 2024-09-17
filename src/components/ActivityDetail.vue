<template>
    <div v-if="activity" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="relative">
            <div v-if="activity.posterUrl" class="h-64 md:h-96 overflow-hidden">
                <img :src="activity.posterUrl" :alt="activity.title" class="w-full h-full object-cover" />
                <button @click="showFullImage = true"
                    class="absolute bottom-4 right-4 bg-white bg-opacity-75 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-100 transition-colors">
                    {{ $t('activityDetail.viewFullImage') }}
                </button>
            </div>
            <div v-else :class="['h-64 md:h-96 flex items-center justify-center', gradientClass]">
                <span class="text-6xl text-white">{{ activity.title.charAt(0) }}</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h2 class="text-3xl font-bold text-white mb-2">{{ activity.title }}</h2>
                <div class="inline-block px-3 py-1 rounded-full text-sm font-bold text-white"
                    :class="getStatusClass(activity.status)">
                    {{ $t(`activityDetail.status.${activity.status}`) }}
                </div>
            </div>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2 space-y-4">
                    <p class="text-gray-700">{{ activity.description }}</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex items-center text-gray-600">
                            <Icon icon="mdi:calendar" class="w-5 h-5 mr-2 text-indigo-500" />
                            <span>{{ formatDate(activity.date) }}</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <Icon icon="mdi:clock-outline" class="w-5 h-5 mr-2 text-indigo-500" />
                            <span>{{ activity.duration }} {{ $t('activityDetail.hours') }}</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <Icon icon="mdi:map-marker" class="w-5 h-5 mr-2 text-indigo-500" />
                            <span>{{ activity.location }}</span>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <Icon icon="mdi:account-group" class="w-5 h-5 mr-2 text-indigo-500" />
                            <span>{{ $t('activityDetail.volunteersNeeded', { count: activity.volunteersNeeded })
                                }}</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="text-xl font-semibold mb-4">{{ $t('activityDetail.signUp') }}</h3>
                    <form @submit.prevent="submitApplication" class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">{{
                                $t('activityDetail.name') }}</label>
                            <input type="text" id="name" v-model="application.name" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">{{
                                $t('activityDetail.email') }}</label>
                            <input type="email" id="email" v-model="application.email" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700">{{
                                $t('activityDetail.message') }}</label>
                            <textarea id="message" v-model="application.message" rows="4"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                        </div>
                        <button type="submit"
                            class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                            {{ $t('activityDetail.apply') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Full Image Modal -->
        <div v-if="showFullImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            @click="showFullImage = false">
            <div class="max-w-4xl max-h-full p-4">
                <img :src="activity.posterUrl" :alt="activity.title" class="max-w-full max-h-full object-contain" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { ActivityType } from '@/types';

interface ApplicationType {
    name: string;
    email: string;
    message: string;
}

const gradients = {
    blue: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    green: 'bg-gradient-to-br from-green-400 to-emerald-600',
    purple: 'bg-gradient-to-br from-purple-400 to-fuchsia-600',
    orange: 'bg-gradient-to-br from-orange-400 to-red-600',
    teal: 'bg-gradient-to-br from-teal-400 to-cyan-600',
};

export default defineComponent({
    name: 'ActivityDetail',
    components: {
        Icon,
    },
    props: {
        activities: {
            type: Array as PropType<ActivityType[]>,
            required: true,
        },
    },
    setup(props) {
        const { t } = useI18n();
        const route = useRoute();
        const showFullImage = ref(false);

        const activity = computed(() => {
            const id = Number(route.params.id);
            return props.activities.find(a => a.id === id);
        });

        const gradientClass = computed(() => {
            if (activity.value?.gradientColor && gradients[activity.value.gradientColor as keyof typeof gradients]) {
                return gradients[activity.value.gradientColor as keyof typeof gradients];
            }
            const colors = Object.values(gradients);
            return colors[Math.floor(Math.random() * colors.length)];
        });

        const application = reactive<ApplicationType>({
            name: '',
            email: '',
            message: '',
        });

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        };

        const getStatusClass = (status: string) => {
            switch (status) {
                case 'open':
                    return 'bg-green-500';
                case 'full':
                    return 'bg-yellow-500';
                case 'closed':
                    return 'bg-red-500';
                default:
                    return 'bg-gray-500';
            }
        };

        const submitApplication = () => {
            // Implement application submission logic
            console.log('Submitting application:', application);
            // Reset form after submission
            application.name = '';
            application.email = '';
            application.message = '';
            alert(t('activityDetail.applicationSubmitted'));
        };

        return {
            activity,
            formatDate,
            getStatusClass,
            submitApplication,
            application,
            t,
            showFullImage,
            gradientClass
        };
    },
});
</script>