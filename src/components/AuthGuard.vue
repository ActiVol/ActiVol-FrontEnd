<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <Icon icon="mdi:shield-lock-outline" class="mx-auto h-16 w-16 text-blue-600" />
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    {{ $t('authGuard.title') }}
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    {{ $t('authGuard.messageContent') }}
                </p>
            </div>

            <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                <div class="p-6 space-y-6">
                    <div v-if="!isLoggedIn" class="space-y-4">
                        <div class="flex items-center">
                            <Icon icon="mdi:login" class="h-6 w-6 text-blue-500 mr-2" />
                            <h3 class="text-lg font-medium text-gray-900">{{ $t('authGuard.loginCard.title') }}</h3>
                        </div>
                        <p class="text-gray-500">{{ $t('authGuard.loginCard.description') }}</p>
                        <router-link to="/login"
                            class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Icon icon="mdi:login" class="h-5 w-5 mr-2" />
                            {{ $t('authGuard.loginCard.button') }}
                        </router-link>
                    </div>
                    <div v-else class="space-y-4">
                        <div class="flex items-center">
                            <Icon icon="mdi:home" class="h-6 w-6 text-green-500 mr-2" />
                            <h3 class="text-lg font-medium text-gray-900">{{ $t('authGuard.homeCard.title') }}</h3>
                        </div>
                        <p class="text-gray-500">{{ $t('authGuard.homeCard.description') }}</p>
                        <router-link to="/"
                            class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <Icon icon="mdi:home" class="h-5 w-5 mr-2" />
                            {{ $t('authGuard.homeCard.button') }}
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="mt-4 flex justify-center">
                <LanguageSelector />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import LanguageSelector from '@/components/LanguageSelector.vue';
import { Icon } from '@iconify/vue';

const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);
</script>