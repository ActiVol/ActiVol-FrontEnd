<template>
    <header class="bg-white shadow-md py-4 px-6">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-gray-800">{{ currentView }}</h1>
            <div class="relative">
                <button @click="toggleUserMenu"
                    class="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-200">
                    <img class="h-8 w-8 rounded-full border-2 border-white" src="https://via.placeholder.com/150"
                        alt="User avatar" />
                    <span>John Doe</span>
                    <Icon icon="mdi:chevron-down" />
                </button>
                <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps<{
    currentView: string
}>()

const userMenuOpen = ref(false)

const toggleUserMenu = () => {
    userMenuOpen.value = !userMenuOpen.value
}
</script>

<style scoped>
.bg-primary {
    background-color: var(--primary-color);
}

.bg-primary-dark {
    background-color: #2980b9;
}
</style>