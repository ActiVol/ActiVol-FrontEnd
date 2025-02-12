<template>
  <div class="flex justify-center items-center bg-cover">
    <el-form ref="registerRef"
             :model="registerForm"
             :rules="registerRules"
             class="w-full max-w-md space-y-6">
      <!-- User Type Selection -->
      <div v-if="!userTypeSelected" class="space-y-8">
        <div class="text-center space-y-4">
          <h2 class="text-2xl font-bold text-gray-800">{{ t('register.selectUserType') }}</h2>
          <!-- <div class="h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full"></div> -->
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
          <el-button v-for="type in userTypes"
                     :key="type.value"
                     size="large"
                     :class="[
                       'relative group flex items-center justify-center h-[72px] border-2 rounded-xl transition-all duration-300',
                       'w-full',
                       // 移除默认的左边距
                       '!ml-0',
                       // 颜色主题
                       type.value === 'student' ? 'hover:border-blue-500 hover:bg-blue-50' : '',
                       type.value === 'admin' ? 'hover:border-purple-500 hover:bg-purple-50' : '',
                       type.value === 'counselor' ? 'hover:border-emerald-500 hover:bg-emerald-50' : '',
                       type.value === 'volunteer' ? 'hover:border-rose-500 hover:bg-rose-50' : '',
                     ]"
                     style="margin-left: 0 !important;"
                     @click="selectUserType(type.value)">
            <div class="flex items-center justify-center gap-3">
              <Icon :icon="type.icon"
                    :class="[
                      'text-2xl transition-transform duration-300 group-hover:scale-110',
                      type.value === 'student' ? 'text-blue-500' : '',
                      type.value === 'admin' ? 'text-purple-500' : '',
                      type.value === 'counselor' ? 'text-emerald-500' : '',
                      type.value === 'volunteer' ? 'text-rose-500' : ''
                    ]" />
              <span class="text-base font-medium text-gray-700">{{ type.label }}</span>
            </div>
          </el-button>
        </div>
      </div>

      <template v-else>
        <!-- Registration Form -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">{{ selectedUserType }}</h2>
          <el-button type="text" @click="resetUserType" class="text-primary hover:text-primary-dark transition-colors">
            <Icon icon="mdi:arrow-left" class="mr-1" />
            {{ t('register.changeUserType') }}
          </el-button>
        </div>
        <div class="gradient-border mb-8"></div>

        <!-- Form Fields -->
        <div class="space-y-6">
          <!-- Given Name -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.givenName') }}
              <el-tooltip :content="t('register.givenNameTip')" placement="right" effect="light" :show-after="100">
                <Icon icon="mdi:information-outline" class="inline-block ml-1 text-blue-500 w-4 h-4 cursor-help" />
              </el-tooltip>
            </label>
            <el-form-item prop="givenName" class="mb-0">
              <el-input v-model="registerForm.givenName"
                        type="text"
                        size="large"
                        :placeholder="t('register.givenNamePlaceholder')">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Middle Name -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <!-- <span class="text-red-500 mr-1">*</span> -->
              {{ t('register.middleName') }}
              <el-tooltip :content="t('register.middleNameTip')" placement="right" effect="light" :show-after="100">
                <Icon icon="mdi:information-outline" class="inline-block ml-1 text-blue-500 w-4 h-4 cursor-help" />
              </el-tooltip>
            </label>
            <el-form-item prop="middleName" class="mb-0">
              <el-input v-model="registerForm.middleName"
                        type="text"
                        size="large"
                        :placeholder="t('register.middleeNamePlaceholder')">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Family Name -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.familyName') }}
              <el-tooltip :content="t('register.familyNameTip')" placement="right" effect="light" :show-after="100">
                <Icon icon="mdi:information-outline" class="inline-block ml-1 text-blue-500 w-4 h-4 cursor-help" />
              </el-tooltip>
            </label>
            <el-form-item prop="familyName" class="mb-0">
              <el-input v-model="registerForm.familyName"
                        type="text"
                        size="large"
                        :placeholder="t('register.familyNamePlaceholder')">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Username -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.username') }}
              <el-tooltip :content="t('register.usernameTip')" placement="right" effect="light" :show-after="100">
                <Icon icon="mdi:information-outline" class="inline-block ml-1 text-blue-500 w-4 h-4 cursor-help" />
              </el-tooltip>
            </label>
            <el-form-item prop="username" class="mb-0">
              <el-input v-model="registerForm.username"
                        type="text"
                        size="large"
                        :placeholder="t('register.usernamePlaceholder')">
                <template #prefix>
                  <el-icon>
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Student ID -->
          <div class="form-field" v-if="selectedUserType === 'student'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.studentId') }}
            </label>
            <el-form-item prop="studentId" class="mb-0">
              <el-input v-model="registerForm.studentId"
                        type="text"
                        size="large"
                        :placeholder="t('register.studentIdPlaceholder')">
                <template #prefix>
                  <svg-icon iconClass="student-id" />
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Graduation Year -->
          <div class="form-field" v-if="selectedUserType === 'student'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.graduationYear') }}
            </label>
            <el-form-item prop="graduationYear" class="mb-0">
              <el-date-picker v-model="registerForm.graduationYear"
                              type="year"
                              :placeholder="t('register.graduationYearPlaceholder')"
                              size="large"
                              format="YYYY"
                              value-format="YYYY"
                              style="width: 100%;" />
            </el-form-item>
          </div>

          <!-- Counselor Selection -->
          <div class="form-field" v-if="selectedUserType === 'student'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.counselor') }}
            </label>
            <el-form-item prop="counselor" class="mb-0">
              <el-select v-model="registerForm.counselor"
                         :placeholder="t('register.counselorPlaceholder')"
                         filterable
                         clearable
                         size="large"
                         class="w-full">
                <template #prefix>
                  <Icon icon="fa-solid:user-tie" class="text-gray-400 mr-1" />
                </template>
                <el-option v-for="item in counselors" :key="item.id" :label="item.name" :value="item.id">
                  <span>{{ item.name }}&nbsp;</span>
                  <span v-if="item.comment && item.comment.trim() !== ''" class="text-gray-500 text-sm">
                    ({{ item.comment }})
                  </span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- Internal Email -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.internalEmail') }}
            </label>
            <el-form-item prop="internalEmail" class="mb-0">
              <el-input v-model="registerForm.internalEmail"
                        type="email"
                        size="large"
                        :placeholder="t('register.internalEmailPlaceholder')">
                <template #prefix>
                  <el-icon>
                    <Message />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- External Email -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('register.externalEmail') }}
            </label>
            <el-form-item prop="externalEmail" class="mb-0">
              <el-input v-model="registerForm.externalEmail"
                        type="email"
                        size="large"
                        :placeholder="t('register.externalEmailPlaceholder')">
                <template #prefix>
                  <el-icon>
                    <Message />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Password -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.password') }}
            </label>
            <el-form-item prop="password" class="mb-0">
              <el-input v-model="registerForm.password"
                        type="password"
                        size="large"
                        :placeholder="t('register.passwordPlaceholder')">
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Confirm Password -->
          <div class="form-field">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.confirmPassword') }}
            </label>
            <el-form-item prop="confirmPassword" class="mb-0">
              <el-input v-model="registerForm.confirmPassword"
                        type="password"
                        size="large"
                        :placeholder="t('register.confirmPasswordPlaceholder')"
                        @keyup.enter="handleRegister">
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </div>

          <!-- Verification Code -->
          <div class="form-field" v-if="captchaEnabled">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500 mr-1">*</span>
              {{ t('register.verificationCode') }}
            </label>
            <el-form-item prop="code" class="mb-0">
              <div class="flex space-x-4">
                <el-input v-model="registerForm.code"
                          size="large"
                          :placeholder="t('register.verificationCodePlaceholder')"
                          class="flex-grow"
                          @keyup.enter="handleRegister">
                  <template #prefix>
                    <svg-icon iconClass="code" />
                  </template>
                </el-input>
                <div class="w-4/12 h-[40px]">
                  <img :src="codeUrl" @click="getCode" class="h-full cursor-pointer rounded" />
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- Agreement -->
          <div class="form-field">
            <el-form-item prop="agreement" class="mt-6">
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
          </div>

          <!-- Register Button -->
          <el-button :loading="loading"
                     size="large"
                     type="primary"
                     class="w-full !bg-gradient-to-r from-primary to-primary-light hover:opacity-90 text-white font-semibold h-12 text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                     @click.prevent="handleRegister">
            <span v-if="!loading">{{ t('register.registerButton') }}</span>
            <span v-else>{{ t('register.registering') }}</span>
          </el-button>
        </div>
      </template>

      <!-- Login Link -->
      <div class="text-center text-sm text-gray-600 pt-4 border-t-2 border-gray-200">
        <span>{{ t('register.haveAccount') }}&nbsp;</span>
        <router-link to="/login" class="text-blue-500 hover:text-blue-600 font-medium transition-colors">
          {{ t('register.loginNow') }}
        </router-link>
      </div>
    </el-form>
  </div>

  <!-- Agreement Dialog -->
  <el-dialog v-model="dialogVisible"
             :title="t('register.agreementTitle')"
             width="70%"
             :before-close="handleDialogClose"
             class="font-bold">
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
import { Icon } from '@iconify/vue';
import { User, Lock, Message } from '@element-plus/icons-vue';

