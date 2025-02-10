<template>
  <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
    <!--  bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-8 rounded-2xl shadow-lg -->
    <div class="w-full max-w-full">
      <h1 class="text-3xl font-bold text-indigo-900 mb-8 text-center">
        志愿者活动记录
      </h1>

      <div v-if="!isLoggedIn" class="mb-2">
        <div class="mb-6 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="p-8">
            <div class="flex flex-col sm:flex-row items-center">
              <div class="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                <div class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:account-circle-outline" class="w-16 h-16 text-indigo-500" />
                </div>
              </div>
              <div class="text-center sm:text-left">
                <h2 class="text-2xl font-semibold text-indigo-900 mb-3">欢迎使用志愿者时长记录系统</h2>
                <p  v-hasLogin class="text-indigo-700 mb-6">登录或注册以开始记录您的志愿时间，享受更便捷的体验。</p>
                <button v-hasLogin
                        @click="$router.push('/login')"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  登录 / 注册
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 class="text-lg font-semibold text-blue-800 mb-4">免登录快速查询活动记录</h3>
        <el-form ref="searchForm" :model="searchQuery" :rules="loginRules" class="space-y-4">
          <el-form-item label="姓名" prop="username" label-position="top">
            <el-input
              v-model="searchQuery.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
            >
              <template #prefix>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email"  label-position="top">
            <el-input
              v-model="searchQuery.email"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="邮箱"
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
              @click.prevent="searchActivities"
            >
              <span v-if="!loading">查 询</span>
              <span v-else>查 询 中...</span>
            </el-button>
          </div>
        </el-form>
        <div class="mb-4">
          <h2 class="text-lg font-semibold text-blue-800 mb-2">活动统计</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              :class="['p-3 rounded-2xl', participatedActivitiesData&&participatedActivitiesData.accumulatedDuration&&participatedActivitiesData.accumulatedDuration >= 50 ? 'bg-green-100 border-4 border-green-400' : 'bg-red-100 border-4 border-red-400']">
              <p class="text-sm font-medium text-center mb-1">累积活动时长 <span
                class="text-xs text-gray-700">(小时)</span></p>
              <p
                :class="['text-2xl font-bold text-center', participatedActivitiesData&&participatedActivitiesData.accumulatedDuration&&participatedActivitiesData.accumulatedDuration >= 50 ? 'text-green-600' : 'text-red-600']">
                {{ participatedActivitiesData.accumulatedDuration??0 }}<span class="text-xl font-normal">/50</span>
              </p>
            </div>
            <div class="bg-blue-100 p-3 rounded-md border-4 border-blue-400">
              <p class="text-sm font-medium text-center mb-1">累积活动个数</p>
              <p class="text-2xl font-bold text-center text-blue-600">
                {{  participatedActivitiesData.partivipatedCount??0 }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mb-10">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-sky-400 rounded-2xl shadow-xl overflow-hidden">
          <div class="p-8">
            <div class="flex flex-col sm:flex-row items-center">
              <div class="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                <img :src="baseURL+participatedActivitiesData.avatar || 'https://i.pravatar.cc/100'"
                     alt="User Avatar"
                     class="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-md" />
              </div>
              <div class="text-center sm:text-left">
                <h2 class="text-2xl font-semibold text-indigo-900 mb-2">欢迎回来，{{ participatedActivitiesData.username }}</h2>
                <p class="text-indigo-700 mb-1">ID: {{ participatedActivitiesData.userId }}</p>
                <p class="text-indigo-700 mb-6">邮箱: {{ participatedActivitiesData.email }}</p>
                <button @click="logout"
                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl shadow-xl overflow-hidden mb-10">
        <h3 class="text-xl font-semibold text-indigo-900 mb-4">活动详情</h3>
        <div class="p-0">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col"
                      class="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    活动名称</th>
                  <th scope="col"
                      class="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    参与时间</th>
                  <th scope="col"
                      class="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    举办人</th>
                  <th scope="col"
                      class="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    活动时长</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 ml-2">
                <template v-if="participatedActivitiesData.activityInfo.length === 0">
                  <tr>
                    <td colspan="5" class="px-1 py-1 text-center text-sm text-gray-500">
                      暂无数据。请去添加申报数据或查看可选活动。
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr v-for="(activity,index) in participatedActivitiesData.activityInfo"
                      :key="index"
                      class="hover:bg-gray-50">
                    <td class="px-1 py-1 text-left whitespace-nowrap text-sm font-medium text-gray-900">{{
                      truncateDescription(activity.activityName,5) }}</td>
                    <td class="px-1 py-1 text-left whitespace-nowrap text-sm text-gray-500">{{
                      activity.signupDate }}</td>
                    <td class="px-1 py-1 text-left whitespace-nowrap text-sm text-gray-500">{{
                      truncateDescription(activity.leader,5) }}</td>
                    <td class="px-1 py-1 text-left swhitespace-nowrap text-sm text-gray-900">{{
                      activity.duration }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import Layout from '@/components/Layout.vue';
import { getToken } from '../utils/auth';
import {getParticipatedActivities,getParticipatedActivitiesByToken} from '../api/openness/openness';
import { ElMessage } from 'element-plus';
import config from 'config';
const isLoggedIn = getToken();
const loading = ref(false);
const baseURL = config.baseURL;
const searchQuery = ref({
  username:'',
  uid: '',
});
const participatedActivitiesData = ref({
  activityInfo:[]
});
const breadcrumbItems = [
  { label: '主页', path: '/' },
  { label: '查看统计', path: '/details' },
];
const currentPage = '查看统计';
const searchActivities = async () => {
  loading.value = true;
  getParticipatedActivities(searchQuery.value)
    .then(res => {
      let {data,code,msg} = res;
      if(code == 200) {
        if(data.userId == null) {
          ElMessage.warning('未获取到数据！');
        }
        if(data.activityInfo == null) {
          data.activityInfo = [];
        }
        participatedActivitiesData.value = data;
      }else{
        ElMessage.error(msg);
      }
      loading.value = false;
    }).catch(error => {
      loading.value = false;
    });
};
const initData = () => {
  loading.value = true;
  getParticipatedActivitiesByToken()
    .then((res) => {
      let {data,code,msg} = res;
      if(code == 200) {
        if(data.activityInfo == null) {
          data.activityInfo = [];
        }
        participatedActivitiesData.value = data;
      }else{
        ElMessage.error(msg);
      }
      loading.value = false;
    }).catch(error => {
      loading.value = false;
    });
};
const truncateDescription = (details, maxLength = 100) => {
  return details && details.length > maxLength
    ? details.substring(0, maxLength) + '...'
    : details;
};
onMounted(() => {
  if(isLoggedIn) {
    initData();
  }
});
</script>