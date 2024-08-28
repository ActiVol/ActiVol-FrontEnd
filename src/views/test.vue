<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
            <header class="mb-8 text-center">
                <div class="bg-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-lg inline-block mb-4">
                    LOGO
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Volunteer Hours Tracker</h1>
                <p class="text-blue-600">Record and manage your volunteer activities</p>
            </header>

            <main class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div class="space-y-4">
                    <div v-for="box in boxes" :key="box.id"
                        class="bg-blue-50 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                        <button class="w-full text-left p-4 flex items-center justify-between focus:outline-none"
                            @click="toggleBox(box.id)">
                            <div class="flex items-center space-x-3">
                                <Icon icon="mdi:pencil" class="w-6 h-6 text-blue-500" />
                                <span class="font-semibold text-blue-700">{{ box.title }}</span>
                            </div>
                            <Icon icon="mdi:chevron-right"
                                class="w-5 h-5 text-blue-500 transition-transform duration-300"
                                :class="{ 'transform rotate-90': activeBox === box.id }" />
                        </button>
                        <div v-if="activeBox === box.id" class="px-4 pb-4 text-blue-600">
                            <p>{{ box.content }}</p>
                            <!-- Add more content or form elements here as needed -->
                        </div>
                    </div>
                </div>
            </main>

            <footer class="mt-8 text-center text-blue-600 text-sm">
                © {{ new Date().getFullYear() }} Volunteer Hours Tracker. All rights reserved.
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const activeBox = ref(null)

const boxes = [
    { id: 1, title: 'Record Hours', content: 'Enter your volunteer hours here.' },
    { id: 2, title: 'View Statistics', content: 'Check your total hours and progress.' },
    { id: 3, title: 'Manage Profile', content: 'Update your personal information.' },
]

const toggleBox = (id) => {
    activeBox.value = activeBox.value === id ? null : id
}
</script>