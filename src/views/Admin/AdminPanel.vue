<template>
    <div class="flex h-screen bg-gray-50">
        <!-- Sidebar -->
        <aside :class="`bg-blue-100 fixed left-0 top-16 h-[calc(100%-4rem)] z-20 transition-all duration-300 ease-in-out ${isMobile
                ? isSidebarOpen ? 'w-64' : '-ml-5 w-0'
                : isSidebarOpen ? 'w-64' : 'w-20'
            }`" class="flex flex-col border-r border-blue-200 overflow-hidden">
            <nav class="flex-1 overflow-y-auto pt-4">
                <router-link v-for="item in navItems" :key="item.name" :to="item.to"
                    class="flex items-center px-6 py-2 text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    :class="{ 'bg-blue-200 text-blue-800': currentRoute === item.to, 'justify-center': !isSidebarOpen }">
                    <Icon :icon="item.icon" class="w-5 h-5" :class="{ 'mr-3': isSidebarOpen }" />
                    <span v-if="isSidebarOpen">{{ item.name }}</span>
                </router-link>
            </nav>
        </aside>

        <!-- Overlay for mobile -->
        <div v-if="isSidebarOpen && isMobile" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
            @click="toggleSidebar"></div>

        <!-- Main content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top navbar -->
            <header class="bg-white shadow-sm fixed w-full top-0 z-30">
                <div class="max-w-full px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <!-- Mobile menu button -->
                            <button @click="toggleSidebar"
                                class="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                <Icon icon="mdi:menu" class="h-6 w-6" />
                            </button>
                            <!-- Logo and title -->
                            <div class="flex-shrink-0 flex items-center ml-4">
                                <img src="https://placehold.co/50x50/22c55e/white" alt="Logo"
                                    class="w-8 h-8 rounded-full">
                                <span class="ml-2 text-xl font-semibold text-gray-800">Admin Panel</span>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <!-- Search bar -->
                            <!-- <div class="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <div class="max-w-lg w-full lg:max-w-xs">
                                    <label for="search" class="sr-only">Search</label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Icon icon="mdi:magnify" class="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input id="search" name="search"
                                            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Search" type="search">
                                    </div>
                                </div>
                            </div> -->
                            <!-- Notification bell -->
                            <button
                                class="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span class="sr-only">View notifications</span>
                                <Icon icon="mdi:bell" class="h-6 w-6" />
                            </button>
                            <!-- Profile dropdown -->
                            <div class="ml-3 relative">
                                <div>
                                    <button @click="toggleProfileMenu"
                                        class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 mt-16"
                :class="{ 'md:ml-64': isSidebarOpen, 'md:ml-20': !isSidebarOpen }">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const currentRoute = computed(() => route.path)

const navItems = [
    { name: 'Dashboard', icon: 'mdi:view-dashboard', to: '/admin' },
    { name: 'Activity', icon: 'mdi:clipboard-text', to: '/admin/activity' },
    // { name: 'Menus', icon: 'mdi:food', to: '/admin/menus' },
    // { name: 'Customers', icon: 'mdi:account-group', to: '/admin/customers' },
    // { name: 'Analytics', icon: 'mdi:chart-bar', to: '/admin/analytics' },
]

const isProfileMenuOpen = ref(false)
const isSidebarOpen = ref(true)
const isMobile = ref(false)

const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
    if (isMobile.value) {
        isSidebarOpen.value = false
    } else {
        isSidebarOpen.value = true
    }
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})
</script>
