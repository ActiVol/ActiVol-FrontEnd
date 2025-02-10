<template>
  <div class="flex justify-center items-center min-h-screen bg-cover">
    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="w-full max-w-md space-y-4">
      <!-- Given Name -->
      <el-form-item :label="t('register.givenName')" prop="givenName" label-position="top">
        <template #label>
          <div class="flex items-center gap-1">
            <span>{{ t('register.givenName') }}</span>
            <el-tooltip
              :content="t('register.givenNameTip')"
              placement="right"
              effect="light"
              :show-after="100"
            >
              <Icon icon="mdi:information-outline" class="ml-2 text-blue-500 w-4 h-4 cursor-help" />
            </el-tooltip>
          </div>
        </template>
        <el-input
          v-model="registerForm.givenName"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="t('register.givenName')"
          class="w-full"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- Family Name -->
      <el-form-item :label="t('register.familyName')" prop="familyName" label-position="top">
        <template #label>
          <div class="flex items-center gap-1">
            <span>{{ t('register.familyName') }}</span>
            <el-tooltip
              :content="t('register.familyNameTip')"
              placement="right"
              effect="light"
              :show-after="100"
            >
              <Icon icon="mdi:information-outline" class="ml-2 text-blue-500 w-4 h-4 cursor-help" />
            </el-tooltip>
          </div>
        </template>
        <el-input
          v-model="registerForm.familyName"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="t('register.familyName')"
          class="w-full"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- Username -->
      <el-form-item :label="t('register.username')" prop="username" label-position="top">
        <template #label>
          <div class="flex items-center gap-1">
            <span>{{ t('register.username') }}</span>
            <el-tooltip
              :content="t('register.usernameTip')"
              placement="right"
              effect="light"
              :show-after="100"
            >
              <Icon icon="mdi:information-outline" class="ml-2 text-blue-500 w-4 h-4 cursor-help" />
            </el-tooltip>
          </div>
        </template>
        <el-input
          v-model="registerForm.username"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="t('register.username')"
          class="w-full"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="t('register.studentId')" prop="studentId" label-position="top">
        <el-input
          v-model="registerForm.studentId"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="t('register.studentId')"
          class="w-full"
        >
          <template #prefix>
            <svg-icon iconClass="student-id" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="t('register.graduationYear')" prop="graduationYear" label-position="top">
        <el-date-picker
          v-model="registerForm.graduationYear"
          type="year"
          :placeholder="t('register.graduationYear')"
          size="large"
          format="YYYY"
          value-format="YYYY"
          style="width: 100%;"
        />
      </el-form-item>

      <!-- 下拉选择辅导员 -->
      <el-form-item :label="t('register.counselor')" prop="counselor" label-position="top">
        <el-select
          v-model="registerForm.counselor"
          :placeholder="t('register.counselor')"
          filterable
          clearable
          size="large"
        >
          <template #prefix>
            <Icon icon="fa-solid:user-tie" class="text-gray-400 mr-1" />
          </template>
          <el-option
            v-for="item in counselors"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span>{{ item.name }}&nbsp;</span>
            <!-- 如果有备注信息，则显示在括号内 -->
            <span v-if="item.comment && item.comment.trim() !== ''" class="text-gray-500 text-sm">
              ({{ item.comment }})
            </span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="t('register.internalEmail')" prop="internalEmail" label-position="top">
        <el-input
          v-model="registerForm.internalEmail"
          type="email"
          size="large"
          auto-complete="off"
          :placeholder="t('register.internalEmail')"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="t('register.externalEmail')" prop="externalEmail" label-position="top">
        <el-input
          v-model="registerForm.externalEmail"
          type="email"
          size="large"
          auto-complete="off"
          :placeholder="t('register.externalEmail')"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="t('register.password')" prop="password" label-position="top">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="t('register.password')"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="t('register.confirmPassword')" prop="confirmPassword" label-position="top">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="t('register.confirmPassword')"
          @keyup.enter="handleRegister"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="captchaEnabled" prop="code" :label="t('register.verificationCode')" label-position="top">
        <div class="flex space-x-4">
          <el-input
            v-model="registerForm.code"
            size="large"
            auto-complete="off"
            :placeholder="t('register.verificationCode')"
            class="flex-grow"
            @keyup.enter="handleRegister"
          >
            <template #prefix>
              <svg-icon iconClass="code" />
            </template>
          </el-input>
          <div class="w-4/12 h-2.5 float-right ">
            <img :src="codeUrl" @click="getCode" class="cursor-pointer" />
          </div>
        </div>
      </el-form-item>

      <el-form-item prop="agreement">
        <div class="flex items-center">
          <el-checkbox v-model="registerForm.agreement" @change="handleAgreementChange" />
          <div class="ml-2 text-sm text-gray-600">
            <span>{{ t('register.agreement') }}</span>
            <router-link class="text-blue-500 hover:text-blue-600 mx-1" :to="'/agreement'" @click.stop>
              {{ t('register.userAgreement') }}
            </router-link>
            <span>{{ t('register.and') }}&nbsp;</span>
            <router-link class="text-blue-500 hover:text-blue-600 ml-1" :to="'/privacy'" @click.stop>
              {{ t('register.privacyStatement') }}
            </router-link>
          </div>
        </div>
      </el-form-item>

      <el-button
        :loading="loading"
        size="large"
        type="primary"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        @click.prevent="handleRegister"
      >
        <span v-if="!loading">{{ t('register.registerButton') }}</span>
        <span v-else>{{ t('register.registering') }}</span>
      </el-button>

      <div class="text-center text-sm text-gray-600">
        <span>{{ t('register.haveAccount') }}&nbsp;</span>
        <router-link to="/login" class="text-blue-500 hover:text-blue-600 ml-1">
          {{ t('register.loginNow') }}
        </router-link>
      </div>
    </el-form>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="t('register.agreementTitle')"
    width="70%"
    :before-close="handleDialogClose"
    class="font-bold"
  >
    <div class="space-y-4">
      <h2 class="text-lg font-md text-slate-700">{{ t('register.readCarefully') }}</h2>

      <div class="space-y-2">
        <h3 class="font-bold text-blue-600">{{ t('register.userAgreementTitle') }}</h3>
        <div class="max-h-40 overflow-y-auto p-4 bg-gray-50 rounded">
          {{ userAgreement }}
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="font-bold text-blue-600">{{ t('register.privacyStatementTitle') }}</h3>
        <div class="max-h-40 overflow-y-auto p-4 bg-gray-50 rounded">
          {{ privacyStatement }}
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center w-full">
        <div class="space-x-2">
          <el-button type="primary" link @click="openAgreement('agreement')" class="hover:opacity-80">
            {{ t('register.viewUserAgreement') }}
          </el-button>
          <el-button type="primary" link @click="openAgreement('privacy')" class="hover:opacity-80">
            {{ t('register.viewPrivacyStatement') }}
          </el-button>
        </div>
        <div class="space-x-4">
          <el-button @click="handleDisagree" class="hover:bg-red-600 text-white" color="#ef4444">
            {{ t('register.disagree') }}
          </el-button>
          <el-button @click="handleAgree" class="hover:bg-blue-600 text-white" color="#3b82f6">
            {{ t('register.agree') }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { ElMessageBox } from 'element-plus';
import { getCodeImg, register } from '../../api/login';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const captchaEnabled = ref(true);
const codeUrl = ref('');
const dialogVisible = ref(false);
const { proxy } = getCurrentInstance();

const registerForm = ref({
  familyName: '',
  givenName: '',
  username: '',
  studentId: '',
  counselor: '',
  graduationYear: null,
  internalEmail: '',
  externalEmail: '',
  password: '',
  confirmPassword: '',
  code: '',
  uuid: '',
  agreement: false
});

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error(t('register.passwordMismatch')));
  } else {
    callback();
  }
};

