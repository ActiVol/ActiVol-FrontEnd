<template>
    <div class="mx-auto py-2 px-4 bg-white mb-4 rounded-lg">
        <nav class="flex items-center justify-center">
        <ol class="flex items-center space-x-2">
            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <div v-if="index === 0" class="flex items-center">
                    <Icon icon="mdi:home" class="w-5 h-5 text-blue-500 mr-1" />
                </div>
                <router-link :to="item.path" :class="[
                    isCurrentPage(item.label) ? 'font-bold text-blue-600' : 'text-blue-500',
                    'text-sm hover:text-blue-700 hover:decoration-dashed transition-colors'
                ]">
                    {{ item.label }}
                </router-link>
                <Icon v-if="index < items.length - 1" icon="mdi:chevron-right" class="w-5 h-5 text-blue-400 mx-1" />
            </li>
        </ol>
    </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Icon } from '@iconify/vue';
import { BreadcrumbItem } from '../types'; // 从 types.ts 导入接口

export default defineComponent({
    name: 'Breadcrumb',
    components: {
        Icon,
    },
    props: {
        items: {
            type: Array as PropType<BreadcrumbItem[]>,
            required: true,
        },
        currentPage: {
            type: String,
            required: true,
        },
    },
    methods: {
        isCurrentPage(label: string): boolean {
            return label === this.currentPage;
        },
    },
});
</script>