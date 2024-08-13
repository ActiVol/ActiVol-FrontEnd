<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img 
            src="https://placehold.co/600x400/2563eb/white?text=LOGO" 
            alt="logo"
            class="w-32 h-auto rounded-lg shadow-lg mb-6"
        />
        <div class="bg-white rounded-lg shadow-lg p-6 mx-4 max-w-md w-full">
            <h1 class="text-2xl font-bold text-center mb-4">Title</h1>
            <!-- Use the slot to insert the content -->
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Layout',
});
</script>