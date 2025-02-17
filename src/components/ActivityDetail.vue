<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden"  v-loading="loading" :element-loading-svg="svg">
    <div class="relative">
      <div v-if="tempActivity&&tempActivity.activityPictures" class="overflow-hidden">
        <img :src="tempActivity.activityPictures" :alt="truncateDescription(tempActivity.activityName,10)" class="w-full h-full object-cover" />
      </div>
      <div v-else :class="['flex items-center justify-center']">
        <span class="text-4xl text-white">{{ truncateDescription(tempActivity.activityName,10) }}</span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ truncateDescription(tempActivity.activityName,10) }}</h3>

      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500">
          <div class="flex items-center">
            <div class="w-4 h-4 mr-1"><svg-icon iconClass="zmrs"  /></div>
          </div>
          <div class="text font-medium max-w-3xl mx-auto">
            <span class="mr-1">招募人数：</span>
            <span class="mr-1">{{  tempActivity.recruitedNumber }}</span>
            <span>/</span>
            <span class="mr-1">{{  tempActivity.recruitNumber }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500">
          <Icon icon="mdi:calendar" class="w-4 h-4 mr-1" />
          <span class="mr-1">活动日期：</span>
          <span class="mr-1">{{ tempActivity.startTime }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500 mr-2">
          <div class="flex items-center">
            <div class="w-4 h-4 mr-1"><svg-icon iconClass="map-marker" /></div>
            <span class="w-20 text-sm mr-1">活动地址：</span>
          </div>
          <span class="mr-1">{{ tempActivity.address }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500 mr-2">
          <div class="flex items-center">
            <div class="w-4 h-4 mr-1"><svg-icon iconClass="ic_leader" /></div>
          </div>
          <span class="text-sm mr-1">举&nbsp;&nbsp;办&nbsp;&nbsp;者：</span>
          <span class="mr-1">{{ tempActivity?.dept?.leader }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500 mr-2">
          <div class="flex items-center">
            <div class="w-4 h-4 mr-1"><svg-icon iconClass="email" /></div>
          </div>
          <span class="text-sm mr-1">邮&nbsp;&nbsp;&nbsp;&nbsp;箱&nbsp;&nbsp;&nbsp;&nbsp;：</span>
          <span class="mr-1" @click="copyCurrentUrl(tempActivity?.dept?.email)">{{ tempActivity?.dept?.email }}</span>
        </div>
      </div>
      <div class="flex items-center mb-2">
        <dict-tag class="mr-2" :options="serviceFields" :value="tempActivity.serviceField"/>
        <dict-tag class="mr-2" :options="serviceObjects" :value="tempActivity.serviceObject"/>
        <dict-tag class="mr-2" :options="serviceLocations" :value="tempActivity.serviceLocation"/>
      </div>
      <div class="mr-2">
        <p class="text font-bold text-gray-800 mb-2">活动详情</p>
      </div>
      <div class="bg-grey shadow-lg overflow-hidden px-2 py-2" style="border:solid 1px #00cbab">
        <p class="text-sm text-gray-600 mb-2">{{ tempActivity.details }}</p>
      </div>
    </div>
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
</template>

<script setup>
import {defineProps,ref, watch,onMounted,defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import {signUpActivity} from '../api/openness/openness';
import { getToken } from '../utils/auth';
import {copyCurrentUrl} from '../utils/ruoyi';
import { Icon } from '@iconify/vue';
defineComponent(['Icon']);
import { useRouter } from 'vue-router';
const router = useRouter();
import config from 'config';
const baseURL = config.baseURL;
import { useRoute } from 'vue-router';
import { getActivityDetailById } from '../api/openness/openness';
const tempActivity = ref({});
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
const loading = ref(false);
const props = defineProps({
  serviceField: Object,
  serviceLocation: Object,
  serviceObject: Object
});
const serviceFields = ref([]);
const serviceObjects = ref([]);
const serviceLocations = ref([]);
watch(() => props.serviceField, (newValue) => {
  serviceFields.value = newValue;
},{deep:true,immediate:true});
watch(() => props.serviceObject, (newValue) => {
  serviceObjects.value = newValue;
},{deep:true,immediate:true});
watch(() => props.serviceLocation, (newValue) => {
  serviceLocations.value = newValue;
},{deep:true,immediate:true});
const truncateDescription = (details, maxLength = 100) => {
  return details && details.length > maxLength
    ? details.substring(0, maxLength) + '...'
    : details;
};
const handleSubmit = () => {
  if(!getToken()) {
    return router.push('/login');
  }
  loading.value = true;
  signUpActivity(tempActivity.value.activityId).then((res) => {
    if(res.code == 200) {
      loading.value = false;
      ElMessage({
        message: '报名成功',
        type: 'success'
      });
      return router.push('/home');
    }
    loading.value = false;
    ElMessage({
      message: '报名失败',
      type: 'error'
    });

  }).catch(error => {
    loading.value = false;
  });
};
onMounted(() => {
  loading.value = true;
  const route = useRoute();
  const activityId = route.query.activityId;
  getActivityDetailById(activityId).then((res) => {
    if(res.code == 200) {
      tempActivity.value = res.data;
      loading.value = false;
    }
  }).catch(error => {
    loading.value = false;
  });
});
</script>