<template>
  <div class="container mx-auto px-4 py-8 bg-gray-50">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">活动管理</h1>

    <!-- 可折叠搜索栏 -->
    <div
      class="mb-8 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div
        class="p-4 bg-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors duration-200"
        @click="toggleSearch"
      >
        <h2 class="text-lg font-semibold text-gray-700">搜索筛选</h2>
        <Icon
          :icon="searchExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          class="text-gray-600"
        />
      </div>
      <div v-show="searchExpanded" class="p-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label
              for="activityName"
              class="block text-sm font-medium text-gray-700"
              >活动名称</label
            >
            <input
              id="activityName"
              v-model="searchParams.activityName"
              type="text"
              placeholder="输入活动名称"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="space-y-2">
            <label
              for="organizer"
              class="block text-sm font-medium text-gray-700"
              >组织者</label
            >
            <input
              id="organizer"
              v-model="searchParams.organizer"
              type="text"
              placeholder="输入组织者"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="space-y-2">
            <label for="status" class="block text-sm font-medium text-gray-700"
              >状态</label
            >
            <select
              id="status"
              v-model="searchParams.status"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有状态</option>
              <option value="approved">已批准</option>
              <option value="pending">待审核</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div class="space-y-2">
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700"
              >开始日期</label
            >
            <input
              id="startDate"
              v-model="searchParams.startDate"
              type="date"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="space-y-2">
            <label for="endDate" class="block text-sm font-medium text-gray-700"
              >结束日期</label
            >
            <input
              id="endDate"
              v-model="searchParams.endDate"
              type="date"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="resetSearch"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            重置
          </button>
          <button
            @click="search"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            搜索
          </button>
        </div>
      </div>
    </div>

    <!-- 表格操作栏 -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div class="flex flex-wrap justify-between items-center">
        <div class="space-x-2 mb-2 sm:mb-0 flex flex-wrap">
          <button
            @click="showAddModal = true"
            class="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center mb-2 sm:mb-0"
          >
            <Icon icon="mdi:plus" class="mr-1" /> 新增
          </button>
          <button
            @click="batchDelete"
            class="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200 flex items-center mb-2 sm:mb-0"
          >
            <Icon icon="mdi:delete" class="mr-1" /> 批量删除
          </button>
          <button
            @click="fetchActivities"
            class="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200 flex items-center mb-2 sm:mb-0"
          >
            <Icon
              :icon="isLoading ? 'mdi:loading' : 'mdi:refresh'"
              class="mr-1"
              :class="{ 'animate-spin': isLoading }"
            />
            刷新
          </button>
        </div>
        <div class="relative" ref="columnSettingsRef">
          <button
            @click="toggleColumnSettings"
            class="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center"
          >
            <Icon icon="mdi:cog" class="mr-1" /> 列设置
          </button>
          <div
            v-show="showColumnSettings"
            :class="columnSettingsPosition"
            class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-60 overflow-y-auto"
          >
            <div class="py-1">
              <label
                v-for="col in columns"
                :key="col.key"
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="visibleColumns"
                  :value="col.key"
                  class="mr-2 form-checkbox h-5 w-5 text-blue-600"
                />
                <span class="text-gray-700">{{ col.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 活动列表 -->
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div class="overflow-x-auto">
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="p-3 text-left">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="form-checkbox h-5 w-5 text-blue-600"
                />
              </th>
              <th
                v-for="col in visibleColumns"
                :key="col"
                class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ getColumnLabel(col) }}
              </th>
              <th
                class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="activity in activities" :key="activity.id">
              <tr
                :class="{
                  'bg-blue-50': selectedActivities.includes(activity.id),
                  'hover:bg-gray-50': !selectedActivities.includes(activity.id),
                }"
                @click="toggleRowSelection(activity.id)"
              >
                <td class="p-3">
                  <input
                    type="checkbox"
                    :checked="selectedActivities.includes(activity.id)"
                    @click.stop
                    @change="toggleRowSelection(activity.id)"
                    class="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
                <td
                  v-for="col in visibleColumns"
                  :key="col"
                  class="p-3 whitespace-nowrap"
                >
                  <template v-if="col === 'status'">
                    <span :class="getStatusClass(activity.status)">
                      {{ getStatusText(activity.status) }}
                    </span>
                  </template>
                  <template v-else-if="col === 'activity_date'">
                    {{ formatDate(activity[col]) }}
                  </template>
                  <template v-else>
                    {{ activity[col as keyof Activity] }}
                  </template>
                </td>
                <td class="p-3 whitespace-nowrap text-sm font-medium">
                  <button
                    @click.stop="toggleRowExpansion(activity.id)"
                    class="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <Icon
                      :icon="
                        expandedRows.includes(activity.id)
                          ? 'mdi:chevron-up'
                          : 'mdi:chevron-down'
                      "
                      class="mt-1 w-5 h-5"
                    />
                  </button>
                  <button
                    @click.stop="editActivity(activity)"
                    class="text-green-600 hover:text-green-900 mr-2"
                  >
                    <Icon icon="mdi:pencil" class="mt-1 w-5 h-5" />
                  </button>
                  <button
                    @click.stop="deleteActivity(activity.id)"
                    class="text-red-600 hover:text-red-900 mr-2"
                  >
                    <Icon icon="mdi:delete" class="mt-1 w-5 h-5" />
                  </button>
                  <button
                    @click.stop="openReviewModal(activity)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    <Icon icon="mdi:clipboard-check" class="mt-1 w-5 h-5" />
                  </button>
                </td>
              </tr>
              <tr v-if="expandedRows.includes(activity.id)">
                <td colspan="100%" class="p-3">
                  <div :class="getDetailBackgroundClass(activity.status)">
                    <div
                      class="p-4 grid grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      <div>
                        <h4 class="font-semibold text-gray-700">描述</h4>
                        <p class="text-gray-600">
                          {{ activity.activity_description || "无描述" }}
                        </p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">组织者</h4>
                        <p class="text-gray-600">
                          {{ activity.organizer_name }}
                        </p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">组织者邮箱</h4>
                        <p class="text-gray-600">
                          {{ activity.organizer_email || "无" }}
                        </p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">UID</h4>
                        <p class="text-gray-600">{{ activity.uid }}</p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">地点</h4>
                        <p class="text-gray-600">
                          {{ activity.activity_location }}
                        </p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">创建时间</h4>
                        <p class="text-gray-600">
                          {{ formatDate(activity.created_at) }}
                        </p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">更新时间</h4>
                        <p class="text-gray-600">
                          {{ formatDate(activity.update_at) }}
                        </p>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-700">管理员评论</h4>
                        <p class="text-gray-600">
                          {{ activity.admin_comment || "无" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页控件 -->
    <div
      class="mt-6 flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200"
    >
      <select
        v-model="itemsPerPage"
        @change="updatePagination"
        class="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option :value="10">10条/页</option>
        <option :value="20">20条/页</option>
        <option :value="50">50条/页</option>
      </select>
      <div class="space-x-2 mt-2 sm:mt-0">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 rounded-md',
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- 添加/编辑活动模态框 -->
    <Modal v-if="showAddModal" @close="showAddModal = false">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        {{ editingActivity ? "编辑活动" : "添加新活动" }}
      </h2>
      <form @submit.prevent="submitActivity" class="space-y-4">
        <div>
          <label
            for="activity_name"
            class="block text-sm font-medium text-gray-700"
            >活动名称 <span class="text-red-500">*</span></label
          >
          <input
            id="activity_name"
            v-model="currentActivity.activity_name"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="activity_location"
            class="block text-sm font-medium text-gray-700"
            >活动地点 <span class="text-red-500">*</span></label
          >
          <input
            id="activity_location"
            v-model="currentActivity.activity_location"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="activity_date"
            class="block text-sm font-medium text-gray-700"
            >日期 <span class="text-red-500">*</span></label
          >
          <input
            id="activity_date"
            v-model="currentActivity.activity_date"
            type="datetime-local"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="hours" class="block text-sm font-medium text-gray-700"
            >时长（小时） <span class="text-red-500">*</span></label
          >
          <input
            id="hours"
            v-model="currentActivity.hours"
            type="number"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="organizer_name"
            class="block text-sm font-medium text-gray-700"
            >组织者 <span class="text-red-500">*</span></label
          >
          <input
            id="organizer_name"
            v-model="currentActivity.organizer_name"
            type="text"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="organizer_email"
            class="block text-sm font-medium text-gray-700"
            >组织者邮箱</label
          >
          <input
            id="organizer_email"
            v-model="currentActivity.organizer_email"
            type="email"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="activity_description"
            class="block text-sm font-medium text-gray-700"
            >描述</label
          >
          <textarea
            id="activity_description"
            v-model="currentActivity.activity_description"
            rows="3"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="showAddModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ editingActivity ? "保存修改" : "添加活动" }}
          </button>
        </div>
      </form>
    </Modal>

    <!-- 审核模态框 -->
    <Modal v-if="showReviewModal" @close="closeReviewModal">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">审核活动</h2>
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label
            for="activity_name"
            class="block text-sm font-medium text-gray-700"
            >活动名称</label
          >
          <input
            id="activity_name"
            v-model="currentActivity.activity_name"
            type="text"
            readonly
            class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            for="review_status"
            class="block text-sm font-medium text-gray-700"
            >审核状态</label
          >
          <select
            id="review_status"
            v-model="currentActivity.status"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="approved">批准</option>
            <option value="pending">待审核</option>
            <option value="rejected">拒绝</option>
          </select>
        </div>
        <div>
          <label
            for="admin_comment"
            class="block text-sm font-medium text-gray-700"
            >审核意见</label
          >
          <div
            v-if="currentActivity.admin_comment && !isEditingComment"
            class="mt-1 p-2 bg-gray-100 border border-gray-300 rounded-md"
          >
            {{ currentActivity.admin_comment }}
            <button
              @click="isEditingComment = true"
              class="ml-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              修改
            </button>
          </div>
          <textarea
            v-else
            id="admin_comment"
            v-model="currentActivity.admin_comment"
            rows="3"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeReviewModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            提交审核
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import { debounce } from "lodash";
import Modal from "@/components/Admin/Modal.vue";

interface Activity {
  id: number;
  uid: string;
  activity_name: string;
  activity_location: string;
  activity_date: string;
  activity_description: string | null;
  hours: number;
  organizer_name: string;
  organizer_email: string | null;
  status: string;
  admin_comment: string | null;
  is_deleted: number;
  created_at: string | null;
  update_at: string | null;
}

const activities = ref<Activity[]>([]);
const searchParams = ref({
  activityName: "",
  organizer: "",
  status: "",
  startDate: "",
  endDate: "",
});
const currentPage = ref(1);
const itemsPerPage = ref(10);
const expandedRows = ref<number[]>([]);
const columns = [
  { key: "activity_name", label: "活动名称" },
  { key: "activity_date", label: "日期" },
  { key: "uid", label: "UID" },
  { key: "hours", label: "时长" },
  { key: "organizer_name", label: "组织者" },
  { key: "status", label: "状态" },
];
const visibleColumns = ref([
  "activity_name",
  "activity_date",
  "hours",
  "uid",
  "status",
  // "organizer_name",
]);
const searchExpanded = ref(false);
const showColumnSettings = ref(false);
const columnSettingsRef = ref<HTMLElement | null>(null);
const showAddModal = ref(false);
const showReviewModal = ref(false);
const editingActivity = ref<Activity | null>(null);
const currentActivity = ref<Partial<Activity>>({});
const selectedActivities = ref<number[]>([]);
const selectAll = ref(false);
const isLoading = ref(false);
const isEditingComment = ref(false);
const columnSettingsPosition = ref("right-0");

const totalPages = computed(() =>
  Math.ceil(activities.value.length / itemsPerPage.value)
);
const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const fetchActivities = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/activities', {
      params: { ...searchParams.value, page: currentPage.value, limit: itemsPerPage.value },
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    const newActivities = response.data.filter((activity: Activity) => activity.is_deleted !== 1)
    
    // Implement a small delay strategy
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const startTime = Date.now()
    await delay(800) // Minimum delay of 0.8 seconds
    const elapsedTime = Date.now() - startTime
    if (elapsedTime < 800) {
      await delay(800 - elapsedTime)
    }

    // Sort activities by status and date
    activities.value = sortActivities(newActivities);
  } catch (error) {
    console.error('Error fetching activities:', error)
  } finally {
    isLoading.value = false
  }
}

