<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- 顶部导航组件 -->
      <div class="flex justify-between items-center mb-4">
        <router-link
          to="/"
          class="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
        >
          <Icon icon="mdi:home" class="text-xl text-blue-500 mr-2" />
          <span class="text-gray-700 text-sm">{{ $t('layout.backHome') }}</span>
        </router-link>

        <lang-select @change_language="handleSetLanguage" />
      </div>

      <!-- 主容器 -->
      <div class="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div class="p-8">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">{{$t('app.title')}}</h2>
          <div class="flex mb-6">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="setActiveTab(tab)"
              :class="[
                'flex-1 py-2 px-4 text-center transition-colors duration-200 text-sm font-medium rounded-md',
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ tab=='login'?$t('auth.login') :tab=='register' ?$t('auth.register') :$t('auth.forget') }}
            </button>
          </div>

          <LoginForm :key="componentKey" v-if="activeTab === 'login'" />
          <RegisterForm :key="componentKey" v-if="activeTab === 'register'" />
          <ForgotPasswordForm :key="componentKey" v-if="activeTab === 'forget'" />
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

const route = useRoute();
const router = useRouter();
const tabs = ['login', 'register','forget'];
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
  const tab = route.meta.tab ;
  if (tabs.includes(tab)) {
    activeTab.value = tab;
  }
});

watch(() => route.meta.tab, (newTab) => {
  if (tabs.includes(newTab)) {
    activeTab.value = newTab ;
  }
});
</script>