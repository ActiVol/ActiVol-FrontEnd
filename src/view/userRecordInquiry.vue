<template>
  <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
    <div class="w-full max-w-full space-y-6">
      <!-- Login Reminder Message (Not Logged In) -->
      <div v-if="!isLoggedIn" class="rounded-md bg-blue-50 p-4 border border-blue-200">
        <div class="flex">
          <div class="flex-shrink-0">
            <Icon icon="mdi:information-outline" class="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-bold text-blue-800">{{ $t('component.loginReminder.title') }}</h3>
            <span class="text-sm text-blue-600">
              {{ $t('component.loginReminder.content') }}
            </span>
            <!-- <div class="mt-2 text-sm text-blue-700">
              <ul role="list" class="list-disc space-y-1 pl-5">
                <li>登录后可以查看您的活动详情</li>
                <li>获取个性化的用户体验</li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(stat, index) in stats"
             :key="index"
             class="bg-white rounded-lg shadow-sm overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md"
             :class="stat.borderColor">
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-gray-700">{{ $t(stat.title) }}</h3>
              <Icon :icon="stat.icon" :class="['w-5 h-5', stat.iconColor]" />
            </div>
            <div class="flex items-end space-x-1">
              <span :class="['text-2xl font-bold', stat.valueColor]">
                {{ stat.value }}
              </span>
              <span v-if="stat.suffix" class="text-gray-500 text-sm mb-0.5">{{ stat.suffix }}</span>
            </div>
            <div v-if="stat.progress !== undefined" class="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div class="h-1.5 rounded-full transition-all duration-500"
                   :class="stat.progressColor"
                   :style="{ width: `${Math.min(stat.progress, 100)}%` }">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Search Form (Not Logged In) -->
      <div v-if="!isLoggedIn" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('page.userRecordInquiry.search.title') }}</h3>
          <el-form ref="searchFormRef" :model="searchQuery" :rules="rules" @submit.prevent="searchActivities">
            <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <el-form-item :label="$t('page.userRecordInquiry.search.firstName')" prop="firstName" label-position="top">
                <el-input
                  v-model="searchQuery.firstName"
                  :placeholder="$t('page.userRecordInquiry.search.firstNamePlaceholder')"
                >
                  <template #prefix>
                    <Icon icon="lucide:user" class="w-4 h-4 text-gray-400" />
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item :label="$t('page.userRecordInquiry.search.middleName')" prop="middleName" label-position="top">
                <el-input
                  v-model="searchQuery.middleName"
                  :placeholder="$t('page.userRecordInquiry.search.middleNamePlaceholder')"
                >
                  <template #prefix>
                    <Icon icon="lucide:user" class="w-4 h-4 text-gray-400" />
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item :label="$t('page.userRecordInquiry.search.lastName')" prop="lastName" label-position="top">
                <el-input
                  v-model="searchQuery.lastName"
                  :placeholder="$t('page.userRecordInquiry.search.lastNamePlaceholder')"
                >
                  <template #prefix>
                    <Icon icon="lucide:user" class="w-4 h-4 text-gray-400" />
                  </template>
                </el-input>
              </el-form-item>
            </div> -->

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <el-form-item :label="$t('page.userRecordInquiry.search.username')" prop="username" label-position="top">
                <el-input
                  v-model="searchQuery.username"
                  :placeholder="$t('page.userRecordInquiry.search.usernamePlaceholder')"
                >
                  <template #prefix>
                    <Icon icon="lucide:user" class="w-4 h-4 text-gray-400" />
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item :label="$t('page.userRecordInquiry.search.email')" prop="email" label-position="top">
                <el-input
                  v-model="searchQuery.email"
                  :placeholder="$t('page.userRecordInquiry.search.emailPlaceholder')"
                >
                  <template #prefix>
                    <Icon icon="lucide:mail" class="w-4 h-4 text-gray-400" />
                  </template>
                </el-input>
              </el-form-item>
            </div>

            <el-button
              native-type="submit"
              :loading="loading"
              type="primary"
              class="w-full md:w-auto px-6 py-2 text-sm font-medium mt-4"
            >
              {{ loading ? $t('page.userRecordInquiry.search.searching') : $t('page.userRecordInquiry.search.search') }}
            </el-button>
          </el-form>
        </div>
      </div>

      <!-- User Profile (Logged In) -->
      <!-- <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <img
              :src="baseURL + participatedActivitiesData.avatar || '/placeholder.svg?height=80&width=80'"
              alt="User Avatar"
              class="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <div class="flex-1 text-center sm:text-left">
              <h2 class="text-xl font-semibold text-gray-900 mb-1">
                {{ $t('page.userRecordInquiry.profile.welcome', { name: participatedActivitiesData.username }) }}
              </h2>
              <p class="text-sm text-gray-600 mb-1">ID: {{ participatedActivitiesData.userId }}</p>
              <p class="text-sm text-gray-600">{{ participatedActivitiesData.email }}</p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Activity Details Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('page.userRecordInquiry.activities.title') }}</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th v-for="header in tableHeaders"
                      :key="header.key"
                      class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t(`page.userRecordInquiry.activities.${header.key}`) }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="participatedActivitiesData.activityInfo?.length">
                  <tr v-for="(activity, index) in participatedActivitiesData.activityInfo"
                      :key="index"
                      class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {{ truncateDescription(activity.activityName, 20) }}
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ activity.signupDate }}
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ truncateDescription(activity.leader, 10) }}
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {{ activity.duration }}h
                    </td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="4" class="px-4 py-2 text-center text-sm text-gray-500">
                    {{ $t('page.userRecordInquiry.activities.noData') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import Layout from '@/components/Layout.vue';
import { getToken } from '@/utils/auth';
import { getParticipatedActivities, getParticipatedActivitiesByToken } from '@/api/openness/openness';
import { ElMessage } from 'element-plus';
import config from 'config';

const { t } = useI18n();
const baseURL = config.baseURL;
const isLoggedIn = getToken();
const loading = ref(false);
const searchQuery = ref({
  // firstName: '',
  // middleName: '',
  // lastName: '',
  username: '',
  email: '', // Internal & External Email 任选一项均可进行查询
});

const searchFormRef = ref(null);

const participatedActivitiesData = ref({
  activityInfo: [],
  accumulatedDuration: 0,
  partivipatedCount: 0,
});

const breadcrumbItems = [
  { label: t('breadCrumb.home'), path: '/' },
  { label: t('breadCrumb.userRecordInquiry'), path: '/self-inquiry' },
];

const currentPage = t('breadCrumb.userRecordInquiry');

const tableHeaders = [
  { key: 'name' },
  { key: 'date' },
  { key: 'organizer' },
  { key: 'duration' },
];

const rules = {
  firstName: [
    { required: true, message: t('page.userRecordInquiry.validation.firstNameRequired'), trigger: 'blur' },
    { min: 2, message: t('page.userRecordInquiry.validation.nameLength'), trigger: 'blur' },
  ],
  middleName: [
    { min: 1, message: t('page.userRecordInquiry.validation.nameLength'), trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: t('page.userRecordInquiry.validation.lastNameRequired'), trigger: 'blur' },
    { min: 2, message: t('page.userRecordInquiry.validation.nameLength'), trigger: 'blur' },
  ],
  username: [
    { required: true, message: t('page.userRecordInquiry.validation.usernameRequired'), trigger: 'blur' },
    { min: 2, message: t('page.userRecordInquiry.validation.usernameLength'), trigger: 'blur' },
  ],
  email: [
    { required: true, message: t('page.userRecordInquiry.validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('page.userRecordInquiry.validation.emailFormat'), trigger: 'blur' },
  ],
};

const stats = computed(() => {
  const accumulatedDuration = participatedActivitiesData.value.accumulatedDuration || 0;
  const isCompleted = accumulatedDuration >= 50;
  return [
    {
      title: 'page.userRecordInquiry.stats.totalHours',
      value: accumulatedDuration,
      suffix: '/50h',
      icon: 'lucide:clock',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-500',
      valueColor: isCompleted ? 'text-green-600' : 'text-red-600',
      progress: accumulatedDuration * 2,
      progressColor: isCompleted ? 'bg-green-500' : 'bg-red-500',
    },
    {
      title: 'page.userRecordInquiry.stats.totalActivities',
      value: participatedActivitiesData.value.partivipatedCount || 0,
      suffix: t('page.userRecordInquiry.stats.activities'),
      icon: 'lucide:calendar',
      borderColor: 'border-green-500',
      iconColor: 'text-green-500',
      valueColor: 'text-green-600',
    },
    {
      title: 'page.userRecordInquiry.stats.status',
      value: isCompleted ? t('page.userRecordInquiry.stats.completed') : t('page.userRecordInquiry.stats.inProgress'),
      icon: 'lucide:award',
      borderColor: isCompleted ? 'border-green-500' : 'border-yellow-500',
      iconColor: isCompleted ? 'text-green-500' : 'text-yellow-500',
      valueColor: isCompleted ? 'text-green-600' : 'text-yellow-600',
    },
  ];
});

const searchActivities = async () => {
  if (!searchFormRef.value) {
    return;
  }

  try {
    await searchFormRef.value.validate();
  } catch (error) {
    console.error('Form validation failed:', error);
    return;
  }

  loading.value = true;
  try {
    const res = await getParticipatedActivities(searchQuery.value);
    if (res.code === 200) {
      if (!res.data.userId) {
        ElMessage.warning(t('page.userRecordInquiry.messages.noData'));
      } else {
        participatedActivitiesData.value = {
          ...res.data,
          activityInfo: res.data.activityInfo || [],
        };
      }
    } else {
      ElMessage.error(res.msg || t('page.userRecordInquiry.messages.error'));
    }
  } catch (error) {
    console.error('Search activities error:', error);
    ElMessage.error(t('page.userRecordInquiry.messages.error'));
  } finally {
    loading.value = false;
  }
};

const initData = async () => {
  loading.value = true;
  try {
    const res = await getParticipatedActivitiesByToken();
    if (res.code === 200) {
      participatedActivitiesData.value = {
        ...res.data,
        activityInfo: res.data.activityInfo || [],
      };
    } else {
      ElMessage.error(t('page.userRecordInquiry.messages.error'));
    }
  } catch (error) {
    ElMessage.error(t('page.userRecordInquiry.messages.error'));
  } finally {
    loading.value = false;
  }
};

const truncateDescription = (text, maxLength = 100) => {
  return text?.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

if (isLoggedIn) {
  initData();
}
</script>