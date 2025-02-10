<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
    <div class="flex flex-col items-center justify-between w-full max-w-5xl p-4 sm:p-6 lg:p-8">
      <Vheader />
      <div class="flex justify-between w-full items-stretch">
        <div class="items-center">
          <Vbreadcrumb :items="breadcrumbItems" :currentPage="currentPage"/>
        </div>
        <div v-if="isLogin" class="items-center">
          <div class="mx-auto">
            <button type="button"
                    class="flex items-center space-x-2 py-2 px-4 rounded-lg text-white text-sm bg-blue-500 hover:bg-blue-600 transition-colors"
                    @click="handleLogin">
              {{$t('layout.login')}}
            </button>
          </div>
        </div>
        <div v-else class="items-center">
          <div class="mx-auto">
            <button type="button"
                    class="flex items-center space-x-2 py-2 px-4 rounded-lg text-white text-sm bg-red-500 hover:bg-red-600 transition-colors"
                    @click="handleLogout">
              {{$t('layout.logout')}}
            </button>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-lg w-full flex flex-col items-center p-4 sm:p-6">
        <slot></slot>
      </div>
      <Vfooter />
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus';
import { defineComponent,getCurrentInstance } from 'vue';
import Vheader from './Header.vue';
import Vfooter from './Footer.vue';
import Vbreadcrumb from './Breadcrumb.vue';
import { useRouter } from 'vue-router';
import { getToken } from '../utils/auth';
import useUserStore from '../stores/modules/user';
export default defineComponent({
  name: 'Layout',
  components: {
    Vheader,
    Vfooter,
    Vbreadcrumb,
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
    const handleLogin = () => {
      router.push('/login');
    };
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
    return {
      handleLogin,
      handleLogout
    };
  }
});
</script>