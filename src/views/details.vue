<template>
    <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
        <!--  bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-8 rounded-2xl shadow-lg -->
        <div class="w-full max-w-full">
            <h1 class="text-3xl font-bold text-indigo-900 mb-8 text-center">
                志愿者活动记录
            </h1>

            <div v-if="!isLoggedIn" class="mb-2">
                <div class="mb-6 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="p-8">
                        <div class="flex flex-col sm:flex-row items-center">
                            <div class="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                                <div class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Icon icon="mdi:account-circle-outline" class="w-16 h-16 text-indigo-500" />
                                </div>
                            </div>
                            <div class="text-center sm:text-left">
                                <h2 class="text-2xl font-semibold text-indigo-900 mb-3">欢迎使用志愿者时长记录系统</h2>
                                <p class="text-indigo-700 mb-6">登录或注册以开始记录您的志愿时间，享受更便捷的体验。</p>
                                <button @click="$router.push('/forget')"
                                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                                    登录 / 注册
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 class="text-lg font-semibold text-blue-800 mb-4">免登录快速查询活动记录</h3>
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

            <div v-else class="mb-10">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-sky-400 rounded-2xl shadow-xl overflow-hidden">
                    <div class="p-8">
                        <div class="flex flex-col sm:flex-row items-center">
                            <div class="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                                <img :src="userInfo.avatarUrl || 'https://i.pravatar.cc/100'" alt="User Avatar"
                                    class="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-md" />
                            </div>
                            <div class="text-center sm:text-left">
                                <h2 class="text-2xl font-semibold text-indigo-900 mb-2">欢迎回来，{{ fullName }}</h2>
                                <p class="text-indigo-700 mb-1">ID: {{ userInfo.uid }}</p>
                                <p class="text-indigo-700 mb-6">Email: {{ userInfo.interior_email }}</p>
                                <button @click="logout"
                                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                                    退出登录
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <h2 class="text-lg font-semibold text-blue-800 mb-2">活动统计</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        :class="['p-3 rounded-2xl', totalHours >= 50 ? 'bg-green-100 border-4 border-green-400' : 'bg-red-100 border-4 border-red-400']">
                        <p class="text-sm font-medium text-center mb-1">累积活动时长 <span
                                class="text-xs text-gray-700">(小时)</span></p>
                        <p
                            :class="['text-2xl font-bold text-center', totalHours >= 50 ? 'text-green-600' : 'text-red-600']">
                            {{ totalApprovedHours }}<span class="text-xl font-normal">/50</span>
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
                <p class="text-sm text-red-500">数据有误？<a href="#" class="underline">点我反馈</a></p>
            </div>


            <!-- <div class="mb-10">
                <h2 class="text-2xl font-semibold text-indigo-900 mb-6">活动统计</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div
                        :class="['p-8 rounded-2xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105', totalHours >= 50 ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600']">
                        <p class="text-xl font-medium text-white mb-3">累积活动时长</p>
                        <div class="flex items-end">
                            <p :class="['text-5xl font-bold', totalHours >= 50 ? 'text-green-100' : 'text-white']">
                                {{ totalHours }}
                            </p>
                            <p class="text-2xl font-normal text-white ml-2 mb-1">/ 50小时</p>
                        </div>
                        <p class="text-sm text-white mt-2">{{ totalHours >= 50 ? '已达标' : '未达标' }}</p>
                    </div>
                    <div
                        class="bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-2xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                        <p class="text-xl font-medium text-white mb-3">累积活动个数</p>
                        <p class="text-5xl font-bold text-blue-100">
                            {{ sortedActivities.length }}
                        </p>
                        <p class="text-sm text-white mt-2">参与活动总数</p>
                    </div>
                </div>
            </div>

            <div class="mb-4 flex justify-center">
                <p class="text-sm text-indigo-600">数据有误？<a href="#"
                        class="text-indigo-800 font-semibold hover:underline">点我反馈</a></p>
            </div> -->


            <div class="rounded-2xl shadow-xl overflow-hidden mb-10">
                <h3 class="text-xl font-semibold text-indigo-900 mb-4">活动详情</h3>
                <div class="p-0">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
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
                                    <tr v-for="activity in sortedActivities" :key="activity.id"
                                        class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                            activity.activity_name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                            formatDate(activity.activity_date) }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                                            <span :class="getStatusClass(activity.status)">{{ activity.status }}</span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                            activity.organizer }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ activity.hours
                                            }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';
import Layout from '@/components/Layout.vue';

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const userInfo = computed(() => authStore.user);
const activities = computed(() => authStore.activities);
const totalApprovedHours = computed(() => 
    activities.value
        .filter(activity => activity.status === 'approved')
        .reduce((sum, activity) => sum + activity.hours, 0)
);
// const totalHours = computed(() => activities.value.reduce((sum, activity) => sum + activity.hours, 0));
const fullName = computed(() => `${userInfo.value?.firstName || ''} ${userInfo.value?.lastName || ''}`);
const sortedActivities = computed(() => {
    return [...activities.value].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const searchQuery = ref({
    fullName: {
        firstName: '',
        lastName: '',
    },
    uid: '',
});
const firstNameTouched = ref(false);
const lastNameTouched = ref(false);
const UIDTouched = ref(false);
const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Inquiry', path: '/details' },
];
const currentPage = 'Inquiry';

const fetchUserInfo = async () => {
    authStore.fetchUser();
    await searchActivities();
};

const searchActivities = async () => {
    if (isLoggedIn.value) {
        await authStore.fetchActivities();
    } else {
        const { firstName, lastName } = searchQuery.value.fullName;
        const { uid } = searchQuery.value;
        await authStore.fetchActivities({ firstName, lastName, uid });
    }
};

const logout = () => {
    authStore.logout();
};

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
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

onMounted(async () => {
    await fetchUserInfo();
});
</script>