<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const stats = ref([
    { name: 'Total Users', value: 0, icon: 'mdi:account-group' },
    { name: 'Active Activities', value: 0, icon: 'mdi:calendar-check' },
    { name: 'Total Volunteer Hours', value: 0, icon: 'mdi:clock-outline' },
    { name: 'Pending Approvals', value: 0, icon: 'mdi:clock-alert' },
])

onMounted(() => {
    // Simulate API call to fetch dashboard data
    setTimeout(() => {
        stats.value = [
            { name: 'Total Users', value: 1234, icon: 'mdi:account-group' },
            { name: 'Active Activities', value: 56, icon: 'mdi:calendar-check' },
            { name: 'Total Volunteer Hours', value: 7890, icon: 'mdi:clock-outline' },
            { name: 'Pending Approvals', value: 23, icon: 'mdi:clock-alert' },
        ]
    }, 1000)
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in stats" :key="item.name" class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">{{ item.name }}</p>
                    <p class="text-3xl font-semibold text-gray-800">{{ item.value }}</p>
                </div>
                <Icon :icon="item.icon" class="text-4xl text-blue-500" />
            </div>
        </div>
    </div>
</template>