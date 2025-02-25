<template>
  <div class="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
    <el-form ref="tempActivityRef" :model="form" :rules="rules" class="space-y-6" :validate-on-rule-change="false">
      <!-- User Real Name -->
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="$t('page.logTime.firstName')" prop="firstName" label-position="top">
            <el-input v-model="form.firstName" :placeholder="$t('page.logTime.enterFirstName')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('page.logTime.middleName')" prop="middleName" label-position="top">
            <el-input v-model="form.middleName" :placeholder="$t('page.logTime.enterMiddleName')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('page.logTime.lastName')" prop="lastName" label-position="top">
            <el-input v-model="form.lastName" :placeholder="$t('page.logTime.enterLastName')" />
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-form-item :label="$t('page.logTime.username')" prop="username" label-position="top">
        <el-input v-model="form.username" :placeholder="$t('page.logTime.enterUsername')" />
        <span class="mt-1 text-gray-500 text-sm">{{ $t('page.logTime.usernameTip') }}</span>
      </el-form-item>

      <el-form-item v-hasLogin :label="$t('page.logTime.graduationYear')" prop="graduationYear" label-position="top">
        <el-date-picker v-model="form.graduationYear"
                        type="year"
                        :placeholder="$t('page.logTime.selectGraduationYear')"
                        style="width: 100%;"
                        format="YYYY"
                        value-format="YYYY" />
      </el-form-item>

      <el-form-item v-hasLogin :label="$t('page.logTime.internalEmail')" prop="internalEmail" label-position="top">
        <el-input v-model="form.internalEmail" type="text" size="large" auto-complete="off" :placeholder="$t('page.logTime.enterInternalEmail')">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-hasLogin :label="$t('page.logTime.externalEmail')" prop="externalEmail" label-position="top">
        <el-input v-model="form.externalEmail" type="text" size="large" auto-complete="off" :placeholder="$t('page.logTime.enterExternalEmail')">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('page.logTime.activityName')" prop="activityName" label-position="top">
        <el-input v-model="form.activityName" size="large" auto-complete="off" :placeholder="$t('page.logTime.enterActivityName')">
          <template #prefix>
            <el-icon><House /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('page.logTime.activityLocation')" prop="address" label-position="top">
        <el-input v-model="form.address" size="large" auto-complete="off" :placeholder="$t('page.logTime.enterActivityLocation')">
          <template #prefix>
            <el-icon><LocationInformation /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('page.logTime.startTime')" prop="startTime" label-position="top">
        <el-date-picker v-model="form.startTime"
                        type="date"
                        :placeholder="$t('page.logTime.selectStartTime')"
                        style="width: 100%;"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item :label="$t('page.logTime.endTime')" prop="endTime" label-position="top">
        <el-date-picker v-model="form.endTime"
                        type="date"
                        :placeholder="$t('page.logTime.selectEndTime')"
                        style="width: 100%;"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item :label="$t('page.logTime.duration')" prop="duration" label-position="top">
        <el-input v-model="form.duration" type="number" size="large" :placeholder="$t('page.logTime.enterDuration')">
          <template #prefix>
            <el-icon><Timer /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-hasLogin :label="$t('page.logTime.organizerName')" prop="organizer" label-position="top">
        <el-input v-model="form.organizer" size="large" auto-complete="off" :placeholder="$t('page.logTime.enterOrganizerName')">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-hasLogin :label="$t('page.logTime.organizerEmail')" prop="organizerEmail" label-position="top">
        <el-input v-model="form.organizerEmail" size="large" auto-complete="off" :placeholder="$t('page.logTime.enterOrganizerEmail')">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('page.logTime.activityDescription')" prop="details" label-position="top">
        <el-input v-model="form.details" type="textarea" size="large" :rows="3" :placeholder="$t('page.logTime.enterActivityDescription')">
          <template #prefix>
            <el-icon><Document /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-hasLogin :label="$t('page.logTime.messageToAdmin')" label-position="top">
        <el-input v-model="form.leaveMessage"
                  size="large"
                  type="textarea"
                  :rows="3"
                  auto-complete="off"
                  :placeholder="$t('page.logTime.enterMessageToAdmin')">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <div>
        <el-button :loading="loading"
                   size="large"
                   type="primary"
                   class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                   @click.prevent="handleSubmit">
          <span v-if="!loading">{{ $t('page.logTime.submit') }}</span>
          <span v-else>{{ $t('page.logTime.submitting') }}</span>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { addTempAcitivity } from '@/api/openness/openness';
