<template>
    <router-link :to="path"
        class="bg-white rounded-lg shadow-lg p-4 flex justify-around items-center hover:bg-gray-100 transition">
        <img 
            class="h-10 w-10 text-gray-500 mr-2 my-2" 
            :src="icon"
            alt="icon"
        />
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