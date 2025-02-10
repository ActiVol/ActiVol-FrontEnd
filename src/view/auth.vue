<template>
  <div class="min-h-screen auth-background flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- 顶部导航组件 -->
      <div class="flex justify-between items-center mb-6">
        <router-link
          to="/"
          class="flex items-center px-4 py-2 bg-white/90 rounded-lg shadow-sm hover:bg-white transition-all duration-200 router-link-active"
        >
          <Icon icon="mdi:home" class="text-xl text-primary mr-2" />
          <span class="text-gray-800 text-sm font-medium">{{ $t('layout.backHome') }}</span>
        </router-link>

        <lang-select @change_language="handleSetLanguage" class="shadow-sm" />
      </div>

      <!-- 主容器 -->
      <div class="bg-white/95 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
        <div class="p-8">
          <!-- Logo and Page Title -->
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight mb-2">
              {{$t('app.title')}}
            </h1>
            <h2 class="text-lg text-gray-600 font-medium mt-2">
              {{ activeTab === 'login' ? $t('auth.welcomeBack') :
                activeTab === 'register' ? $t('auth.createAccount') :
                $t('auth.resetPassword') }}
            </h2>
            <div class="gradient-border mt-4 mx-auto w-24"></div>
          </div>

          <!-- 导航标签 -->
          <!-- <div class="flex gap-2 p-1 bg-gray-100 rounded-lg mb-8">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="setActiveTab(tab)"
              :class="[
                'flex-1 py-2 px-4 text-center transition-all duration-200 text-sm font-medium rounded-md',
                activeTab === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              ]"
            >
              {{ tab === 'login' ? $t('auth.login') : tab === 'register' ? $t('auth.register') : $t('auth.forget') }}
            </button>
          </div> -->

          <!-- 表单组件 -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <component
              :is="activeTab === 'login' ? LoginForm : activeTab === 'register' ? RegisterForm : ForgotPasswordForm"
              :key="componentKey"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm.vue';
import LangSelect from '../components/LangSelect/index.vue';
import { Icon } from '@iconify/vue';

const route = useRoute();
const router = useRouter();
const tabs = ['login', 'register', 'forget'];
const activeTab = ref('login');
const componentKey = ref(1);

const setActiveTab = (tab) => {
  activeTab.value = tab;
  router.replace({ path: `/${tab}` });
};

const handleSetLanguage = () => {
  componentKey.value++;
};

onMounted(() => {
  const tab = route.meta.tab;
  if (tabs.includes(tab)) {
    activeTab.value = tab;
  }
});

watch(() => route.meta.tab, (newTab) => {
  if (tabs.includes(newTab)) {
    activeTab.value = newTab;
  }
});
</script>

<style>
:root {
  --primary-color: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #3b82f6;
  --gradient-start: #1e40af;
  --gradient-mid: #3b82f6;
  --gradient-end: #60a5fa;
}
</style>

<style scoped>
.auth-background {
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, rgba(29, 78, 216, 0.15) 0, transparent 50%),
    radial-gradient(at 100% 0%, rgba(37, 99, 235, 0.15) 0, transparent 50%),
    radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0, transparent 50%),
    radial-gradient(at 0% 100%, rgba(96, 165, 250, 0.15) 0, transparent 50%);
}

.gradient-border {
  height: 3px;
  background: linear-gradient(to right,
    var(--gradient-start),
    var(--gradient-mid),
    var(--gradient-end)
  );
  border-radius: 1.5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bg-primary {
  background-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--primary-dark);
}

.router-link-active {
  background-color: white !important;
  color: var(--primary-color) !important;
}

/* Glass morphism effect */
.bg-white\/95 {
  background-color: rgba(255, 255, 255, 0.95);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Shadow effects */
.shadow-xl {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.active-tab {
  background-color: var(--primary-color) !important;
  color: white !important;
}

/* Transition effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>

