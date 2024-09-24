<template>
    <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="relative">
            <label for="identifier" class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('auth.login.identifier') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:account" class="text-gray-400" />
                </div>
                <input v-model="form.identifier" type="text" id="identifier"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    :placeholder="$t('auth.login.identifierPlaceholder')" required />
            </div>
        </div>
        <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('auth.login.password') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:lock" class="text-gray-400" />
                </div>
                <input v-model="form.password" type="password" id="password"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    :placeholder="$t('auth.login.passwordPlaceholder')" required />
            </div>
        </div>
        <div>
            <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {{ $t('auth.login.submit') }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();

const form = reactive({
    identifier: '',
    password: '',
});

const handleLogin = async () => {
    try {
        await authStore.login(form);
        window.location.href = '/';
    } catch (error) {
        console.error('Login failed:', error);
        alert(`$t('auth.login.failed')`);
    }
};
</script>
