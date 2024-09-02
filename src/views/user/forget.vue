<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <!-- Banner for unregistered users -->
        <!-- Already Login -->
        <div v-if="isLoggedIn"
            class="w-full max-w-md mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p class="font-bold">您已经登录！</p>
            <p>如需更改，请注销后进行操作。</p>
        </div>
        <!-- Not Login -->
        <div v-if="!isLoggedIn" class="w-full max-w-md mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert">
            <p class="font-bold">欢迎使用志愿者时长记录系统！</p>
            <p>还没有账号？<button @click="activeTab = 'register'" class="underline">立即注册</button>开始记录您的志愿时间。</p>
        </div>

        <!-- Login/Register Card -->
        <div class="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">志愿者时长记录系统</h2>

                <!-- Tabs -->
                <div class="flex mb-4">
                    <button @click="activeTab = 'login'"
                        :class="['flex-1 py-2 px-4 text-center', activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
                        登录
                    </button>
                    <button @click="activeTab = 'register'"
                        :class="['flex-1 py-2 px-4 text-center', activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
                        注册
                    </button>
                </div>

                <!-- Login Form -->
                <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label for="login-identifier" class="block text-sm font-medium text-gray-700">用户名 / 邮箱 /
                            UID</label>
                        <input v-model="loginForm.identifier" id="login-identifier" type="text" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="login-password" class="block text-sm font-medium text-gray-700">密码</label>
                        <input v-model="loginForm.password" id="login-password" type="password" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="flex-1 mr-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            登录
                        </button>
                    </div>
                </form>

                <!-- Register Form -->
                <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="first-name" class="block text-sm font-medium text-gray-700">名字</label>
                            <input v-model="registerForm.firstName" id="first-name" type="text" required
                                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        <div>
                            <label for="last-name" class="block text-sm font-medium text-gray-700">姓氏</label>
                            <input v-model="registerForm.lastName" id="last-name" type="text" required
                                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
                        <input v-model="registerForm.username" id="username" type="text" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="interior-email" class="block text-sm font-medium text-gray-700">学校邮箱</label>
                        <input v-model="registerForm.interiorEmail" id="interior-email" type="email" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="exterior-email" class="block text-sm font-medium text-gray-700">个人邮箱</label>
                        <input v-model="registerForm.exteriorEmail" id="exterior-email" type="email" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="uid" class="block text-sm font-medium text-gray-700">学号 (UID)</label>
                        <input v-model="registerForm.uid" id="uid" type="text" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                        <input v-model="registerForm.password" id="password" type="password" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="graduation-year" class="block text-sm font-medium text-gray-700">毕业年份</label>
                        <input v-model="registerForm.graduationYear" id="graduation-year" type="number" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        注册
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginRegisterForgotPassword',
    setup() {
        const isLoggedIn = ref(false);
        const activeTab = ref('login');
        const router = useRouter(); // 使用 Vue Router 进行跳转

        const loginForm = reactive({
            identifier: '', // 使用 identifier 统一标识
            password: ''
        });

        const registerForm = reactive({
            username: '',
            uid: '',
            firstName: '',
            lastName: '',
            graduationYear: null as number | null,
            interiorEmail: '',
            exteriorEmail: '',
            password: '',
        });

        const forgotPasswordForm = reactive({ 
            email: '' 
        });

        // 检查用户状态是否已登录
        const checkUserAuth = () => {
            const token = localStorage.getItem('token'); // 从 localStorage 获取 token
            if (token) {
                isLoggedIn.value = true; // 如果 token 存在，设置为已登录
                router.push('/dashboard'); // 跳转到仪表盘或主页面
            }
        };

        const handleLogin = async () => {
            try {
                const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/login', loginForm);
                console.log('Login Success', response.data);

                // 在成功登录或注册后
                const accessToken = response.data.accessToken;
                localStorage.setItem('token', accessToken); // 将 token 存储在 localStorage 中

                isLoggedIn.value = true; // 更新登录状态
                alert('登录成功！');
                router.push('/dashboard'); // 登录成功后重定向
            } catch (error) {
                console.error('Login Error:', error);
                alert('登录失败！请检查你的用户名和密码。'); // 增加用户提示
            }
        };

        const handleRegister = async () => {
            try {
                const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/register', registerForm);
                console.log('Registration Success', response.data);
                alert('注册成功！正在登录…'); // 提示用户注册成功

                // 在成功登录或注册后
                const accessToken = response.data.accessToken;
                localStorage.setItem('token', accessToken); // 将 token 存储在 localStorage 中

                await handleLogin(); // 注册成功后自动登录
                router.push('/dashboard'); // 登录后跳转
            } catch (error) {
                console.error('Registration Error:', error);
                alert('注册失败！请重新检查你的信息。');
            }
        };

        // 离开页面时清除 token
        const logout = () => {
            localStorage.removeItem('token');
            isLoggedIn.value = false;
            // Redirect to login page if necessary
            router.push('/login');
        };

        // 组件挂载时检查用户状态
        onMounted(checkUserAuth);

        return {
            isLoggedIn,
            activeTab,
            loginForm,
            registerForm,
            forgotPasswordForm,
            handleLogin,
            handleRegister,
            logout
        };
    }
});
</script>