const registerRules = {
  givenName: [
    { required: true, trigger: 'blur', message: proxy.$t('register.givenNameRequired') },
    { pattern: /^[A-Za-z]+$/, message: proxy.$t('register.onlyEnglishAllowed'), trigger: 'blur' }
  ],
  familyName: [
    { required: true, trigger: 'blur', message: proxy.$t('register.familyNameRequired') },
    { pattern: /^[A-Za-z]+$/, message: proxy.$t('register.onlyEnglishAllowed'), trigger: 'blur' }
  ],
  username: [
    { required: true, trigger: 'blur', message: proxy.$t('register.usernameRequired') },
    { min: 2, max: 20, message: proxy.$t('register.usernameLengthError'), trigger: 'blur' }
  ],
  studentId: [
    { required: true, trigger: 'blur', message: proxy.$t('register.studentIdRequired') },
    { min: 2, max: 20, message: proxy.$t('register.studentIdLengthError'), trigger: 'blur' }
  ],
  counselor: [
    { required: true, trigger: 'change', message: proxy.$t('register.counselorRequired') }
  ],
  graduationYear: [
    { type: 'date', required: true, message: proxy.$t('register.graduationYearRequired'), trigger: 'change' }
  ],
  internalEmail:[
    { type: 'email', required: true, message: proxy.$t('register.internalEmailRequired'), trigger: ['blur','change']}
  ],
  externalEmail:[
    { type: 'email', required: false, message: proxy.$t('register.externalEmailRequired'), trigger: ['blur', 'change']}
  ],
  password: [
    { required: true, trigger: 'blur', message: proxy.$t('register.passwordRequired') },
    { min: 5, max: 20, message: proxy.$t('register.passwordLengthError'), trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: proxy.$t('register.confirmPasswordRequired')},
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ],
  code: [{ required: true, trigger: 'change', message: t('register.verificationCodeRequired') }],
  agreement: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error(t('register.agreementRequired')));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
};

// 模拟从远程 API 获取的上级辅导员数据
const counselors = ref([
  { id: '001', name: 'Counselor A', comment: '负责A-G' },
  { id: '002', name: 'Counselor B', comment: '负责H-N' },
  { id: '003', name: 'Counselor C', comment: '负责O-Z' },
  { id: '004', name: 'John Doe' }
]);

const handleRegister = () => {
  proxy.$refs.registerRef.validate(valid => {
    if (valid) {
      loading.value = true;
      register(registerForm.value).then(res => {
        const username = registerForm.value.username;
        // ElMessageBox.alert(t('register.successMessage', { username }), t('register.systemAlert'), {
        ElMessageBox.alert(t('register.registrationSuccess'), {
          dangerouslyUseHTMLString: true,
          type: 'success',
        }).then(() => {
          router.push('/login');
        }).catch(() => {});
      }).catch(() => {
        loading.value = false;
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
};

const getCode = () => {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      registerForm.value.uuid = res.uuid;
    }
  });
};

const handleAgreementChange = (value) => {
  if (value) {
    registerForm.value.agreement = false;
    dialogVisible.value = true;
  }
};

const handleAgree = () => {
  registerForm.value.agreement = true;
  dialogVisible.value = false;
};

const handleDisagree = () => {
  registerForm.value.agreement = false;
  dialogVisible.value = false;
};

const handleDialogClose = () => {
  registerForm.value.agreement = false;
  dialogVisible.value = false;
};

const openAgreement = (type) => {
  const route = type === 'agreement' ? '/agreement' : '/privacy';
  window.open(route, '_blank');
};

onMounted(() => {
  getCode();
});
</script>