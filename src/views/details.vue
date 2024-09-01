<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
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
                                {{ sortedActivities.length }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <p class="text-xs text-red-500">数据有误？<a href="#" class="underline">点我反馈</a></p>
                </div>

                <div class="bg-gray-50 rounded-md mb-4 max-h-72 overflow-y-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    活动名称
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    参与时间
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    活动状态
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    活动举办人
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    计入小时数
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="activity in sortedActivities" :key="activity.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                    formatDate(activity.date) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span :class="getStatusClass(activity.status)">
                                        {{ activity.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ activity.organizer }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.hours }}</td>
                            </tr>
                        </tbody>
                    </table>
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

const activities = ref([
    { id: 1, name: '社区清洁日', date: '2023-05-15', status: '批准', organizer: '社区服务中心', hours: 4 },
    { id: 2, name: '老年人关爱活动', date: '2023-06-02', status: '批准', organizer: '青年志愿者协会', hours: 6 },
    { id: 3, name: '城市植树活动', date: '2023-07-10', status: '驳回', organizer: '环保局', hours: 0 },
    { id: 4, name: '儿童教育支援', date: '2023-08-20', status: '批准', organizer: '教育局', hours: 5 },
    { id: 5, name: '紧急救援演练', date: '2023-09-05', status: '取消', organizer: '消防局', hours: 0 },
    { id: 6, name: '文化遗产保护', date: '2023-10-01', status: '批准', organizer: '文化局', hours: 8 },
    { id: 7, name: '无偿献血活动', date: '2023-11-15', status: '批准', organizer: '红十字会', hours: 2 },
    { id: 8, name: '冬季送温暖', date: '2023-12-20', status: '批准', organizer: '慈善协会', hours: 54 },
])

const sortedActivities = computed(() => {
    return [...activities.value].sort((a, b) => new Date(b.date) - new Date(a.date)) // 修正为从旧到新排序
})

const totalHours = computed(() => {
    return activities.value.reduce((sum, activity) => sum + activity.hours, 0);
});

const toggleLoginStatus = () => {
    isLoggedIn.value = !isLoggedIn.value
    totalHours.value = isLoggedIn.value ? 41 : 99
}

const getStatusClass = (status) => {
    switch (status) {
        case '批准':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
        case '驳回':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
        case '取消':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'
        default:
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const formattedDate = date.toLocaleDateString('en-US', options) // 转为美国格式 (MM/DD/YYYY)
    return formattedDate
}
</script>