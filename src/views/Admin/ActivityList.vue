<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">
          活动
          <span class="block text-2xl font-medium text-blue-600 mt-1">管理中心</span>
        </h1>
        <router-link
          to="/admin/activities/create"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          <Icon icon="mdi:plus" class="h-5 w-5 mr-2" />
          发布新活动
        </router-link>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="activity in activities" :key="activity.id" class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 transition duration-300 ease-in-out hover:shadow-md">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ activity.title }}</h3>
                <p class="text-sm text-gray-500 mb-4">
                  <Icon icon="mdi:calendar" class="inline-block mr-1" />
                  {{ formatDate(activity.date) }}
                  <span class="mx-2">|</span>
                  <Icon icon="mdi:map-marker" class="inline-block mr-1" />
                  {{ activity.location }}
                </p>
                <div class="flex items-center justify-between">
                  <span :class="getStatusClass(activity.status)">{{ activity.status }}</span>
                  <div class="flex space-x-2">
                    <router-link :to="`/admin/activities/${activity.id}`" class="text-blue-600 hover:text-blue-800">
                      <Icon icon="mdi:eye" class="h-5 w-5" />
                    </router-link>
                    <router-link :to="`/admin/activities/${activity.id}/edit`" class="text-green-600 hover:text-green-800">
                      <Icon icon="mdi:pencil" class="h-5 w-5" />
                    </router-link>
                    <button @click="deleteActivity(activity.id)" class="text-red-600 hover:text-red-800">
                      <Icon icon="mdi:delete" class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useActivityStore } from '@/stores/activity'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'

const activityStore = useActivityStore()
const { activities } = storeToRefs(activityStore)

onMounted(async () => {
  await activityStore.fetchActivities()
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
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

const deleteActivity = async (id: number) => {
  if (confirm('确定要删除这个活动吗？')) {
    await activityStore.deleteActivity(id)
  }
}
</script>