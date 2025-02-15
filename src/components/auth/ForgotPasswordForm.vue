<template>
  <div class="forgot_password_form space-y-6">
    <el-form ref="loginRef" :model="forgotForm" :rules="forgotRules" class="w-full forgot-password-form space-y-4">
      <el-form-item :label="$t('forget.email')" prop="email" label-position="top">
        <el-input v-model="forgotForm.email"
                  type="text"
                  size="large"
                  auto-complete="off"
                  :placeholder="$t('forget.email')">
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('forget.verificationCode')" prop="code" v-if="captchaEnabled" label-position="top">
        <el-input size="large"
                  v-model="forgotForm.code"
                  auto-complete="off"
                  :placeholder="$t('forget.verificationCode')"
                  style="width: 63%"
                  @keyup.enter="handleForgot">
          <template #prefix>
            <svg-icon iconClass="code" />
          </template>
        </el-input>
        <div class="forgot-code">
          <img :src="codeUrl" @click="getCode" class="forgot-code-img" />
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="large" type="primary" style="width:100%;" @click.prevent="handleForgot">
          <span v-if="!loading">{{ $t('forget.verify') }}</span>
          <span v-else>{{ $t('forget.verifying') }}...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { getCodeImg, forgotPassword } from '../../api/login';
const { proxy } = getCurrentInstance();
const loading = ref(false);
const codeUrl = ref('');
const captchaEnabled = ref(true);
const forgotForm = ref({
  email: '',
  code: '',
  uuid: ''
});
const forgotRules = {
  email: [
    { type: 'email', required: true, message: proxy.$t('forget.emailRequired'), trigger: ['blur', 'change'] }
  ],
  code: [{ required: true, trigger: 'change', message: proxy.$t('forget.verificationCodeRequired') }]
};
const getCode = () => {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      forgotForm.value.uuid = res.uuid;
    }
  });
};
const handleForgot = () => {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      forgotPassword(forgotForm.value).then(res => {
        if (res.code == 200) {
          ElMessage.success(proxy.$t('forget.verificationCodeSent'));
          proxy.$router.push({ path: '/login' });
        } else {
          ElMessage.error(proxy.$t('forget.verificationCodeFailed') + res.msg);
        }
      });
    }
  });
};
onMounted(() => {
  getCode();
});
</script>

<style scoped>
.forgot_password_form {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}

.forgot-password-form {
  border-radius: 6px;
  background: #ffffff;
}

.forgot-password-form .input-icon {
  height: 39px;
  width: 14px;
  margin-left: 0px;
}

.forgot-password-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.forgot-code {
  width: 33%;
  height: 40px;
  float: right;
}

.forgot-code img {
  cursor: pointer;
  vertical-align: middle;
}

.forgot-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>