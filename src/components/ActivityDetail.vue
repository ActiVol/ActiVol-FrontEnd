<template>
  <div class="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden" v-loading="loading" :element-loading-svg="svg">
      <!-- Activity Image/Header Section -->
      <div class="relative">
        <div v-if="tempActivity?.activityPictures" class="h-64 sm:h-96 overflow-hidden">
          <img
            :src="tempActivity.activityPictures"
            :alt="truncateDescription(tempActivity.activityName, 10)"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-else class="h-64 sm:h-96 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
          <span class="text-3xl sm:text-4xl text-white font-bold px-6 text-center">
            {{ truncateDescription(tempActivity.activityName, 20) }}
          </span>
        </div>
      </div>

      <!-- Activity Content -->
      <div class="p-6 sm:p-8">
        <!-- Title and Tags Section -->
        <div class="mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {{ tempActivity.activityName }}
          </h1>
          <div class="flex flex-wrap gap-2">
            <dict-tag
              v-for="(tag, type) in {
                serviceField: serviceFields,
                serviceObject: serviceObjects,
                serviceLocation: serviceLocations
              }"
              :key="type"
              :options="tag"
              :value="tempActivity[type]"
              class="transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>

        <!-- Key Information Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <!-- Recruitment Status -->
          <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div class="p-2 bg-blue-100 rounded-lg">
              <Icon icon="mdi:account-group" class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div class="text-sm text-gray-500">招募人数</div>
              <div class="text-lg font-semibold text-gray-900">
                {{ tempActivity.recruitedNumber }} / {{ tempActivity.recruitNumber }}
              </div>
            </div>
          </div>

          <!-- Activity Date -->
          <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div class="p-2 bg-green-100 rounded-lg">
              <Icon icon="mdi:calendar" class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div class="text-sm text-gray-500">活动日期</div>
              <div class="text-lg font-semibold text-gray-900">
                {{ tempActivity.startTime }}
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg sm:col-span-2">
            <div class="p-2 bg-purple-100 rounded-lg">
              <Icon icon="mdi:map-marker" class="w-6 h-6 text-purple-600" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-500">活动地址</div>
              <div class="text-lg font-semibold text-gray-900 truncate">
                {{ tempActivity.address }}
              </div>
            </div>
          </div>
        </div>

        <!-- Organizer Information -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">主办方信息</h2>
          <div class="space-y-3">
            <div class="flex items-center">
              <Icon icon="mdi:account" class="w-5 h-5 text-gray-400 mr-3" />
              <span class="text-sm text-gray-500 w-20">举办者：</span>
              <span class="text-sm text-gray-900">{{ tempActivity?.dept?.leader }}</span>
            </div>
            <div class="flex items-center">
              <Icon icon="mdi:email" class="w-5 h-5 text-gray-400 mr-3" />
              <span class="text-sm text-gray-500 w-20">邮箱：</span>
              <span
                class="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                @click="copyCurrentUrl(tempActivity?.dept?.email)"
              >
                {{ tempActivity?.dept?.email }}
              </span>
            </div>
          </div>
        </div>

        <!-- Activity Details -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">活动详情</h2>
          <div class="bg-gray-50 rounded-lg p-6">
            <p class="text-gray-700 whitespace-pre-line">{{ tempActivity.details }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <el-button
          :loading="loading"
          type="primary"
          class="w-full py-3 px-4 text-base font-medium transition-all duration-300 hover:scale-[1.02]"
          @click.prevent="handleSubmit"
        >
          {{ loading ? '报名中...' : '立即报名' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted, defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { signUpActivity, getActivityDetailById } from '../api/openness/openness';
import { getToken } from '../utils/auth';
import { copyCurrentUrl } from '../utils/ruoyi';
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import config from 'config';

defineComponent(['Icon']);

const router = useRouter();
const route = useRoute();
const baseURL = config.baseURL;

const tempActivity = ref({});
const loading = ref(false);

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
}, { deep: true, immediate: true });

watch(() => props.serviceObject, (newValue) => {
  serviceObjects.value = newValue;
}, { deep: true, immediate: true });

watch(() => props.serviceLocation, (newValue) => {
  serviceLocations.value = newValue;
}, { deep: true, immediate: true });

const truncateDescription = (text, maxLength = 100) => {
  if (!text) {
    return '';
  }
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const handleSubmit = async () => {
  if (!getToken()) {
    router.push('/login');
    return;
  }

  loading.value = true;
  try {
    const res = await signUpActivity(tempActivity.value.activityId);
    if (res.code === 200) {
      ElMessage({
        message: '报名成功',
        type: 'success'
      });
      router.push('/home');
    } else {
      ElMessage({
        message: res.msg || '报名失败',
        type: 'error'
      });
    }
  } catch (error) {
    ElMessage({
      message: '报名失败',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const activityId = route.query.activityId;
    const res = await getActivityDetailById(activityId);
    if (res.code === 200) {
      tempActivity.value = res.data;
    } else {
      ElMessage({
        message: res.msg || '获取活动详情失败',
        type: 'error'
      });
    }
  } catch (error) {
    ElMessage({
      message: '获取活动详情失败',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.el-button--primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.el-button--primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>