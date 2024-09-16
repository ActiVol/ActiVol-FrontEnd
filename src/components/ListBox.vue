<template>
    <router-link :to="path"
        class="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-white h-full flex flex-col">
        <div class="p-4 sm:p-6 flex items-start space-x-3 sm:space-x-4 flex-grow">
            <div :class="[`rounded-full p-2 sm:p-3 flex-shrink-0`, iconBgColor]">
                <Icon :icon="icon" class="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </div>
            <div class="flex-1 min-w-0">
                <h2 class="text-base sm:text-lg font-semibold text-gray-900 truncate">{{ title }}</h2>
                <p class="mt-1 text-xs sm:text-sm text-gray-500">{{ content }}</p>
            </div>
            <div class="flex-shrink-0 self-center ml-2">
                <Icon icon="mdi:chevron-right" class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
        </div>
        <div :class="[`h-1 w-full mt-auto`, accentColor]"></div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
    name: 'ListBox',
    components: {
        Icon,
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: false,
            default: '',
        },
        path: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const iconBgColor = computed(() => {
            switch (props.color) {
                case 'blue': return 'bg-blue-100';
                case 'green': return 'bg-green-100';
                case 'yellow': return 'bg-yellow-100';
                case 'indigo': return 'bg-indigo-100';
                case 'purple': return 'bg-purple-100';
                case 'red': return 'bg-red-100';
                case 'lime': return 'bg-lime-100';
                default: return 'bg-gray-100';
            }
        });

        const accentColor = computed(() => {
            switch (props.color) {
                case 'blue': return 'bg-blue-500';
                case 'green': return 'bg-green-500';
                case 'yellow': return 'bg-yellow-500';
                case 'indigo': return 'bg-indigo-500';
                case 'purple': return 'bg-purple-500';
                case 'red': return 'bg-red-500';
                case 'lime': return 'bg-lime-500';
                default: return 'bg-gray-500';
            }
        });

        return {
            iconBgColor,
            accentColor,
        };
    },
});
</script>