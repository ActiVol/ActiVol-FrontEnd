<template>
    <header class="mb-6 text-center">
        <router-link to="/" class="bg-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-lg inline-block">
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