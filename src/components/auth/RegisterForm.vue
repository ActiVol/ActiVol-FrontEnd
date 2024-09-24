<template>
    <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
            <div class="relative">
                <label for="username" class="block text-sm font-medium text-gray-700 mb-1">{{
                    $t('auth.register.username') }}</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon icon="mdi:account" class="text-gray-400" />
                    </div>
                    <input v-model="form.username" type="text" id="username"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required />
                </div>
            </div>
            <div class="relative">
                <label for="uid" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('auth.register.uid')
                    }}</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon icon="mdi:id-card" class="text-gray-400" />
                    </div>
                    <input v-model="form.uid" type="text" id="uid"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required />
                </div>
            </div>
        </div>
        <div class="relative">
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('auth.register.firstName')
                }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:account" class="text-gray-400" />
                </div>
                <input v-model="form.firstName" type="text" id="firstName"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <div class="relative">
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('auth.register.lastName')
                }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:account" class="text-gray-400" />
                </div>
                <input v-model="form.lastName" type="text" id="lastName"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <div class="relative">
            <label for="graduationYear" class="block text-sm font-medium text-gray-700 mb-1">{{
                $t('auth.register.graduationYear') }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:calendar" class="text-gray-400" />
                </div>
                <input v-model="form.graduationYear" type="number" id="graduationYear"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <div class="relative">
            <label for="interiorEmail" class="block text-sm font-medium text-gray-700 mb-1">{{
                $t('auth.register.interiorEmail') }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:email" class="text-gray-400" />
                </div>
                <input v-model="form.interiorEmail" type="email" id="interiorEmail"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <div class="relative">
            <label for="exteriorEmail" class="block text-sm font-medium text-gray-700 mb-1">{{
                $t('auth.register.exteriorEmail') }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:email-outline" class="text-gray-400" />
                </div>
                <input v-model="form.exteriorEmail" type="email" id="exteriorEmail"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('auth.register.password')
                }}</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="mdi:lock" class="text-gray-400" />
                </div>
                <input v-model="form.password" type="password" id="password"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
            </div>
        </div>
        <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {{ $t('auth.register.submit') }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();

const form = reactive({
    username: '',
    uid: '',
    firstName: '',
    lastName: '',
    graduationYear: null as number | null,
    interiorEmail: '',
    exteriorEmail: '',
    password: '',
});

const handleRegister = async () => {
    try {
        await authStore.register(form);
        window.location.href = '/';
    } catch (error) {
        console.error('Registration failed:', error);
        alert(`$t('auth.register.failed')`);
    }
};
</script>
