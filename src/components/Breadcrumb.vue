<template>
    <div class="bg-white rounded-md px-4 py-2 mb-2">
        <nav class="flex items-center space-x-2">
            <ol class="flex items-center space-x-1">
                <li v-for="(item, index) in items" :key="index" class="flex items-center">
                    <router-link :to="item.path" :class="[
                        index === 0 ? 'text-black font-bold' : (isCurrentPage(item.label) ? 'text-blue-400 underline font-bold' : 'text-gray-400'),
                        'text-sm hover:text-blue-500'
                    ]">
                        {{ item.label }}
                    </router-link>
                    <span v-if="index < items.length - 1" class="ml-1 text-gray-400">
                        <Icon icon="icon-park:right" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

interface BreadcrumbItem {
    label: string;
    path: string;
}

export default defineComponent({
    name: 'Breadcrumb',
    components: {
        Icon,
    },
    props: {
        items: {
            type: Array as () => BreadcrumbItem[],
            required: false,
        },
        currentPage: {
            type: String,
            required: false,
        },
    },
    methods: {
        isCurrentPage(label: string): boolean {
            return label === this.currentPage;
        },
    },
});
</script>