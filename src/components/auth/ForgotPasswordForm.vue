<template>
    <form @submit.prevent="handleForgotPassword" class="space-y-4">
        <div class="relative">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('auth.forget.email')
                }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:email" class="text-gray-400" />
                </div>
                <input v-model="form.email" type="email" id="email"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {{ $t('auth.forget.submit') }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();

const form = reactive({
    email: '',
});

const handleForgotPassword = async () => {
    try {
        await authStore.forgotPassword(form.email);
        alert(`$t('auth.forget.success')`);
    } catch (error) {
        console.error('Password reset request failed:', error);
        alert(`$t('auth.forget.failed')`);
    }
};
</script>
