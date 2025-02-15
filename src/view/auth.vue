<template>
  <div class="min-h-screen auth-background flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- 顶部导航组件 -->
      <div class="flex justify-between items-center mb-6">
        <router-link
          to="/"
          class="flex items-center px-4 py-2 bg-white/90 rounded-lg shadow-sm hover:bg-white transition-all duration-200"
        >
          <Icon icon="mdi:home" class="text-xl text-primary mr-2" />
          <span class="text-gray-800 text-sm font-medium">{{ $t('layout.backHome') }}</span>
        </router-link>

        <lang-select @change_language="handleSetLanguage" class="shadow-sm" />
      </div>

      <!-- 主容器 -->
      <div class="bg-white/95 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 relative">
        <!-- 角标 -->
        <!-- 方案一：动态调整文本位置 -->
        <!-- <router-link
          v-if="activeTab === 'login' || activeTab === 'register'"
          :to="activeTab === 'login' ? '/register' : '/login'"
          class="absolute top-0 right-0 w-20 h-20 overflow-hidden z-10"
        >
          <div
            class="absolute top-0 right-0 w-full h-full corner-ribbon-right"
            :class="activeTab === 'login' ? 'bg-blue-400' : 'bg-violet-400'"
          >
            <span
              ref="cornerText"
              class="absolute text-white text-sm font-medium corner-text"
              :style="cornerTextStyle"
            >
              {{ activeTab === 'login' ? $t('auth.register') : $t('auth.login') }}
            </span>
          </div>
        </router-link> -->

        <!-- 方案二：使用 Iconify 图标 -->
        <router-link
          v-if="activeTab === 'login' || activeTab === 'register'"
          :to="activeTab === 'login' ? '/register' : '/login'"
          class="absolute top-0 right-0 w-12 h-12 z-10 overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-full h-full transition-colors duration-300 rounded-bl-2xl"
            :class="activeTab === 'login' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-violet-400 hover:bg-violet-500'"
          >
            <Icon
              :icon="activeTab === 'login' ? 'lucide:user-plus' : 'lucide:log-in'"
              class="absolute text-white w-5 h-5 top-3 right-3.5"
            />
          </div>
        </router-link>

        <router-link
          v-if="activeTab === 'forget'"
          to="/login"
          class="absolute top-0 left-0 w-12 h-12 z-10 overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-full h-full transition-colors duration-300 rounded-br-2xl bg-blue-400 hover:bg-blue-500">
            <Icon
              icon="lucide:log-in"
              class="absolute text-white w-5 h-5 top-3 right-3 rotate-180"
            />
          </div>
        </router-link>

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

// 角标相关
// const cornerText = ref(null);
// const cornerTextStyle = ref({});

// const updateCornerTextPosition = () => {
//   if (cornerText.value) {
//     const width = cornerText.value.offsetWidth;
//     const translateX = width / 2 - 10; // 根据文本宽度调整
//     cornerTextStyle.value = {
//       transform: `rotate(45deg) translateX(${translateX}px) translateY(-13px)`,
//       right: '12px',
//       top: '24px'
//     };
//   }
// };

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

/* 角标样式 */
.corner-ribbon-right {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.corner-ribbon-left {
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

/* 角标样式 */
/* .corner-wrapper {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.corner-ribbon-right {
  clip-path: path('M 0 0 L 64 0 L 64 64 Q 32 64 0 32 Z');
}

.corner-ribbon-left {
  clip-path: path('M 0 0 L 64 0 L 32 64 Q 0 32 0 0 Z');
} */
</style>