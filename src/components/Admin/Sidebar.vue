<template>
    <ul class="space-y-2">
        <li v-for="item in items" :key="item.name">
            <router-link v-if="item.to" :to="item.to"
                class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out"
                :class="{ 'bg-blue-100 text-blue-600': isActive(item) }">
                <div :class="{ 'w-full flex justify-center': collapsed }">
                    <Icon v-if="item.icon" :icon="item.icon" class="w-6 h-6 text-gray-500"
                        :class="{ 'mr-3': !collapsed }" />
                </div>
                <span v-if="!collapsed" class="flex-1">{{ item.name }}</span>
            </router-link>
            <div v-else @click="toggleSubmenu(item)"
                class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out"
                :class="{ 'bg-blue-100 text-blue-600': isActive(item) }">
                <div :class="{ 'w-full flex justify-center': collapsed }">
                    <Icon v-if="item.icon" :icon="item.icon" class="w-5 h-5 text-gray-500"
                        :class="{ 'mr-3': !collapsed }" />
                </div>
                <span v-if="!collapsed" class="flex-1">{{ item.name }}</span>
                <Icon v-if="!collapsed && item.children" :icon="item.isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                    class="w-5 h-5 text-gray-500" />
            </div>
            <div v-if="!collapsed && item.children && item.isOpen" :class="{ 'ml-8': item.icon, 'ml-9': !item.icon }">
                <Sidebar :items="item.children" :collapsed="collapsed" />
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { reactive, watch } from 'vue'

const route = useRoute()

interface MenuItem {
    name: string
    icon?: string
    to?: string
    children?: MenuItem[]
    isOpen?: boolean
}

const props = defineProps<{
    items: MenuItem[]
    collapsed: boolean
}>()

const toggleSubmenu = (item: MenuItem) => {
    if (item.children) {
        item.isOpen = !item.isOpen
    }
}

const isActive = (item: MenuItem): boolean => {
    if (item.to) {
        return route.path === item.to
    }
    return item.children ? item.children.some(isActive) : false
}

// Make items reactive to ensure changes are reflected in the template
const reactiveItems = reactive(props.items)

// Watch for route changes to update active states
watch(
    () => route.path,
    () => {
        updateActiveStates(reactiveItems)
    }
)

const updateActiveStates = (items: MenuItem[]) => {
    items.forEach(item => {
        if (item.children) {
            item.isOpen = isActive(item)
            updateActiveStates(item.children)
        }
    })
}

// Initial update of active states
updateActiveStates(reactiveItems)
</script>