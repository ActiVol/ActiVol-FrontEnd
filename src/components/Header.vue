<template>
    <header class="w-full flex items-center justify-center mb-6">
        <router-link to="/"
            class="bg-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-lg inline-block hover:bg-blue-700 transition-colors">
            标题/LOGO
        </router-link>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header',
});
</script>