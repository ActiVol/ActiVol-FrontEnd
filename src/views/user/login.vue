<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div v-if="isLoggedIn"
            class="w-full max-w-md mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p class="font-bold">您已经登录！</p>
            <p>如需更改，请注销后进行操作。</p>
        </div>
        <div v-if="!isLoggedIn" class="w-full max-w-md mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert">
            <p class="font-bold">欢迎使用志愿者时长记录系统！</p>
            <p>还没有账号？<button @click="activeTab = 'register'" class="underline">立即注册</button>开始记录您的志愿时间。</p>
        </div>
        <div class="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">志愿者时长记录系统</h2>
                <div class="flex mb-4">
                    <button @click="activeTab = 'login'"
                        :class="['flex-1 py-2 px-4 text-center', activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
                        登录
                    </button>
                    <button @click="activeTab = 'register'"
                        :class="['flex-1 py-2 px-4 text-center', activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
                        注册
                    </button>
                    <button @click="activeTab = 'forgotPassword'"
                        :class="['flex-1 py-2 px-4 text-center', activeTab === 'forgotPassword' ? 'bg-blue-500 text-white' : 'bg-gray-200']">
                        忘记密码
                    </button>
                </div>
                <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label for="identifier" class="block text-sm font-medium text-gray-700">用户名或邮箱</label>
                        <input v-model="loginForm.identifier" type="text" id="identifier"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                        <input v-model="loginForm.password" type="password" id="password"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md">登录</button>
                    </div>
                </form>
                <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
                            <input v-model="registerForm.username" type="text" id="username"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label for="uid" class="block text-sm font-medium text-gray-700">学号</label>
                            <input v-model="registerForm.uid" type="text" id="uid"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                        </div>
                    </div>
                    <div>
                        <label for="firstName" class="block text-sm font-medium text-gray-700">名</label>
                        <input v-model="registerForm.firstName" type="text" id="firstName"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium text-gray-700">姓</label>
                        <input v-model="registerForm.lastName" type="text" id="lastName"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label for="graduationYear" class="block text-sm font-medium text-gray-700">毕业年份</label>
                        <input v-model="registerForm.graduationYear" type="number" id="graduationYear"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label for="interiorEmail" class="block text-sm font-medium text-gray-700">校内邮箱</label>
                        <input v-model="registerForm.interiorEmail" type="email" id="interiorEmail"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label for="exteriorEmail" class="block text-sm font-medium text-gray-700">校外邮箱</label>
                        <input v-model="registerForm.exteriorEmail" type="email" id="exteriorEmail"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                        <input v-model="registerForm.password" type="password" id="password"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md">注册</button>
                </form>
                <form v-if="activeTab === 'forgotPassword'" @submit.prevent="handleForgotPassword" class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
                        <input v-model="forgotPasswordForm.email" type="email" id="email"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md">重置密码</button>
                    <button @click.prevent="activeTab = 'login'"
                        class="bg-gray-500 text-white py-2 px-4 rounded-md">返回登录</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default defineComponent({
    name: 'LoginRegisterForgotPassword',
    setup() {
        const userStore = useUserStore();
        const isLoggedIn = ref(userStore.isLoggedIn);
        const activeTab = ref('login');
        const router = useRouter();

        const loginForm = reactive({
            identifier: '',
            password: '',
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
            email: '',
        });

        const checkUserAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await userStore.fetchUser();
                if (userStore.user.isAdmin === 1 || userStore.user.isAdmin === 2) {
                    router.push('/admin');
                }
            }
        };

        const getDeviceInfo = async () => {
            const ipResponse = await axios.get('https://api.ipify.org/?format=json');
            const ip = ipResponse.data.ip;
            const ua = navigator.userAgent;
            const lang = navigator.language;
            const screenSize = `${window.screen.width}x${window.screen.height}`;

            return { ip, ua, lang, screenSize };
        };

        const handleLogin = async () => {
            try {
                const deviceInfo = await getDeviceInfo();
                const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/login', {
                    ...loginForm,
                    ...deviceInfo,
                });
                console.log('Login Success', response.data);

                const accessToken = response.data.accessToken;
                localStorage.setItem('token', accessToken);

                await userStore.fetchUser();

                if (userStore.user.isAdmin === 1 || userStore.user.isAdmin === 2) {
                    // 刷新页面
                    window.location.reload();
                    router.push('/admin');
                } else {
                    // 刷新页面
                    window.location.reload();
                    router.push('/');
                }
            } catch (error) {
                console.error('Login Error:', error);
                alert('登录失败！请检查你的用户名和密码。');
            }
        };

        const handleRegister = async () => {
            try {
                const deviceInfo = await getDeviceInfo();
                const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/register', {
                    ...registerForm,
                    ...deviceInfo,
                });
                console.log('Registration Success', response.data);
                alert('注册成功！正在登录…');

                const accessToken = response.data.accessToken;
                localStorage.setItem('token', accessToken);

                await handleLogin();
            } catch (error) {
                console.error('Registration Error:', error);
                alert('注册失败！请重新检查你的信息。');
            }
        };

        const handleForgotPassword = () => {
            console.log('Forgot Password:', forgotPasswordForm);
        };

        const logout = () => {
            localStorage.removeItem('token');
            userStore.logout();
            router.push('/login');
            // 刷新页面
            window.location.reload();
        };

        onMounted(checkUserAuth);

        return {
            isLoggedIn,
            activeTab,
            loginForm,
            registerForm,
            forgotPasswordForm,
            handleLogin,
            handleRegister,
            handleForgotPassword,
            logout,
        };
    },
});
</script>
