<template>
    <nav class="h-full bg-gradient-to-b from-gray-50 to-white border-r border-gray-200">
        <ul class="py-2 px-2 space-y-0.5">
            <li v-for="item in items" :key="item.name">
                <router-link v-if="item.to" :to="item.to"
                    class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out"
                    :class="{ 'bg-blue-50 text-blue-600 shadow-sm': isActive(item) }">
                    <div :class="{ 'w-full flex justify-center': collapsed }">
                        <Icon v-if="item.icon" :icon="item.icon" class="w-5 h-5" :class="[
                            { 'mr-2': !collapsed },
                            isActive(item) ? 'text-blue-500' : 'text-gray-400'
                        ]" />
                    </div>
                    <span v-if="!collapsed" class="flex-1 text-sm">{{ item.name }}</span>
                </router-link>
                <div v-else @click="toggleSubmenu(item)"
                    class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out"
                    :class="{ 'bg-blue-50 text-blue-600 shadow-sm': isActive(item) }">
                    <div :class="{ 'w-full flex justify-center': collapsed }">
                        <Icon v-if="item.icon" :icon="item.icon" class="w-5 h-5" :class="[
                            { 'mr-2': !collapsed },
                            isActive(item) ? 'text-blue-500' : 'text-gray-400'
                        ]" />
                    </div>
                    <span v-if="!collapsed" class="flex-1 text-sm">{{ item.name }}</span>
                    <Icon v-if="!collapsed && item.children" :icon="item.isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                        class="w-4 h-4 text-gray-400" />
                </div>
                <div v-if="!collapsed && item.children && item.isOpen" class="ml-4 space-y-0.5">
                    <Sidebar :items="item.children" :collapsed="collapsed" />
                </div>
            </li>
        </ul>
    </nav>
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