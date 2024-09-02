<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <!-- Banner for unregistered users -->
        <div v-if="!isLoggedIn" class="w-full max-w-md mb-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert">
            <p class="font-bold">欢迎使用志愿者时长记录系统！</p>
            <p>还没有账号？<button @click="activeTab = 'register'" class="underline">立即注册</button>开始记录您的志愿时间。</p>
        </div>

        <!-- Login/Register/Forgot Password Card -->
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
                        <label for="login-username" class="block text-sm font-medium text-gray-700">用户名</label>
                        <input v-model="loginForm.username" id="login-username" type="text" required
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
                        <button @click.prevent="activeTab = 'forgotPassword'"
                            class="flex-1 ml-2 py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            忘记密码
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
                        <label for="school-email" class="block text-sm font-medium text-gray-700">学校邮箱</label>
                        <input v-model="registerForm.schoolEmail" id="school-email" type="email" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="personal-email" class="block text-sm font-medium text-gray-700">个人邮箱</label>
                        <input v-model="registerForm.personalEmail" id="personal-email" type="email" required
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

                <!-- Forgot Password Form -->
                <form v-if="activeTab === 'forgotPassword'" @submit.prevent="handleForgotPassword" class="space-y-4">
                    <div>
                        <label for="forgot-email" class="block text-sm font-medium text-gray-700">电子邮箱</label>
                        <input v-model="forgotPasswordForm.email" id="forgot-email" type="email" required
                            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        重置密码
                    </button>
                    <button @click.prevent="activeTab = 'login'"
                        class="w-full flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        返回登录
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
    name: 'LoginRegisterForgotPassword',
    setup() {
        const isLoggedIn = ref(false)
        const activeTab = ref('login')

        const loginForm = reactive({
            username: '',
            password: ''
        })

        const registerForm = reactive({
            username: '',
            firstName: '',
            lastName: '',
            schoolEmail: '',
            personalEmail: '',
            uid: '',
            password: '',
            graduationYear: null as number | null
        })

        const forgotPasswordForm = reactive({
            email: ''
        })

        const handleLogin = () => {
            // 处理登录逻辑
            console.log('Login:', loginForm)
        }

        const handleRegister = () => {
            // 处理注册逻辑
            console.log('Register:', registerForm)
        }

        const handleForgotPassword = () => {
            // 处理忘记密码逻辑
            console.log('Forgot Password:', forgotPasswordForm)
        }

        return {
            isLoggedIn,
            activeTab,
            loginForm,
            registerForm,
            forgotPasswordForm,
            handleLogin,
            handleRegister,
            handleForgotPassword
        }
    }
})
</script>