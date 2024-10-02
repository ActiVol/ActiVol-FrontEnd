<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ activity?.title }}</h1>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">
              <Icon icon="mdi:calendar" class="h-5 w-5 inline-block mr-1" />
              {{ formatDate(activity?.date ?? '') }}
            </span>
            <span class="text-gray-600">
              <Icon icon="mdi:map-marker" class="h-5 w-5 inline-block mr-1" />
              {{ activity?.location }}
            </span>
          </div>
          <span :class="getStatusClass(activity?.status ?? '')">{{ activity?.status }}</span>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-2">活动时长</h3>
            <p class="text-gray-600">{{ activity?.duration }} 小时</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-2">最大参与人数</h3>
            <p class="text-gray-600">{{ activity?.maxParticipants }} 人</p>
          </div>
        </div>
        <div class="prose max-w-none mb-8" v-html="activity?.content"></div>
        <div class="flex justify-end space-x-3">
          <router-link
            :to="`/admin/activities/${activity?.id}/edit`"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            编辑活动
          </router-link>
          <button
            @click="deleteActivity"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            删除活动
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActivityStore } from '@/stores/activity'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const activityStore = useActivityStore()

const activity = ref<Activity | null>(null)

interface Activity {
  id: number;
  title: string;
  date: string;
  location: string;
  duration: number;
  maxParticipants: number;
  status: '报名中' | '已结束';
  content: string;
}

onMounted(async () => {
  const id = Number(route.params.id)
  activity.value = await activityStore.fetchActivity(id)
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

const deleteActivity = async () => {
  if (confirm('确定要删除这个活动吗？')) {
    await activityStore.deleteActivity(Number(route.params.id))
    router.push('/admin/activities')
  }
}
</script>