const sortActivities = (activities: Activity[]) => {
  return activities.sort((a, b) => {
    if (a.status === 'pending' && b.status === 'pending') {
      return new Date(a.activity_date).getTime() - new Date(b.activity_date).getTime();
    }
    if (a.status === 'approved' && b.status === 'approved') {
      return new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime();
    }
    if (a.status === 'pending' && b.status === 'approved') {
      return new Date(a.activity_date).getTime() - new Date(b.activity_date).getTime() < 0 ? -1 : 1;
    }
    if (a.status === 'approved' && b.status === 'pending') {
      return new Date(a.activity_date).getTime() - new Date(b.activity_date).getTime() > 0 ? -1 : 1;
    }
    return 0;
  });
};

const toggleSearch = () => {
  searchExpanded.value = !searchExpanded.value;
};

const resetSearch = () => {
  searchParams.value = {
    activityName: "",
    organizer: "",
    status: "",
    startDate: "",
    endDate: "",
  };
};

const search = debounce(() => {
  currentPage.value = 1;
  fetchActivities();
}, 300);

const toggleColumnSettings = () => {
  showColumnSettings.value = !showColumnSettings.value;
  nextTick(() => {
    if (showColumnSettings.value) {
      const rect = columnSettingsRef.value?.getBoundingClientRect();
      if (rect) {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) {
          columnSettingsPosition.value = "left-0";
        } else {
          columnSettingsPosition.value = "right-0";
        }
      }
    }
  });
};