import { getToken } from '../utils/auth';
import config from 'config';

const { proxy } = getCurrentInstance();
const { service_field, service_object, service_location } = proxy.useDict('service_field', 'service_object', 'service_location');
const loading = ref(false);
const uploadImgUrl = config.baseURL + '/openness/upload/image';
const imageUrl = ref('');

const isLoggedIn = getToken();
const form = ref({
  // firstName: '',
  // middleName: '',
  // lastName: '',
  username: '',
  graduationYear: null,
  internalEmail: null,
  externalEmail: '',
  startTime: null,
  endTime: null,
  address: '',
  duration: null,
  organizer: '',
  organizerEmail: '',
  leaveMessage: '',
  activityPictures: '',
  code: '',
  uuid: ''
});

const endTimeValidator = (rule, value, callback) => {
  if (value && form.value.startTime) {
    const start = new Date(form.value.startTime).getTime();
    const end = new Date(value).getTime();
    if (end <= start) {
      callback(new Error(proxy.$t('page.logTime.endTimeError')));
    } else {
      callback(); // 验证通过
    }
  }
};

const rules = ref({
  // firstName: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.firstNameRequired') }],
  // lastName: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.lastNameRequired') }],
  username: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.usernameRequired') }],
  graduationYear: [{ required: true, trigger: 'change', message: proxy.$t('page.logTime.graduationYearRequired') }],
  internalEmail: [{ type: 'email', required: true, message: proxy.$t('page.logTime.internalEmailInvalid'), trigger: ['blur', 'change'] }],
  externalEmail: [{ type: 'email', required: false, message: proxy.$t('page.logTime.externalEmailInvalid'), trigger: ['blur', 'change'] }],
  activityName: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.activityNameRequired') }],
  address: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.activityLocationRequired') }],
  startTime: [{ required: true, trigger: 'change', message: proxy.$t('page.logTime.startTimeRequired') }],
  endTime: [{ validator: endTimeValidator, trigger: 'change' }],
  duration: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.durationRequired') }],
  serviceField: [{ required: true, trigger: 'change', message: proxy.$t('page.logTime.serviceFieldRequired') }],
  serviceObject: [{ required: true, trigger: 'change', message: proxy.$t('page.logTime.serviceObjectRequired') }],
  serviceLocation: [{ required: true, trigger: 'change', message: proxy.$t('page.logTime.serviceLocationRequired') }],
  organizer: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.organizerNameRequired') }],
  organizerEmail: [{ type: 'email', required: true, message: proxy.$t('page.logTime.organizerEmailInvalid'), trigger: ['blur', 'change'] }],
  details: [{ required: true, trigger: 'blur', message: proxy.$t('page.logTime.activityDescriptionRequired') }],
});

const handleAvatarSuccess = (response, uploadFile) => {
  form.value.activityPictures = response.url;
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    ElMessage.error(proxy.$t('page.logTime.imageSizeError'));
  }
};

const handleSubmit = () => {
  proxy.$refs.tempActivityRef.validate(valid => {
    if (valid) {
      loading.value = true;
      const submitFunction = isLoggedIn ? addTempAcitivityByToken : addTempAcitivity;

      submitFunction(form.value)
        .then(response => {
          if (response.code === 200) {
            ElMessage({
              message: proxy.$t('page.logTime.submitSuccess'),
              type: 'success'
            });
          } else {
            ElMessage({
              message: proxy.$t('page.logTime.submitFail') + response.msg,
              type: 'error'
            });
          }
        })
        .catch(error => {
          ElMessage({
            message: proxy.$t('page.logTime.submitError'),
            type: 'error'
          });
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 1.5rem;
}

.el-input, .el-select, .el-date-picker {
  width: 100%;
}

.el-textarea__inner {
  min-height: 100px;
}
</style>