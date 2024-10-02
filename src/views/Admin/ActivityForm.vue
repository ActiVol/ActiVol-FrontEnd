<template>
  <div class="px-6 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      {{ isEditing ? '编辑活动' : '发布新活动' }}
    </h1>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">标题</label>
        <input v-model="form.title" type="text" id="title"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="输入活动标题" required>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700">日期</label>
          <input v-model="form.date" type="date" id="date"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required>
        </div>
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700">地点</label>
          <input v-model="form.location" type="text" id="location"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="活动地点" required>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="duration" class="block text-sm font-medium text-gray-700">预计时长（小时）</label>
          <input v-model="form.duration" type="number" id="duration" min="0" step="0.5"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required>
        </div>
        <div>
          <label for="maxParticipants" class="block text-sm font-medium text-gray-700">最大参与人数</label>
          <input v-model="form.maxParticipants" type="number" id="maxParticipants" min="1"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required>
        </div>
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
        <select v-model="form.status" id="status"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          required>
          <option value="报名中">报名中</option>
          <option value="已结束">已结束</option>
        </select>
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">活动详情</label>
        <div class="border rounded-md shadow-sm">
          <quill-editor v-model:content="form.content" :options="editorOptions" @ready="onEditorReady" class="h-96" />
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button type="button" @click="$router.push('/admin/activities')"
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          取消
        </button>
        <button type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {{ isEditing ? '更新活动' : '发布活动' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActivityStore } from '@/stores/activity'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const route = useRoute()
const router = useRouter()
const activityStore = useActivityStore()

const isEditing = ref(false)
const form = ref<{
  title: string,
  date: string,
  location: string,
  duration: number,
  maxParticipants: number,
  status: '报名中' | '已结束' | undefined,
  content: string,
}>({
  title: '',
  date: '',
  location: '',
  duration: 0,
  maxParticipants: 0,
  status: '报名中',
  content: '',
})

const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ],
  },
}

const onEditorReady = (editor: any) => {
  console.log('Editor is ready', editor)
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    isEditing.value = true
    const activity = await activityStore.fetchActivity(Number(id))
    if (activity) {
      form.value = { ...activity }
    }
  }
})

const submitForm = async () => {
  try {
    if (isEditing.value) {
      await activityStore.updateActivity(Number(route.params.id), form.value)
    } else {
      await activityStore.createActivity(form.value)
    }
    router.push('/admin/activities')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>