const updatePagination = () => {
  currentPage.value = 1;
  fetchActivities();
};

const toggleRowExpansion = (id: number) => {
  const index = expandedRows.value.indexOf(id);
  if (index === -1) {
    expandedRows.value.push(id);
  } else {
    expandedRows.value.splice(index, 1);
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "未知";
  const date = new Date(dateString);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "approved":
      return "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800";
    case "pending":
      return "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800";
    case "rejected":
      return "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800";
    default:
      return "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800";
  }
};

const getDetailBackgroundClass = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-50 rounded-lg";
    case "pending":
      return "bg-yellow-50 rounded-lg";
    case "rejected":
      return "bg-red-50 rounded-lg";
    default:
      return "bg-gray-50 rounded-lg";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "已批准";
    case "pending":
      return "待审核";
    case "rejected":
      return "已拒绝";
    default:
      return "未知状态";
  }
};

const getColumnLabel = (key: string) => {
  const column = columns.find((col) => col.key === key);
  return column ? column.label : key;
};

const editActivity = (activity: Activity) => {
  editingActivity.value = activity;
  currentActivity.value = { ...activity };
  showAddModal.value = true;
};

const submitActivity = async () => {
  try {
    if (editingActivity.value) {
      await axios.put(
        `https://test-api-v.us.kjchmc.cn/api/auth/activities/update`,
        currentActivity.value,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } else {
      await axios.post(
        `https://test-api-v.us.kjchmc.cn/api/auth/activities/add`,
        currentActivity.value,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    }
    await fetchActivities();
    showAddModal.value = false;
    editingActivity.value = null;
    currentActivity.value = {};
  } catch (error) {
    console.error("Error submitting activity:", error);
  }
};

const deleteActivity = async (id: number) => {
  if (confirm("确定要删除这个活动吗？")) {
    try {
      await axios.delete(
        `https://test-api-v.us.kjchmc.cn/api/auth/activities/delete`,
        {
          data: { id },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  }
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedActivities.value = activities.value.map((activity) => activity.id);
  } else {
    selectedActivities.value = [];
  }
};

const toggleRowSelection = (id: number) => {
  const index = selectedActivities.value.indexOf(id);
  if (index === -1) {
    selectedActivities.value.push(id);
  } else {
    selectedActivities.value.splice(index, 1);
  }
  selectAll.value = selectedActivities.value.length === activities.value.length;
};

const batchDelete = async () => {
  if (selectedActivities.value.length === 0) {
    alert("请选择要删除的活动");
    return;
  }
  if (
    confirm(`确定要删除选中的 ${selectedActivities.value.length} 个活动吗？`)
  ) {
    try {
      await axios.delete(
        `https://test-api-v.us.kjchmc.cn/api/auth/activities/batch-delete`,
        {
          data: { ids: selectedActivities.value },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await fetchActivities();
      selectedActivities.value = [];
      selectAll.value = false;
    } catch (error) {
      console.error("Error batch deleting activities:", error);
    }
  }
};

const openReviewModal = (activity: Activity) => {
  currentActivity.value = { ...activity };
  showReviewModal.value = true;
  isEditingComment.value = !activity.admin_comment;
};

const closeReviewModal = () => {
  showReviewModal.value = false;
  currentActivity.value = {};
  isEditingComment.value = false;
};

const submitReview = async () => {
  try {
    await axios.put(
      "https://test-api-v.us.kjchmc.cn/api/auth/activities/review",
      {
        id: currentActivity.value.id,
        status: currentActivity.value.status,
        admin_comment: currentActivity.value.admin_comment,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    await fetchActivities();
    closeReviewModal();
  } catch (error) {
    console.error("Error submitting review:", error);
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    columnSettingsRef.value &&
    !columnSettingsRef.value.contains(event.target as Node)
  ) {
    showColumnSettings.value = false;
  }
};

onMounted(() => {
  fetchActivities();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
