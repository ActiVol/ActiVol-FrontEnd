<template>
  <div class="w-full max-w-3xl mx-auto">
    <el-form ref="tempActivityRef" :model="form" :rules="rules" class="login-form space-y-6">
      <el-form-item v-hasLogin label="姓名" prop="userName" label-position="top">
        <el-input v-model="form.userName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item v-hasLogin label="学号" prop="studentId"  label-position="top">
        <el-input
          v-model="form.studentId"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="学号"
        >
          <template #prefix>
            <svg-icon iconClass="student-id"/>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-hasLogin label="毕业年份" prop="graduationYear"  label-position="top">
        <el-date-picker
          v-model="form.graduationYear"
          type="year"
          placeholder="毕业年份"
          style="width: 100%;"
          format="YYYY"
          value-format="YYYY"
        />
      </el-form-item>
      <el-form-item v-hasLogin label="校内邮箱" prop="internalEmail"  label-position="top">
        <el-input
          v-model="form.internalEmail"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="校内邮箱"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-hasLogin label="校外邮箱" prop="email"  label-position="top">
        <el-input
          v-model="form.email"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="校外邮箱"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="参加活动的名称" prop="activityName"  label-position="top">
        <el-input
          v-model="form.activityName"
          size="large"
          auto-complete="off"
          placeholder="参加活动的名称"
        >
          <template #prefix>
            <el-icon>
              <House />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="参加活动的地点" prop="address"  label-position="top">
        <el-input
          v-model="form.address"
          size="large"
          auto-complete="off"
          placeholder="参加活动的地点"
        >
          <template #prefix>
            <el-icon>
              <LocationInformation />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="活动开始时间" prop="startTime"  label-position="top">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="参加活动的日期"
          style="width: 100%;"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endTime" label-position="top">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="活动结束时间"
          style="width: 100%;"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="参加活动的总时长（小时）" prop="duration"  label-position="top">
        <el-input
          v-model="form.duration"
          type="number"
          size="large"
        >
          <template #prefix>
            <el-icon><Timer /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="参加活动的图片" prop="activityPictures" label-position="top">
        <el-upload
          class="px-3 py-5 bg-blue-100"
          :action="uploadImgUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else ><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="服务领域" prop="serviceField" label-position="top">
        <el-select v-model="form.serviceField" placeholder="请选择服务领域">
          <el-option v-for="dict in service_field" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="服务对象" prop="serviceObject" label-position="top">
        <el-select v-model="form.serviceObject" placeholder="请选择服务对象">
          <el-option v-for="dict in service_object" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="服务场所" prop="serviceLocation" label-position="top">
        <el-select v-model="form.serviceLocation" placeholder="请选择服务场所">
          <el-option v-for="dict in service_location" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item v-hasLogin label="活动举办者的名字" prop="leader"  label-position="top">
        <el-input
          v-model="form.leader"
          size="large"
          auto-complete="off"
          placeholder="活动举办者的名字"
        >
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-hasLogin label="活动举办者的邮箱" prop="leaderEmail"  label-position="top">
        <el-input
          v-model="form.leaderEmail"
          size="large"
          auto-complete="off"
          placeholder="活动举办者的邮箱"
        >
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="参加活动的简介" prop="details"  label-position="top">
        <el-input
          v-model="form.details"
          type="textarea"
          size="large"
          :rows="3"
          placeholder="参加活动的简介"
        >
          <template #prefix>
            <el-icon>
              <Document />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-hasLogin label="对管理员的留言" label-position="top">
        <el-input
          v-model="form.leaveMessage"
          size="large"
          type="textarea"
          :rows="3"
          auto-complete="off"
          placeholder="对管理员的留言"
        >
          <template #prefix>
            <el-icon>
              <Message />
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
          @click.prevent="handleSubmit"
        >
          <span v-if="!loading">提 交</span>
          <span v-else>提 交 中...</span>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref,onMounted,getCurrentInstance} from 'vue';
