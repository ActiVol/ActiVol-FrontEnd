<template>
    <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
        <div class="w-full max-w-full">
            <h1 class="text-xl font-bold text-blue-800 mb-4">
                查询以往参与的活动({{ isLoggedIn ? '已登录' : '未登录' }})
            </h1>

            <div v-if="!isLoggedIn" class="mb-6">
                <div class="w-full mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                    <p class="font-bold">欢迎使用志愿者时长记录系统！</p>
                    <p><button @click="$router.push('/forget')" class="underline">登录/注册</button>开始更便捷的体验记录您的志愿时间。</p>
                </div>

                <form @submit.prevent="searchActivities" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First
                                Name</label>
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
                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last
                                Name</label>
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
                            <label for="uid" class="block text-sm font-medium text-gray-700 mb-1">ID 号码</label>
                            <div class="relative mt-2 rounded-md shadow-sm">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Icon icon="material-symbols:id-card-outline" class="h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                </div>
                                <input id="uid" v-model="searchQuery.uid" type="text" required @blur="UIDTouched = true"
                                    :class="['block w-full rounded-md py-1.5 pl-10 pr-3 text-gray-900',
                                        'ring-1 ring-inset ' + (searchQuery.uid ? 'ring-blue-300' : (UIDTouched && !searchQuery.uid ? 'ring-red-300' : 'ring-gray-300')),
                                        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6']"
                                    placeholder="请输入您的 ID 号码" />
                            </div>
                            <p v-if="UIDTouched && !searchQuery.uid" class="mt-1 text-sm text-red-500">ID number is
                                required.</p>
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                        搜索
                    </button>
                </form>
            </div>

            <div v-else class="mb-6">
                <div class="w-full mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                    <p class="font-bold">您已经登录！</p>
                    <p>如需更改，请注销后进行操作。</p>
                    <button @click="logout" class="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                        退出登录
                    </button>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <img src="https://i.pravatar.cc/100" alt="User Avatar"
                            class="w-16 h-16 rounded-full object-cover" />
                        <div class="text-center sm:text-left">
                            <h2 class="text-lg font-semibold text-blue-800">{{ fullName }}</h2>
                            <p class="text-sm text-blue-600">ID: {{ userInfo.uid }}</p>
                            <p class="text-sm text-blue-600">Email: {{ userInfo.interiorEmail }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <h2 class="text-lg font-semibold text-blue-800 mb-2">查询到以下结果：</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        :class="['p-3 rounded-md', totalHours >= 50 ? 'bg-green-100 border-4 border-green-400' : 'bg-red-100 border-4 border-red-400']">
                        <p class="text-sm font-medium text-center mb-1">累积活动时长 <span
                                class="text-xs text-gray-700">(小时)</span></p>
                        <p
                            :class="['text-2xl font-bold text-center', totalHours >= 50 ? 'text-green-600' : 'text-red-600']">
                            {{ totalHours }}<span class="text-xl font-normal">/50</span>
                        </p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-md border-4 border-blue-400">
                        <p class="text-sm font-medium text-center mb-1">累积活动个数</p>
                        <p class="text-2xl font-bold text-center text-blue-600">
                            {{ sortedActivities.length }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="mb-4 flex justify-center">
                <p class="text-xs text-red-500">数据有误？<a href="#" class="underline">点我反馈</a></p>
            </div>

            <div class="bg-gray-50 rounded-md mb-4 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                活动名称</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                参与时间</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                活动状态</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                活动举办人</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                计入小时数</th>
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
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.activity_name
                                    }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                    formatDate(activity.activity_date) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span :class="getStatusClass(activity.status)">{{ activity.status }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ activity.organizer }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.hours }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Layout from '@/components/Layout.vue'
import axios from 'axios'

const isLoggedIn = ref(false)
const searchQuery = ref({
    fullName: {
        firstName: '',
        lastName: '',
    },
    uid: '',
})
const firstNameTouched = ref(false);
const lastNameTouched = ref(false);
const UIDTouched = ref(false);
const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Inquiry', path: '/details' },
];
const currentPage = 'Inquiry'; // Set the name of the current page according to actual logic
const userInfo = ref(null)
const activities = ref([])
const totalHours = computed(() => activities.value.reduce((sum, activity) => sum + activity.hours, 0));

const fullName = computed(() => `${userInfo.value?.firstName || ''} ${userInfo.value?.lastName || ''}`);

const sortedActivities = computed(() => {
    return [...activities.value].sort((a, b) => new Date(b.date) - new Date(a.date)); // 最近的在前
});

// 调用用户信息 API
const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        isLoggedIn.value = false;
        return;
    }

    try {
        const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/userinfo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        userInfo.value = response.data;
        isLoggedIn.value = true;
        await searchActivities(); // 用户信息获取成功后，调用 searchActivities 方法
    } catch (error) {
        console.error('Error fetching user info:', error);
        isLoggedIn.value = false;
    }
}

// 组件挂载时获取用户信息并查询活动
onMounted(async () => {
    await fetchUserInfo();
});

// 退出登录
const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    userInfo.value = null;
}

// 进行活动搜索
const searchActivities = async () => {
    const token = localStorage.getItem('token');
    let response;

    try {
        if (isLoggedIn.value && token) {
            // 用户已登录，使用 JWT 进行查询
            response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/activities', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            // 用户未登录，使用查询参数进行查询
            const { firstName, lastName } = searchQuery.value.fullName;
            const { uid } = searchQuery.value;
            response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/activities', {
                params: {
                    firstName,
                    lastName,
                    uid
                }
            });
        }

        activities.value = response.data; // 更新活动数据到前端
    } catch (error) {
        console.error('Error fetching activities:', error);
    }
}

const getStatusClass = (status) => {
    switch (status) {
        case 'approved':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
        case 'pending':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800';
        case 'cancel':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800';
        case 'rejected':
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800';
        default:
            return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800';
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options); // 格式为 MM/DD/YYYY
}
</script>