const { t } = useI18n();
const router = useRouter();
const { proxy } = getCurrentInstance();

// 状态变量
const loading = ref(false);
const captchaEnabled = ref(true);
const codeUrl = ref('');
const dialogVisible = ref(false);
const userTypeSelected = ref(false);
const selectedUserType = ref(null);

// 用户类型选项
const userTypes = [
  { value: 'student', label: t('register.userTypes.student'), icon: 'mdi:school' },
  { value: 'admin', label: t('register.userTypes.admin'), icon: 'mdi:shield-account' },
  { value: 'counselor', label: t('register.userTypes.counselor'), icon: 'mdi:account-tie' },
  { value: 'volunteer', label: t('register.userTypes.volunteer'), icon: 'mdi:hand-heart' },
];

// 表单数据
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
  agreement: false,
  userType: '',
});

// 模拟辅导员数据
const counselors = ref([
  { id: '001', name: 'Counselor A', comment: '负责A-G' },
  { id: '002', name: 'Counselor B', comment: '负责H-N' },
  { id: '003', name: 'Counselor C', comment: '负责O-Z' },
  { id: '004', name: 'John Doe' },
]);

// 密码确认验证
const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error(t('register.passwordMismatch')));
  } else {
    callback();
  }
};

// 表单验证规则
const registerRules = {
  givenName: [
    { required: true, trigger: 'blur', message: proxy.$t('register.givenNameRequired') },
    { pattern: /^[A-Za-z]+$/, message: proxy.$t('register.onlyEnglishAllowed'), trigger: 'blur' }
  ],
  middleName: [
    { required: false, trigger: 'blur' },
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
    { type: 'string', required: true, message: proxy.$t('register.graduationYearRequired'), trigger: 'change' }
  ],
  internalEmail: [
    { type: 'email', required: true, message: proxy.$t('register.internalEmailRequired'), trigger: ['blur', 'change'] }
  ],
  externalEmail: [
    { type: 'email', required: false, message: proxy.$t('register.externalEmailRequired'), trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, trigger: 'blur', message: proxy.$t('register.passwordRequired') },
    { min: 5, max: 20, message: proxy.$t('register.passwordLengthError'), trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: proxy.$t('register.confirmPasswordRequired') },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ],
  code: [
    { required: true, trigger: 'change', message: t('register.verificationCodeRequired') }
  ],
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

// 用户类型选择相关方法
const selectUserType = (type) => {
  selectedUserType.value = type;
  userTypeSelected.value = true;
  registerForm.value.userType = type;
};

const resetUserType = () => {
  userTypeSelected.value = false;
  selectedUserType.value = null;
  registerForm.value.userType = '';
};

// 验证码相关方法
const getCode = () => {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      registerForm.value.uuid = res.uuid;
    }
  });
};

