<template>
    <aside
        class="bg-white text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-lg">
        <div class="flex items-center space-x-2 px-4">
            <Icon icon="mdi:school" class="w-8 h-8 text-primary" />
            <span class="text-2xl font-extrabold text-primary">VolunteerAdmin</span>
        </div>
        <nav>
            <template v-for="item in menuItems" :key="item.name">
                <a @click="setActiveItem(item.name)"
                    class="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-primary hover:text-white"
                    :class="{ 'bg-primary text-white': activeItem === item.name }">
                    <Icon :icon="item.icon" class="inline-block mr-2" />
                    {{ item.name }}
                </a>
            </template>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['change-view'])

const menuItems = [
    { name: 'Dashboard', icon: 'mdi:view-dashboard' },
    { name: 'ActivityManagement', icon: 'mdi:calendar' },
    { name: 'UserManagement', icon: 'mdi:account-group' },
    { name: 'SiteSettings', icon: 'mdi:cog' },
    { name: 'PersonalSettings', icon: 'mdi:account-cog' },
]

const activeItem = ref('Dashboard')

const setActiveItem = (item: string) => {
    activeItem.value = item
    emit('change-view', item)
}
</script>

<style scoped>
.text-primary {
    color: var(--primary-color);
}

.bg-primary {
    background-color: var(--primary-color);
}
</style>