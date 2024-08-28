<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
        <div class="max-w-md mx-auto">
            <header class="mb-6 text-center">
                <div class="bg-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-lg inline-block">
                    标题/LOGO
                </div>
            </header>

            <main class="bg-white rounded-xl shadow-lg p-6">
                <h1 class="text-xl font-bold text-blue-800 mb-4">
                    查询以往参与的活动({{ isLoggedIn ? '已登录' : '未登录' }})
                </h1>

                <div v-if="!isLoggedIn" class="mb-4">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="搜索框包括：输入：ID+姓名"
                            class="w-full p-3 pr-10 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                        <button class="absolute right-3 top-3 text-blue-500">
                            <Icon icon="mdi:magnify" class="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div v-else class="mb-4 p-3 bg-blue-50 rounded-md">
                    <p class="text-blue-700 text-sm">
                        已登录的页面这里可以显示一些用户资料，例如头像，全名，ID号，内部邮箱之类的信息
                    </p>
                </div>

                <div class="mb-4">
                    <h2 class="text-lg font-semibold text-blue-800 mb-2">查询到以下结果：</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div :class="['p-3 rounded-md', totalHours >= 50 ? 'bg-green-100' : 'bg-red-100']">
                            <p class="text-sm font-medium mb-1">累积活动时长</p>
                            <p :class="['text-2xl font-bold', totalHours >= 50 ? 'text-green-600' : 'text-red-600']">
                                {{ totalHours }}<span class="text-lg font-normal">/50</span>
                            </p>
                            <p class="text-xs">小时</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-md">
                            <p class="text-sm font-medium mb-1">累积活动个数</p>
                            <p class="text-2xl font-bold text-blue-600">
                                {{ numberOfActivities }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <p class="text-xs text-red-500">数据有误？<a href="#" class="underline">点我反馈</a></p>
                </div>

                <div class="bg-gray-100 p-3 rounded-md mb-4 text-xs text-gray-600">
                    <p>这里可以根据取到的该名用户参与的详细活动进行一个列表展示，</p>
                    <p>罗列出来，每个活动一行，例如有8个活动，则列出8行。</p>
                    <p class="mt-2">上面的【累积活动时长】的"50"可以在后台全局设置里修改该标准时长进行更新。</p>
                </div>

                <div class="text-center">
                    <button @click="toggleLoginStatus"
                        :class="['px-4 py-2 rounded-md transition duration-300', isLoggedIn ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white']">
                        {{ isLoggedIn ? '点击查看未登录界面' : '点击查看已登录界面' }}
                    </button>
                </div>
            </main>

            <footer class="mt-6 text-center text-blue-600 text-xs">
                版权信息 (根据页面美观度确定是否为纯文字或带卡片)
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const isLoggedIn = ref(false)
const searchQuery = ref('')
const totalHours = ref(isLoggedIn.value ? 41 : 99)
const numberOfActivities = computed(() => isLoggedIn.value ? 4 : 8)

const toggleLoginStatus = () => {
    isLoggedIn.value = !isLoggedIn.value
    totalHours.value = isLoggedIn.value ? 41 : 99
}
</script>