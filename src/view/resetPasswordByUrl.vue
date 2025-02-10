<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-2xl rounded-lg overflow-hidden p-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">重置密码</h2>
        <div class="reset-password-by-url space-y-6">
          <el-form ref="registerRef"  class="reset-password-form space-y-4" :model="resetPassForm" :rules="resetPassRules">
            <el-form-item label="密码" prop="password" label-position="top">
              <el-input
                v-model="resetPassForm.password"
                type="password"
                size="large"
                auto-complete="off"
                placeholder="密码"
                @keyup.enter="handleResetPass"
              >
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword"  label-position="top">
              <el-input
                v-model="resetPassForm.confirmPassword"
                type="password"
                size="large"
                auto-complete="off"
                placeholder="确认密码"
                @keyup.enter="handleResetPass"
              >
                <template #prefix>
                  <el-icon>
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <div>
              <el-button
                :loading="loading"
                size="large"
                type="primary"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click.prevent="handleResetPass"
              >
                <span v-if="!loading">提 交</span>
                <span v-else>提 交 中...</span>
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref,getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import {resetPassword} from '../api/login';
const { proxy } = getCurrentInstance();

const route = useRoute();

const loading = ref(false);
const resetPassForm = ref({
  password: '',
  confirmPassword:'',
  uuid:''
});
const equalToPassword = (rule, value, callback) => {
  if (resetPassForm.value.password !== value) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};
const resetPassRules = {
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
    { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请再次输入您的密码' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ],
};
const handleResetPass = () => {
  if(resetPassForm.value.uuid) {
    proxy.$refs.registerRef.validate(valid => {
      if (valid) {
        resetPassword(resetPassForm.value).then(res => {
          if(res.code == 200) {
            ElMessage.success('修改密码成功');
            proxy.$router.push({ path: '/login' });
          }else{
            ElMessage.error('修改密码失败' + res.msg);
          }
        });
      }
    });
  }else{
    ElMessage.error('验证失败');
  }

};
onMounted(() => {
  resetPassForm.value.uuid = route.params.uuid;
});
</script>

<style scoped>
.reset-password-by-url {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-size: cover;
}
.register {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-size: cover;
}
.reset-password-form {
	border-radius: 6px;
	background: #ffffff;
	width: 400px;
	padding: 25px 25px 5px 25px;
}
.reset-password-form .el-input {
	height: 40px;
}
.reset-password-form .el-input input {
	height: 40px;
}
.reset-password-form .input-icon {
	height: 39px;
	width: 14px;
	margin-left: 0px;
}
.register-tip {
	font-size: 13px;
	text-align: center;
	color: #bfbfbf;
}
</style>