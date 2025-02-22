<template>
  <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden" v-loading="loading" :element-loading-svg="svg">
      <!-- Activity Image/Header Section -->
      <div class="relative">
        <div v-if="tempActivity?.activityPictures && isImageValid" class="h-64 sm:h-96 overflow-hidden">
          <img
            :src="tempActivity.activityPictures"
            :alt="truncateDescription(tempActivity.activityName, 10)"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
        </div>
        <div v-else
             class="h-64 sm:h-96 flex items-center justify-center"
             :class="gradientClass">
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
              <div class="text-sm text-gray-500">{{ $t('page.activityDetail.recruitmentStatus') }}</div>
              <div class="text-lg font-semibold text-gray-900">
                {{ tempActivity.recruitedNumber }} / {{ tempActivity.recruitNumber }}
              </div>
            </div>
          </div>

          <!-- Activity Duration -->
          <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div class="p-2 bg-green-100 rounded-lg">
              <Icon icon="mdi:clock-outline" class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div class="text-sm text-gray-500">{{ $t('page.activityDetail.activityDuration') }}</div>
              <div class="text-lg font-semibold text-gray-900">
                {{ tempActivity.duration }} {{ $t('page.activityDetail.hours') }}
              </div>
            </div>
          </div>

          <!-- Activity Date -->
          <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg sm:col-span-2">
            <div class="p-2 bg-purple-100 rounded-lg">
              <Icon icon="mdi:calendar" class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div class="text-sm text-gray-500">{{ $t('page.activityDetail.activityDate') }}</div>
              <div class="text-lg font-semibold text-gray-900">
                {{ tempActivity.startTime }}
              </div>
            </div>
          </div>
        </div>

        <!-- Location Information -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('page.activityDetail.activityAddress') }}</h2>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <p class="text-gray-700 break-words">{{ tempActivity.address }}</p>
            <div class="mt-2 sm:mt-0 flex justify-start sm:justify-end">
              <el-button type="primary" size="small" class="w-auto" @click="copyText(tempActivity.address)">
                {{ $t('page.activityDetail.copyAddress') }}
              </el-button>
            </div>
          </div>
          <div class="mt-4">
            <el-button type="primary" size="small" @click="toggleMap">
              {{ showMap ? $t('page.activityDetail.hideMap') : $t('page.activityDetail.showMap') }}
            </el-button>
          </div>
          <transition name="fade">
            <div v-if="showMap" class="mt-4">
              <div v-if="mapUrl" class="w-full h-64 rounded-lg overflow-hidden">
                <iframe :src="mapUrl"
                        width="100%"
                        height="100%"
                        frameborder="0"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"></iframe>
              </div>
              <div v-else class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p class="text-gray-500">{{ $t('page.activityDetail.mapUnavailable') }}</p>
              </div>
            </div>
          </transition>
        </div>

        <!-- Organizer Information -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('page.activityDetail.organizerInfo') }}</h2>
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-start">
              <div class="flex items-center">
                <Icon icon="mdi:account" class="w-5 h-5 text-gray-400 mr-3" />
                <span class="text-sm text-gray-500 w-20">{{ $t('page.activityDetail.organizer') }}：</span>
                <span class="text-sm text-gray-900">{{ tempActivity?.dept?.leader }}</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center">
                <Icon icon="mdi:email" class="w-5 h-5 text-gray-400 mr-3" />
                <span class="text-sm text-gray-500 w-20">{{ $t('page.activityDetail.email') }}：</span>
                <span class="text-sm text-blue-600">{{ tempActivity?.dept?.email }}</span>
              </div>
              <div class="mt-2 sm:mt-0 flex justify-start sm:justify-end">
                <el-button type="primary" size="small" class="w-auto" @click="copyText(tempActivity?.dept?.email)">
                  {{ $t('page.activityDetail.copyEmail') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Details -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('page.activityDetail.activityDetails') }}</h2>
          <div class="bg-gray-50 rounded-lg p-6">
            <p class="text-gray-700 whitespace-pre-line">{{ tempActivity.details }}</p>
          </div>
        </div>

        <!-- Submit Button (Logged In) hover:scale-[1.02] -->
        <el-button
          v-if="getToken()"
          :loading="loading"
          type="primary"
          class="w-full py-5 px-4 text-base font-medium transition-all duration-300"
          @click.prevent="handleSubmit"
        >
          {{ loading ? $t('page.activityDetail.signingUp') : $t('page.activityDetail.signUpNow') }}
        </el-button>
        <!-- Submit Button (Not Logged In) -->
        <el-button
          v-else
          type="primary"
          class="w-full py-5 px-4 text-base font-medium transition-all duration-300"
          @click.prevent="router.push('/login')"
        >
          {{ $t('page.activityDetail.loginToSignUp') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted, defineComponent, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { signUpActivity, getActivityDetailById } from '../api/openness/openness';
import { getToken } from '../utils/auth';
import { copyCurrentUrl } from '../utils/ruoyi';
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import config from 'config';
import { getGradientColor } from '../utils/gradientColors';

defineComponent(['Icon']);

const router = useRouter();
const route = useRoute();
const baseURL = config.baseURL;

const tempActivity = ref({});
const loading = ref(false);
const showMap = ref(false);

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

const isImageValid = ref(true);

const handleImageError = () => {
  isImageValid.value = false;
};

const gradientClass = computed(() => {
  return getGradientColor(tempActivity.value);
});


// Google Map URL
// [Note] If you see this code
// Don't try this API Key, it's won't work in your environment, you need to use your own API Key, and it's free
// [Reference] https://developers.google.com/maps/documentation/embed/get-api-key
// [Google Web Console] https://console.cloud.google.com/google/maps-apis/
const mapUrl = computed(() => {
  if (tempActivity.value.address) {
    return `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(tempActivity.value.address)}`;
  }
  return null;
});

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
        message: $t('page.activityDetail.signUpSuccess'),
        type: 'success'
      });
      router.push('/home');
    } else {
      ElMessage({
        message: res.msg || $t('page.activityDetail.signUpFailed'),
        type: 'error'
      });
    }
  } catch (error) {
    ElMessage({
      message: $t('page.activityDetail.signUpFailed'),
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
};

const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage({
      message: $t('page.activityDetail.copySuccess'),
      type: 'success'
    });
  }, () => {
    ElMessage({
      message: $t('page.activityDetail.copyFailed'),
      type: 'error'
    });
  });
};

const toggleMap = () => {
  showMap.value = !showMap.value;
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
        message: res.msg || $t('page.activityDetail.fetchFailed'),
        type: 'error'
      });
    }
  } catch (error) {
    ElMessage({
      message: $t('page.activityDetail.fetchFailed'),
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* 添加容器响应式宽度控制 */
.container {
  max-width: 100%;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1440px;
  }
}

.el-button--primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.el-button--primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>