import {addTempAcitivity} from '@/api/openness/openness';
import config from 'config';
const { proxy } = getCurrentInstance();
const { service_field, service_object,service_location } = proxy.useDict('service_field','service_object', 'service_location');
const loading = ref(false);
const uploadImgUrl = config.baseURL + '/openness/upload/image'; // 上传的图片服务器地址
const imageUrl = ref('');
import { getToken } from '../utils/auth';
const isLoggedIn = getToken();
const form = ref({
  userName: '',
  studentId:'',
  graduationYear: null,
  internalEmail: null,
  startTime:null,
  endTime:null,
  email: '',
  address: '',
  duration: null,
  leader:'',
  leaderEmail:'',
  leaveMessage:'',
  activityPictures:'',
  code: '',
  uuid: ''
});
const endTimeValidator = (rule, value, callback) => {
  if (value && form.value.startTime) {
    const start = new Date(form.value.startTime).getTime();
    const end = new Date(value).getTime();
    if (end <= start) {
      callback(new Error('结束时间必须大于开始时间'));
    } else {
      callback(); // 验证通过
    }
  }
};
const rules = {
  userName: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
  studentId: [{ required: true, trigger: 'blur', message: '请输入学号' }],
  graduationYear: [{ required: true, trigger: 'change', message: '请选择毕业年份' }],
  internalEmail: [{type: 'email',required: true,message: '请输入正确校内邮箱地址',trigger: ['blur','change']}],
  email: [{type: 'email',required: true,message: '请输入正确校内邮箱地址',trigger: ['blur','change']}],
  activityName: [{ required: true, trigger: 'blur', message: '请输入参加活动的名称' }],
  address: [{ required: true, trigger: 'blur', message: '请输入参加活动的地点' }],
  startTime: [{ required: true, trigger: 'change', message: '请选择参加活动的日期' }],
  endTime: [{ validator: endTimeValidator(), trigger: 'change' }],
  duration: [{ required: true, trigger: 'blur', message: '请输入参加活动的总时长（小时）' }],
  activityPictures: [{ required: true, trigger: 'change', message: '请上传参加活动的图片' }],
  serviceField: [{ required: true, trigger: 'change', message: '请选择服务领域' }],
  serviceObject: [{ required: true, trigger: 'change', message: '请选择服务对象' }],
  serviceLocation: [{ required: true, trigger: 'change', message: '请选择服务场所' }],
  leader: [{ required: true, trigger: 'blur', message: '请输入活动举办者的名字' }],
  leaderEmail: [{type: 'email',required: true,message: '请输入正确校内邮箱地址',trigger: ['blur','change']}],
  details: [{ required: true, trigger: 'blur', message: '请输入参加活动的简介' }],
};
const handleAvatarSuccess = (response,
  uploadFile) => {
  form.value.activityPictures = response.url;
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};
const beforeAvatarUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过20MB!');
  }
};
const handleSubmit = () => {
  proxy.$refs.tempActivityRef.validate(valid => {
    if (valid) {
      loading.value = true;
      if(isLoggedIn) {
        addTempAcitivityByToken(form.value)
          .then(response => {
            if(response.code === 200) {
              ElMessage({
                message: '提交成功',
                type: 'success'
              });
            }else{
              ElMessage({
                message: '提交失败' + response.msg,
                type: 'error'
              });
            }
            loading.value = false;
          }).catch(error => {
            loading.value = false;
          });
      }else{
        addTempAcitivity(form.value)
          .then(response => {
            if(response.code === 200) {
              ElMessage({
                message: '提交成功',
                type: 'success'
              });
            }else{
              ElMessage({
                message: '提交失败' + response.msg,
                type: 'error'
              });
            }
            loading.value = false;
          }).catch(error => {
            loading.value = false;
          });
      }

    }
  });
};
</script>