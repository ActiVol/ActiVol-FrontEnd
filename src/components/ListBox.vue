<template>
    <router-link :to="path"
        class="bg-white rounded-lg shadow-lg p-4 flex justify-around items-center hover:bg-gray-100 transition">
        <img 
            class="h-10 w-10 text-gray-500 mr-1" 
            :src="icon"
            alt="icon"
        />
        <div class="ml-1">
            <h2 class="text-lg font-bold text-gray-800">{{ title }}</h2>
            <p class="text-gray-700">{{ content }}</p>
        </div>
        <Icon icon="mdi:chevron-right" class="text-gray-500" class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
    name: 'ListBox',
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
        },
        path: {
            type: String,
            required: true,
        },
    },
});
</script>