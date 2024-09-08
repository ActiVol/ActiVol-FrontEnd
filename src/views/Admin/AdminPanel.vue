<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <aside class="bg-white w-64 hidden md:flex flex-col">
            <div class="p-4 flex items-center">
                <img src="https://placehold.co/50x50/22c55e/white" alt="Logo" class="w-8 h-8 mr-2 rounded-full">
                <span class="text-xl font-semibold text-gray-800">Admin Panel</span>
            </div>
            <nav class="flex-1 overflow-y-auto">
                <router-link v-for="item in navItems" :key="item.name" :to="item.to"
                    class="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600"
                    :class="{ 'bg-purple-100 text-purple-600': currentRoute === item.to }">
                    <Icon :icon="item.icon" class="w-5 h-5 mr-3" />
                    {{ item.name }}
                </router-link>
            </nav>
        </aside>

        <!-- Main content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top navbar -->
            <header class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Mobile menu button -->
                            <button @click="toggleSidebar"
                                class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                                <Icon icon="mdi:menu" class="h-6 w-6" />
                            </button>
                            <!-- Search bar -->
                            <div class="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-start">
                                <div class="max-w-lg w-full lg:max-w-xs">
                                    <label for="search" class="sr-only">Search</label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Icon icon="mdi:magnify" class="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input id="search" name="search"
                                            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Search" type="search">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <!-- Notification bell -->
                            <button
                                class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                <span class="sr-only">View notifications</span>
                                <Icon icon="mdi:bell" class="h-6 w-6" />
                            </button>
                            <!-- Profile dropdown -->
                            <div class="ml-3 relative">
                                <div>
                                    <button @click="toggleProfileMenu"
                                        class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        id="user-menu" aria-expanded="false" aria-haspopup="true">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="">
                                    </button>
                                </div>
                                <div v-if="isProfileMenuOpen"
                                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem">Your Profile</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem">Settings</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem">Sign out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const currentRoute = computed(() => route.path)

const navItems = [
    { name: 'Dashboard', icon: 'mdi:view-dashboard', to: '/admin/' },
    { name: 'Activity', icon: 'mdi:clipboard-text', to: '/admin/activity' },
    // { name: 'Menus', icon: 'mdi:food', to: '/admin/menus' },
    // { name: 'Customers', icon: 'mdi:account-group', to: '/admin/customers' },
    // { name: 'Analytics', icon: 'mdi:chart-bar', to: '/admin/analytics' },
]

const isProfileMenuOpen = ref(false)
const isSidebarOpen = ref(false)

const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
/* Add any additional styles here */
</style>