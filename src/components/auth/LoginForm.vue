<template>
  <div class="flex justify-center items-center bg-cover">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="w-full max-w-md space-y-4">
      <el-form-item :label="$t('login.usernameOrStudentIDOrEmail')" prop="username" label-position="top">
        <el-input v-model="loginForm.username"
                  type="text"
                  size="large"
                  auto-complete="off"
                  :placeholder="$t('login.usernameOrStudentIDOrEmail')"
                  class="w-full">
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('login.password')" prop="password" label-position="top">
        <el-input v-model="loginForm.password"
                  type="password"
                  size="large"
                  auto-complete="off"
                  :placeholder="$t('login.passwordPlaceholder')"
                  @keyup.enter="handleLogin"
                  class="w-full">
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item v-if="captchaEnabled" prop="code" :label="$t('login.verificationCode')" label-position="top">
        <div class="flex space-x-4">
          <el-input v-model="loginForm.code"
                    size="large"
                    auto-complete="off"
                    :placeholder="$t('login.verificationCodePlaceholder')"
                    class="flex-grow"
                    @keyup.enter="handleLogin">
            <template #prefix>
              <svg-icon iconClass="code" />
            </template>
          </el-input>
          <div class="w-fit h-fit float-right ">
            <img :src="codeUrl" @click="getCode" class="cursor-pointer" alt="Verification Code" />
          </div>
        </div>
      </el-form-item>

      <!-- 记住密码 & 忘记密码 -->
      <div class="flex justify-between items-center">
        <el-checkbox v-model="loginForm.rememberMe">
          <span class="text-sm text-gray-600">{{ $t('login.rememberPassword') }}</span>
        </el-checkbox>
        <div class="text-sm text-blue-500 hover:text-blue-600 cursor-pointer" @click="handleForgotPassword">
          {{ $t('login.forgotPassword') }}
        </div>
      </div>

      <el-button :loading="loading"
                 size="large"
                 type="primary"
                 class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                 @click.prevent="handleLogin">
        <span v-if="!loading">{{ $t('login.loginButton') }}</span>
        <span v-else>{{ $t('login.loggingIn') }}</span>
      </el-button>

      <!-- 没有账号 -->
      <div class="text-center text-sm text-gray-600">
        <span>{{ $t('login.noAccount') }} &nbsp;</span>
        <router-link to="/register" class="text-blue-500 hover:text-blue-600 ml-1">
          {{ $t('login.registerNow') }}
        </router-link>
      </div>

      <!-- 第三方登录 -->
      <!-- <div class="mt-2">
        <el-divider content-position="center">{{ $t('login.otherLoginMethods') }}</el-divider>
        <el-form-item class="w-full">
          <div class="flex items-center cursor-pointer py-2 mx-auto ">
            <div class="flex items-center cursor-pointer mr-2 oauth-login-item" @click="doSocialLogin('google')">
              <svg-icon icon-class="google" class="h-6 w-6 mr-1" />
            </div>
            <div class="flex items-center cursor-pointer mr-2 oauth-login-item" @click="doSocialLogin('github')">
              <svg-icon icon-class="github" class="h-6 w-6 mr-1" />
            </div>
          </div>
        </el-form-item>
      </div> -->

      <div class="mt-2">
        <el-divider content-position="center">
          <span class="w-full text-gray-400">{{ $t('login.otherLoginMethods') }}</span>
        </el-divider>
        <el-form-item class="w-full">
          <div class="w-full space-y-4">
            <button @click="doSocialLogin('google')"
                    class="w-full flex items-center justify-center space-x-2 py-2 px-4 border-2 rounded-md shadow-sm font-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <!-- <svg-icon icon-class="google" class="w-12 h-12" /> -->
              <Icon icon="devicon:google" class="w-5 h-5" />
              <span class="text-md">{{ $t('login.loginWith', { provider: 'Google' }) }}</span>
            </button>

            <!-- 其他第三方登录选项 -->
            <!--
              <button
                @click="doSocialLogin('github')"
                class="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Icon icon="devicon:github" class="w-5 h-5" />
                <span>{{ $t('login.loginWith', { provider: 'GitHub' }) }}</span>
              </button>
            -->
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import Cookies from 'js-cookie';
import { getCodeImg, authBinding } from '../../api/login';
import { useRouter, useRoute } from 'vue-router';
import { encrypt } from '../../utils/jsencrypt';
import useUserStore from '../../stores/modules/user';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const { proxy } = getCurrentInstance();
const codeUrl = ref('');
// import { useI18n } from 'vue-i18n';
// const {t} = useI18n();
const base = import.meta.env.VITE_APP_BASE ;
// 验证码开关
const captchaEnabled = ref(true);
const redirect = ref(undefined);

const loginForm = ref({
  username: '',
  password: '',
  code: '',
  uuid: '',
  rememberMe: false
});

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: proxy.$t('login.usernameRequired') }],
  password: [{ required: true, trigger: 'blur', message: proxy.$t('login.passwordRequired') }],
  code: [{ required: true, trigger: 'change', message: proxy.$t('login.verificationCodeRequired') }]
};

// 处理登录逻辑
const handleLogin = () => {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      // 登录操作
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 });
        Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 });
        Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        const query = route.query;
        const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur];
          }
          return acc;
        }, {});
        router.push({ path: redirect.value || '/', query: otherQueryParams });
      }).catch(() => {
        loading.value = false;
        // 重新获取验证码
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
};

// 获取验证码
const getCode = () => {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
};

// 忘记密码
const handleForgotPassword = () => {
  router.push({ path: '/forget', meta: { tab: 'forget' } });
};

// 第三方登录
const doSocialLogin = (source) => {
  authBinding(source).then(res => {
    top.location.href = res.msg;
  });
};

onMounted(() => {
  getCode();
});
</script>