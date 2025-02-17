<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
    <div class="flex flex-col items-center justify-between w-full max-w-5xl p-4 sm:p-6 lg:p-8">
      <Vheader />
      <div class="flex justify-between w-full items-center mb-4">
        <div class="items-center">
          <Vbreadcrumb :items="breadcrumbItems" :currentPage="currentPage"/>
        </div>
        <lang-select @change_language="handleSetLanguage" class="shadow-sm" />
      </div>

      <!-- Enhanced Main Container -->
      <div class="relative w-full">
        <!-- Decorative Elements -->
        <div class="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl transform -rotate-1"></div>
        <div class="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl transform rotate-1"></div>

        <!-- Main Content -->
        <div class="relative bg-gradient-to-b from-white/95 to-blue-50/95 backdrop-blur-sm rounded-2xl shadow-lg w-full flex flex-col items-center p-6 sm:p-8 border border-blue-100">
          <!-- Decorative Corner Patterns -->
          <div class="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-200 rounded-tl-2xl"></div>
          <div class="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-200 rounded-tr-2xl"></div>
          <div class="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-200 rounded-bl-2xl"></div>
          <div class="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-200 rounded-br-2xl"></div>

          <!-- Login/User Info Banner -->
          <div class="w-full mb-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl shadow-inner border border-blue-100">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <!-- Welcome Message -->
              <p class="text-blue-800 font-medium flex-grow">
                {{ isLoggedIn ? $t('layout.welcomeBack', { username: userInfo.username }) : $t('layout.welcomeMessage') }}
              </p>

              <!-- User Info or Login Button -->
              <div v-if="isLoggedIn" class="flex items-center space-x-3">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <Icon icon="lucide:user" class="w-4 h-4 text-blue-600" />
                  </div>
                  <div class="hidden sm:block">
                    <p class="text-sm font-medium text-gray-900">{{ userInfo.username }}</p>
                    <p class="text-xs text-gray-500">{{ userInfo.role }}</p>
                  </div>
                </div>
                <button @click="handleLogout"
                        class="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  {{ $t('layout.logout') }}
                </button>
              </div>
              <div v-else>
                <router-link to="/login"
                             class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Icon icon="lucide:log-in" class="w-4 h-4 mr-2" />
                  {{ $t('layout.loginOrRegister') }}
                </router-link>
              </div>
            </div>
          </div>

          <slot></slot>
        </div>
      </div>
      <Vfooter />
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus';
import { defineComponent, computed, getCurrentInstance, ref } from 'vue';
import { Icon } from '@iconify/vue';
import Vheader from './Header.vue';
import Vfooter from './Footer.vue';
import Vbreadcrumb from './Breadcrumb.vue';
import { useRouter } from 'vue-router';
import { getToken } from '../utils/auth';
import LangSelect from '../components/LangSelect/index.vue';
import useUserStore from '../stores/modules/user';

export default defineComponent({
  name: 'Layout',
  components: {
    Vheader,
    Vfooter,
    Vbreadcrumb,
    LangSelect,
    Icon
  },
  props: {
    breadcrumbItems: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
  },
  computed: {
    isLogin() {
      const token = getToken();
      return !token;
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const userStore = useUserStore();

    // 初始化 componentKey
    proxy.componentKey = ref(0);

    const handleLogin = () => {
      router.push('/login');
    };
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const userInfo = computed(() => userStore.userInfo || {
      username: '',
      role: ''
    });

    const handleLogout = () => {
      ElMessageBox.confirm(`${proxy.$t('layout.confirmLogout')}`, `${proxy.$t('prompt')}`, {
        confirmButtonText:`${proxy.$t('layout.ok')}`,
        cancelButtonText: `${proxy.$t('layout.cancel')}`,
        type: 'warning'
      }).then(() => {
        userStore.logOut().then(() => {
          location.href = import.meta.env.VITE_APP_BASE;
        });
      }).catch(() => { });
    };

    // 切换语言
    const handleSetLanguage = () => {
      proxy.componentKey.value++;
    };

    return {
      // handleLogin,
      isLoggedIn,
      userInfo,
      handleLogout,
      handleSetLanguage
    };
  }
});
</script>