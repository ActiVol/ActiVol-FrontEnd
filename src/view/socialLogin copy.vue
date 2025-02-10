<template>
  <div v-if="isShow" class="flex justify-center items-center min-h-screen bg-cover">
    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="w-full max-w-md space-y-4">
      <!-- Given Name -->
      <el-form-item :label="$t('register.givenName')" prop="givenName" label-position="top">
        <template #label>
          <div class="flex items-center gap-1">
            <span>{{ $t('register.givenName') }}</span>
            <el-tooltip
              :content="$t('register.givenNameTip')"
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
          :placeholder="$t('register.givenName')"
          class="w-full"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- Family Name -->
      <el-form-item :label="$t('register.familyName')" prop="familyName" label-position="top">
        <template #label>
          <div class="flex items-center gap-1">
            <span>{{ $t('register.familyName') }}</span>
            <el-tooltip
              :content="$t('register.familyNameTip')"
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
          :placeholder="$t('register.familyName')"
          class="w-full"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- Username -->
      <el-form-item :label="$t('register.username')" prop="username" label-position="top">
        <template #label>
          <div class="flex items-center gap-1">
            <span>{{ $t('register.username') }}</span>
            <el-tooltip
              :content="$t('register.usernameTip')"
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
          :placeholder="$t('register.username')"
          class="w-full"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('register.studentId')" prop="studentId" label-position="top">
        <el-input
          v-model="registerForm.studentId"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="$t('register.studentId')"
          class="w-full"
        >
          <template #prefix>
            <svg-icon iconClass="student-id" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('register.graduationYear')" prop="graduationYear" label-position="top">
        <el-date-picker
          v-model="registerForm.graduationYear"
          type="year"
          :placeholder="$t('register.graduationYear')"
          size="large"
          format="YYYY"
          value-format="YYYY"
          style="width: 100%;"
        />
      </el-form-item>

      <!-- 下拉选择辅导员 -->
      <el-form-item :label="$t('register.counselor')" prop="counselor" label-position="top">
        <el-select
          v-model="registerForm.counselor"
          :placeholder="$t('register.counselor')"
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

      <el-form-item :label="$t('register.internalEmail')" prop="insideEmail" label-position="top">
        <el-input
          v-model="registerForm.insideEmail"
          type="email"
          size="large"
          auto-complete="off"
          :placeholder="$t('register.internalEmail')"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('register.externalEmail')" prop="email" label-position="top">
        <el-input
          v-model="registerForm.email"
          type="email"
          size="large"
          auto-complete="off"
          :placeholder="$t('register.externalEmail')"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('register.password')" prop="password" label-position="top">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="$t('register.password')"
          class="w-full"
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('register.confirmPassword')" prop="confirmPassword" label-position="top">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="$t('register.confirmPassword')"
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
      <el-button
        :loading="loading"
        size="large"
        type="primary"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        @click.prevent="handleRegister"
      >
        <span v-if="!loading">{{ $t('register.registerButton') }}</span>
        <span v-else>{{ $t('register.registering') }}</span>
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted ,getCurrentInstance,ref} from 'vue';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { useRouter,useRoute} from 'vue-router';
import { socialLogin,socialLock,socialRegister } from '../api/login';
import { setToken } from '../utils/auth';
import useUserStore from '../stores/modules/user';
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const isShow = ref(false);
const loading = ref(false);
let loadingInstance;
const { proxy } = getCurrentInstance();
const registerForm = ref({
  familyName: '',
  givenName: '',
  username: '',
  studentId: '',
  counselor: '',
  graduationYear: null,
  insideEmail: '',
  email: '',
  password: '',
  confirmPassword: '',
  uuid: '',
  avatar: '',
  source: '',
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
    // { pattern: /^[A-Za-z]+$/, message: proxy.$t('register.onlyEnglishAllowed'), trigger: 'blur' }
  ],
  familyName: [
    { required: true, trigger: 'blur', message: proxy.$t('register.familyNameRequired') },
    // { pattern: /^[A-Za-z]+$/, message: proxy.$t('register.onlyEnglishAllowed'), trigger: 'blur' }
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
  insideEmail:[
    { type: 'email', required: true, message: proxy.$t('register.internalEmailRequired'), trigger: ['blur','change']}
  ],
  email:[
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
      socialRegister(registerForm.value).then(res => {
        if (res.code == 200) {
          setToken(res.token);
          ElMessage.success('注册成功');
          router.push({ path: '/home' });
        }else{
          loading.value = false;
        }
      }).catch(err => {
        loading.value = false;
      });
    }
  });
};
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
const init = () => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: proxy.$t('login.otherLoginLoadingTitle'),
    svg: svg,
    background: 'rgba(0, 0, 0, 0.7)',
  });
  // 第三方登录回调参数
  let source = route.query.source;
  let code = route.query.code;
  let state = route.query.state;

  socialLogin(source,code,state).then((res) => {
    let {code,token,msg} = res;
    if(code != 200) {
      return ElMessage.error(msg);
    }
    if(token && token != '' && token != null) {
      setToken(token);
      loadingInstance.close();
      return router.push({ path: '/home' });
    }
    let {familyName,givenName,email,uuid,accountCheck,userId,source,avatar,nickName,userName} = res.data;
    if(accountCheck) {
      ElMessageBox.confirm(`是否绑定邮箱为:${email}，用户昵称为:${nickName}账户`, '绑定账号', {
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            familyName,givenName,email,uuid
            ,accountCheck,userId,source,avatar,nickName,userName
          };
          socialLock(params).then((response) => {
            setToken(response.token);
            ElMessage.success('绑定成功');
            router.push({ path: '/home' });
          });
        }).catch(() => {
          router.push({ path: '/register' });
        });
    }else{
      registerForm.value.familyName = familyName;
      registerForm.value.givenName = givenName;
      registerForm.value.insideEmail = email;
      registerForm.value.email = email;
      registerForm.value.uuid = uuid;
      registerForm.value.avatar = avatar;
      registerForm.value.source = source;
      isShow.value = true;
    }
    loadingInstance.close();
  }).catch(err => {
    loadingInstance.close();
    ElMessage.error(err.msg);
  });
};
onMounted(() => {
  init();
});
</script>