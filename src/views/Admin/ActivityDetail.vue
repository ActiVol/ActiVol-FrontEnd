<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div v-if="activity" class="px-6 py-8">
        <div class="flex justify-between items-start mb-6">
          <h1 class="text-3xl font-bold text-gray-900">{{ activity.title }}</h1>
          <span :class="getStatusClass(getActivityStatus(activity))" class="px-2 py-1 text-sm font-medium rounded-full">
            {{ getActivityStatus(activity) }}
          </span>
        </div>
        
        <div class="mb-8">
          <img v-if="activity.posterUrl" :src="activity.posterUrl" class="w-full h-64 object-cover rounded-lg" alt="Activity poster" />
          <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <Icon icon="mdi:image-outline" class="h-16 w-16 text-gray-400" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">活动信息</h2>
            <p class="text-gray-600 mb-2">
              <Icon icon="mdi:map-marker" class="inline-block mr-2" />
              {{ activity.location }}
            </p>
            <p class="text-gray-600 mb-2">
              <Icon icon="mdi:account" class="inline-block mr-2" />
              举办者: {{ activity.organizer }}
            </p>
            <p class="text-gray-600 cursor-pointer hover:text-blue-600" @click="copyEmail">
              <Icon icon="mdi:email" class="inline-block mr-2" />
              {{ activity.organizerEmail }}
              <span class="ml-2 text-sm text-blue-600">(点击复制)</span>
            </p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">活动分类</h2>
            <div class="flex flex-wrap">
              <span v-for="category in activity.categories" :key="category" class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
                {{ category }}
              </span>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">活动时间</h2>
          <div v-for="(date, index) in activity.dates" :key="index" class="bg-gray-50 rounded-lg p-4 mb-4" :class="getDateStatusClass(date.date)">
            <p class="text-gray-800 font-medium">
              {{ formatDate(date.date) }}
            </p>
            <p class="text-gray-600">
              志愿者时长: {{ date.duration }} 小时
            </p>
            <p class="text-gray-600">
              需求人数: {{ date.unlimited ? '不限' : date.participants + ' 人' }}
            </p>
            <p class="text-gray-600">
              已报名人数: {{ date.registeredParticipants || 0 }} 人
            </p>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">活动详情</h2>
          <div class="prose max-w-none" v-html="activity.content"></div>
        </div>

        <div class="flex justify-end space-x-3">
          <router-link
            :to="`/admin/activities/${activity.id}/edit`"
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
import { useActivities } from '@/api/activities'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const { fetchActivity, deleteActivity: apiDeleteActivity } = useActivities()

interface Activity {
  id: number
  title: string
  dates: {
    date: string
    duration: number
    participants?: number
    unlimited: boolean
    registeredParticipants?: number
  }[]
  location: string
  categories: string[]
  posterUrl?: string
  organizer: string
  organizerEmail: string
  content: string
}

const activity = ref<Activity | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  const fetchedActivity = await fetchActivity(id)
  if (fetchedActivity) {
    fetchedActivity.dates = fetchedActivity.dates.map(date => ({
      ...date,
      unlimited: 'unlimited' in date ? Boolean(date.unlimited) : false,
      participants: date.participants ?? 0,
      registeredParticipants: 'registeredParticipants' in date ? date.registeredParticipants : 0
    }))
  }
  activity.value = fetchedActivity as Activity
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
}

const getActivityStatus = (activity: Activity) => {
  const now = new Date()
  const lastDate = new Date(activity.dates[activity.dates.length - 1].date)
  return now > lastDate ? '已结束' : '报名中'
}

const getStatusClass = (status: string) => {
  switch (status) {
    case '报名中':
      return 'bg-green-100 text-green-800'
    case '已结束':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getDateStatusClass = (date: string) => {
  const now = new Date()
  const activityDate = new Date(date)
  const oneDayBefore = new Date(activityDate.getTime() - 24 * 60 * 60 * 1000)

  if (now > activityDate) {
    return 'bg-red-50'
  } else if (now >= oneDayBefore) {
    return 'bg-yellow-50'
  } else {
    return 'bg-green-50'
  }
}

const deleteActivity = async () => {
  if (confirm('确定要删除这个活动吗？')) {
    await apiDeleteActivity(activity.value!.id)
    router.push('/admin/activities')
  }
}

const copyEmail = () => {
  if (activity.value) {
    navigator.clipboard.writeText(activity.value.organizerEmail)
      .then(() => {
        alert('邮箱已复制到剪贴板')
      })
      .catch(err => {
        console.error('无法复制邮箱: ', err)
      })
  }
}
</script>