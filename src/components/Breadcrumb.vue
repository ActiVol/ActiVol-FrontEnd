<template>
    <div class="bg-sky-100 rounded-md px-4 py-1 mb-2">
        <nav class="flex items-center space-x-2">
            <ol class="flex items-center space-x-1">
                <li v-for="(item, index) in items" :key="index" class="flex items-center">
                    <router-link :to="item.path" :class="[
                        index === 0 ? 'text-black font-bold' : (isCurrentPage(item.label) ? 'text-blue-400 underline font-bold' : 'text-gray-400'),
                        'text-sm hover:text-blue-500'
                    ]">
                        {{ item.label }}
                    </router-link>
                    <span v-if="index < items.length - 1" class="ml-1 mt-1 text-gray-400">
                        <iconify-icon icon="icon-park:right"></iconify-icon>
                    </span>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface BreadcrumbItem {
    label: string;
    path: string;
}

export default defineComponent({
    name: 'Breadcrumb',
    props: {
        items: {
            type: Array as () => BreadcrumbItem[],
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