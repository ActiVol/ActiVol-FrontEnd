<template>
    <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
        <main class="w-full max-w-full px-4 sm:px-6 lg:px-8">
            <h1 class="text-xl font-bold text-blue-800 mb-4">
                查询以往参与的活动({{ isLoggedIn ? '已登录' : '未登录' }})
            </h1>

            <div v-if="!isLoggedIn" class="mb-6">
                <div class="bg-blue-100 p-4 rounded-lg mb-4">
                    <p class="text-blue-800 font-medium">登录/注册后能获得更好的服务体验！</p>
                </div>

                <form @submit.prevent="searchActivities" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input type="text" id="first-name" v-model="searchQuery.fullName.firstName"
                                    @blur="firstNameTouched = true" required
                                    :class="['block w-full rounded-md py-1.5 pl-10 pr-3 text-gray-900',
                                        'ring-1 ring-inset ' + (searchQuery.fullName.firstName ? 'ring-blue-300' : (firstNameTouched && !searchQuery.fullName.firstName ? 'ring-red-300' : 'ring-gray-300')),
                                        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6']"
                                    placeholder="First Name" />
                            </div>
                            <p v-if="firstNameTouched && !searchQuery.fullName.firstName"
                                class="mt-1 text-sm text-red-500">First name is required.</p>
                        </div>

                        <div>
                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input type="text" id="last-name" v-model="searchQuery.fullName.lastName"
                                    @blur="lastNameTouched = true" required
                                    :class="['block w-full rounded-md py-1.5 pl-10 pr-3 text-gray-900',
                                        'ring-1 ring-inset ' + (searchQuery.fullName.lastName ? 'ring-blue-300' : (lastNameTouched && !searchQuery.fullName.lastName ? 'ring-red-300' : 'ring-gray-300')),
                                        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6']"
                                    placeholder="Last Name" />
                            </div>
                            <p v-if="lastNameTouched && !searchQuery.fullName.lastName"
                                class="mt-1 text-sm text-red-500">Last name is required.</p>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="UID" class="block text-sm font-medium text-gray-700 mb-1">ID 号码</label>
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Icon icon="material-symbols:id-card-outline" class="h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                </div>
                                <input id="UID" v-model="searchQuery.UID" type="text" required
                                    @blur="UIDTouched = true"
                                    :class="['block w-full rounded-md py-1.5 pl-10 pr-3 text-gray-900',
                                        'ring-1 ring-inset ' + (searchQuery.UID ? 'ring-blue-300' : (UIDTouched && !searchQuery.UID ? 'ring-red-300' : 'ring-gray-300')),
                                        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6']"
                                    placeholder="请输入您的 ID 号码" />
                            </div>
                            <p v-if="UIDTouched && !searchQuery.UID" class="mt-1 text-sm text-red-500">ID number is required.</p>
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                        搜索
                    </button>
                </form>
            </div>

            <div v-else class="mb-6 bg-blue-50 p-4 rounded-lg">
                <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img :src="userInfo.avatar" alt="User Avatar" class="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h2 class="text-lg font-semibold text-blue-800">{{ fullName }}</h2>
                        <p class="text-sm text-blue-600">ID: {{ userInfo.UID }}</p>
                        <p class="text-sm text-blue-600">{{ userInfo.email }}</p>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <h2 class="text-lg font-semibold text-blue-800 mb-2">查询到以下结果：</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div class="mb-4 flex justify-center">
                <p class="text-xs text-red-500">数据有误？<a href="#" class="underline">点我反馈</a></p>
            </div>

            <div class="bg-gray-50 rounded-md mb-4 max-h-72 overflow-x-auto overflow-y-auto scrollable-container">
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
                        <template v-if="activities.length === 0">
                            <tr>
                                <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                                    暂无数据。请去添加申报数据或查看可选活动。
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="activity in sortedActivities" :key="activity.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(activity.date) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span :class="getStatusClass(activity.status)">
                                        {{ activity.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ activity.organizer }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.hours }}</td>
                            </tr>
                        </template>
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
    </Layout>
</template>

<script setup>
import { ref, computed, defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import Layout from '@/components/Layout.vue'
import Breadcrumb from '@/components/Breadcrumb.vue';

const isLoggedIn = ref(false)
const searchQuery = ref({ fullName: { firstName: '', lastName: '' }, UID: '' })

const firstNameTouched = ref(false);
const lastNameTouched = ref(false);
const UIDTouched = ref(false);

const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Inquiry', path: '/details' },
];

const currentPage = computed(() => {
    return 'Inquiry'; // Set the name of the current page according to actual logic
});

const userInfo = ref({
    avatar: 'https://i.pravatar.cc/100',
    firstName: 'First',
    lastName: 'Last',
    UID: '1234567890',
    email: 'zhangsan@example.com'
})

const fullName = computed(() => {
    return `${userInfo.value.firstName} ${userInfo.value.lastName}`;
});

// const searchActivities = () => {
//     // Here you would typically make an API call to search for activities
//     // For now, we'll just log the search query
//     console.log('Searching for activities:', searchQuery.value)
// }

// const activities = ref([
//     { id: 1, name: '社区清洁日', date: '2023-05-15', status: '批准', organizer: '社区服务中心', hours: 4 },
//     { id: 2, name: '老年人关爱活动', date: '2023-06-02', status: '批准', organizer: '青年志愿者协会', hours: 6 },
//     { id: 3, name: '城市植树活动', date: '2023-07-10', status: '驳回', organizer: '环保局', hours: 0 },
//     { id: 4, name: '儿童教育支援', date: '2023-08-20', status: '批准', organizer: '教育局', hours: 5 },
//     { id: 5, name: '紧急救援演练', date: '2023-09-05', status: '取消', organizer: '消防局', hours: 0 },
//     { id: 6, name: '文化遗产保护', date: '2023-10-01', status: '批准', organizer: '文化局', hours: 8 },
//     { id: 7, name: '无偿献血活动', date: '2023-11-15', status: '批准', organizer: '红十字会', hours: 2 },
//     { id: 8, name: '冬季送温暖', date: '2023-12-20', status: '批准', organizer: '慈善协会', hours: 54 },
// ])

const activities = ref([])

const searchActivities = async () => {
    const { firstName, lastName } = searchQuery.value.fullName;
    const { UID } = searchQuery.value;

    try {
        const response = await fetch('https://apifoxmock.com/m1/5071700-4733256-default/api/searchActivities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, UID })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        activities.value = data; // 更新活动数据到前端
    } catch (error) {
        console.error('Error fetching activities:', error);
    }
}

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