// 注册相关方法
const handleRegister = () => {
  proxy.$refs.registerRef.validate(valid => {
    if (valid) {
      loading.value = true;
      register(registerForm.value).then(res => {
        ElMessageBox.alert(t('register.registrationSuccess'), {
          dangerouslyUseHTMLString: true,
          type: 'success',
        }).then(() => {
          router.push('/login');
        }).catch(() => { });
      }).catch(() => {
        loading.value = false;
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
};

// 协议相关方法
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

// 生命周期钩子
onMounted(() => {
  getCode();
});
</script>

<style scoped>
.gradient-border {
  height: 3px;
  background: linear-gradient(to right,
    var(--primary-color),
    var(--primary-light),
    var(--gradient-end)
  );
  border-radius: 1.5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-type-button {
  @apply relative overflow-hidden shadow-sm;
}

.icon-wrapper {
  @apply transition-all duration-300;
}

.user-type-button:hover .icon-wrapper {
  @apply transform scale-110;
}

/* Input styling */
.el-input :deep(.el-input__wrapper) {
  @apply shadow-sm border border-gray-200 rounded-lg transition-all duration-200;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.el-input :deep(.el-input__wrapper:hover) {
  @apply border-primary/60;
}

.el-input :deep(.el-input__wrapper.is-focus) {
  @apply border-primary ring-2 ring-primary/20;
}

/* Form field styling */
.form-field {
  @apply space-y-2;
}

.form-field label {
  @apply text-gray-700 font-medium;
}

/* Select styling */
.el-select :deep(.el-input__wrapper) {
  @apply shadow-sm border border-gray-200;
}

/* Checkbox styling */
.el-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  @apply bg-primary border-primary;
}

/* Date picker styling */
.el-date-picker :deep(.el-input__wrapper) {
  @apply shadow-sm border border-gray-200;
}
</style>
