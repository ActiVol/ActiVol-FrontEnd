<template>
    <div class="flex h-screen bg-gray-50">
        <!-- Sidebar -->
        <aside :class="`bg-white fixed left-0 top-16 h-[calc(100%-4rem)] z-20 transition-all duration-300 ease-in-out ${isMobile ? (isSidebarOpen ? 'w-64' : '-ml-64') : isSidebarOpen ? 'w-64' : 'w-20'
            }`" class="flex flex-col border-r border-blue-100 overflow-hidden">
            <nav class="flex-1 overflow-y-auto">
                <Sidebar :items="navItems" :collapsed="!isSidebarOpen" />
            </nav>
        </aside>

        <!-- Overlay for mobile -->
        <div v-if="isSidebarOpen && isMobile" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
            @click="toggleSidebar"></div>

        <!-- Main content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top navbar -->
            <header class="bg-white shadow-sm fixed w-full top-0 z-30">
                <div class="max-w-full px-2 sm:px-4">
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
                                    <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem" @click="logout">Sign out</a>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import Sidebar from '@/components/Admin/Sidebar.vue'

interface MenuItem {
    name: string
    icon?: string
    to?: string
    children?: MenuItem[]
    isOpen?: boolean
}

const isLoggedIn = ref(true); // Add this line to define isLoggedIn
const userInfo = ref(null); // Add this line to define userInfo

// 退出登录
const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    userInfo.value = null;
    // 刷新页面
    window.location.reload();
}

const navItems = reactive<MenuItem[]>([
    { name: '首页', icon: 'mdi:home', to: '/admin' },
    { name: '用户提交管理', icon: 'mdi:account-multiple', to: '/admin/submission' },
    { name: '活动发布管理', icon: 'mdi:calendar', to: '/admin/activities' },
    { name: '用户管理', icon: 'mdi:account-group', to: '/admin/users' },
    {
        name: '文档',
        icon: 'mdi:file-document-outline',
        children: [
            { name: '文档1', to: '/admin/doc1' },
            { name: '文档2', to: '/admin/doc2' },
        ]
    },
    {
        name: '系统功能',
        icon: 'mdi:cog-outline',
        children: [
            { name: '功能1', to: '/admin/feature1' },
            { name: '功能2', to: '/admin/feature2' },
        ]
    },
    {
        name: '插件示例',
        icon: 'mdi:puzzle-outline',
        children: [
            { name: '示例1', to: '/admin/plugin1' },
            { name: '示例2', to: '/admin/plugin2' },
        ]
    },
    {
        name: '多级菜单',
        icon: 'mdi:menu',
        children: [
            {
                name: '菜单一',
                children: [
                    { name: '菜单一子菜单', to: '/admin/menu1-1' }
                ]
            },
            {
                name: '菜单二',
                children: [
                    {
                        name: '菜单二子菜单',
                        children: [
                            { name: '菜单二子子菜单', to: '/admin/menu2-1-1' }
                        ]
                    }
                ]
            },
        ]
    },
    {
        name: '系统管理',
        icon: 'mdi:cog',
        children: [
            { name: '用户管理', icon: 'mdi:account-cog', to: '/admin/users' },
            { name: '角色管理', icon: 'mdi:account-group', to: '/admin/roles' },
            { name: '菜单管理', icon: 'mdi:menu-open', to: '/admin/menus' },
        ]
    },
    { name: '关于', icon: 'mdi:information-outline', to: '/admin/about' },
])

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