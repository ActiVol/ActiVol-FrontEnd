<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          活动管理
          <span class="block text-xl font-medium text-blue-600 mt-1">管理和发布志愿者活动</span>
        </h1>
        <div class="flex items-center space-x-4">
          <button @click="toggleView"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Icon :icon="isListView ? 'mdi:view-grid' : 'mdi:format-list-bulleted'" class="h-5 w-5 mr-2" />
            {{ isListView ? '切换到卡片视图' : '切换到列表视图' }}
          </button>
          <router-link to="/admin/activities/create"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Icon icon="mdi:plus" class="h-5 w-5 mr-2" />
            发布新活动
          </router-link>
        </div>
      </div>

      <!-- List View -->
      <div v-if="isListView" class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="activity in activities" :key="activity.id">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img v-if="activity.posterUrl" :src="activity.posterUrl" class="h-12 w-12 rounded-full object-cover"
                      alt="Activity poster" />
                    <div v-else class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon icon="mdi:image-outline" class="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{{ activity.activity_name }}</h3>
                    <div class="mt-1 text-sm text-gray-500">
                      <Icon icon="mdi:calendar" class="inline-block mr-1" />
                      {{ formatDate(activity.shift[0].date) }}
                      <span class="mx-2">|</span>
                      <Icon icon="mdi:map-marker" class="inline-block mr-1" />
                      {{ activity.activity_location }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <span :class="getStatusClass(getActivityStatus(activity))">
                    {{ getActivityStatus(activity) }}
                  </span>
                  <div class="flex space-x-2">
                    <router-link :to="`/admin/activities/${activity.id}`" class="text-blue-600 hover:text-blue-800">
                      <Icon icon="mdi:eye" class="h-5 w-5" />
                    </router-link>
                    <router-link :to="`/admin/activities/${activity.id}/edit`"
                      class="text-green-600 hover:text-green-800">
                      <Icon icon="mdi:pencil" class="h-5 w-5" />
                    </router-link>
                    <button @click="deleteActivityData(activity.id)" class="text-red-600 hover:text-red-800">
                      <Icon icon="mdi:delete" class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-2 text-sm text-gray-500">
                <Icon icon="mdi:account-group" class="inline-block mr-1" />
                参与人数: {{ getTotalParticipants(activity) }}
              </div>
              <div class="mt-2 text-sm text-gray-500">
                <Icon icon="mdi:tag-multiple" class="inline-block mr-1" />
                {{ Array.isArray(activity.categories) ? activity.categories.join(', ') : '无类别' }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Card View -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="activity in activities" :key="activity.id" class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ activity.activity_name }}</h3>
              <span :class="getStatusClass(getActivityStatus(activity))">
                {{ getActivityStatus(activity) }}
              </span>
            </div>
            <div class="mb-4">
              <img v-if="activity.posterUrl" :src="activity.posterUrl" class="w-full h-40 object-cover rounded-md"
                alt="Activity poster" />
              <div v-else class="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                <Icon icon="mdi:image-outline" class="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <p class="text-sm text-gray-500 mb-2">
              <Icon icon="mdi:calendar" class="inline-block mr-1" />
              {{ formatDate(activity.shift[0].date) }}
            </p>
            <p class="text-sm text-gray-500 mb-2">
              <Icon icon="mdi:map-marker" class="inline-block mr-1" />
              {{ activity.activity_location }}
            </p>
            <p class="text-sm text-gray-500 mb-2">
              <Icon icon="mdi:account-group" class="inline-block mr-1" />
              参与人数: {{ getTotalParticipants(activity) }}
            </p>
            <p class="text-sm text-gray-500 mb-4">
              <Icon icon="mdi:tag-multiple" class="inline-block mr-1" />
              {{ Array.isArray(activity.categories) ? activity.categories.join(', ') : '无类别' }}
            </p>
            <p class="text-sm text-gray-600 mb-4">{{ truncateContent(activity.activity_description) }}</p>
            <div class="flex justify-end space-x-2">
              <router-link :to="`/admin/activities/${activity.id}`" class="text-blue-600 hover:text-blue-800">
                <Icon icon="mdi:eye" class="h-5 w-5" />
              </router-link>
              <router-link :to="`/admin/activities/${activity.id}/edit`" class="text-green-600 hover:text-green-800">
                <Icon icon="mdi:pencil" class="h-5 w-5" />
              </router-link>
              <button @click="deleteActivityData(activity.id)" class="text-red-600 hover:text-red-800">
                <Icon icon="mdi:delete" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { fetchActivities, deleteActivity } from '@/api/api'

interface Activity {
  id: number;
  activity_name: string;
  posterUrl?: string;
  shift: { date: string; unlimited: boolean; participants: number }[];
  activity_location: string;
  categories: string[];
  activity_description: string;
}

const activities = ref<Activity[]>([])
const isListView = ref(true)

onMounted(async () => {
  await fetchActivitiesData()
})

const fetchActivitiesData = async () => {
  try {
    const response = await fetchActivities()
    activities.value = response.data
  } catch (error) {
    console.error('Error fetching activities:', error)
  }
}

const toggleView = () => {
  isListView.value = !isListView.value
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getActivityStatus = (activity: Activity) => {
  const now = new Date()
  const lastDate = new Date(activity.shift[activity.shift.length - 1].date)
  return now > lastDate ? '已结束' : '报名中'
}

const getStatusClass = (status: string) => {
  switch (status) {
    case '报名中':
      return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'
    case '已结束':
      return 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
    default:
      return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800'
  }
}

const getTotalParticipants = (activity: Activity) => {
  return activity.shift.reduce((total, date) => total + (date.unlimited ? Infinity : date.participants), 0)
}

const truncateContent = (content: string, maxLength: number = 100) => {
  const strippedContent = content.replace(/<[^>]+>/g, '')
  return strippedContent.length > maxLength ? strippedContent.slice(0, maxLength) + '...' : strippedContent
}

const deleteActivityData = async (id: number) => {
  const token = localStorage.getItem('token')
  if (token && confirm('确定要删除这个活动吗？')) {
    try {
      await deleteActivity(id, token)
      activities.value = activities.value.filter(activity => activity.id !== id)
    } catch (error) {
      console.error(`Error deleting activity ${id}:`, error)
    }
  }
}
</script>