<template>
    <router-link :to="path"
        class="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center hover:bg-gray-100 transition">
        <div>
            <h2 class="text-lg font-bold text-gray-800">{{ title }}</h2>
            <p class="text-gray-700">{{ content }}</p>
        </div>
        <iconify-icon icon="mdi:chevron-right" class="text-gray-500"></iconify-icon>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ListBox',
    props: {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
});
</script>