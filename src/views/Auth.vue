<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div class="w-full max-w-md">
            <div class="bg-white shadow-2xl rounded-lg overflow-hidden">
                <div class="p-8">
                    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">{{ $t('auth.title') }}</h2>
                    <div class="flex mb-6">
                        <button v-for="tab in tabs" :key="tab" @click="setActiveTab(tab)" :class="[
                            'flex-1 py-2 px-4 text-center transition-colors duration-200 text-sm font-medium',
                            activeTab === tab
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        ]">
                            {{ $t(`auth.tabs.${tab}`) }}
                        </button>
                    </div>

                    <LoginForm v-if="activeTab === 'login'" />
                    <RegisterForm v-if="activeTab === 'register'" />
                    <ForgotPasswordForm v-if="activeTab === 'forget'" />
                </div>
            </div>
            <div class="mt-4 text-center">
                <LanguageSelector />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const tabs = ['login', 'register', 'forget'];
const activeTab = ref('login');

const setActiveTab = (tab: string) => {
    activeTab.value = tab;
    router.replace({ path: `/${tab}` });
};

onMounted(() => {
    const tab = route.meta.tab as string;
    if (tabs.includes(tab)) {
        activeTab.value = tab;
    }
});

watch(() => route.meta.tab, (newTab) => {
    if (tabs.includes(newTab as string)) {
        activeTab.value = newTab as string;
    }
});

// Redirect if user is already logged in
if (authStore.isLoggedIn) {
    // 刷新页面
    window.location.href = '/';
    // router.push('/');
}
</script>