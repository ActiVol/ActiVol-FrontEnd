<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">
          {{ isEditing ? '编辑活动' : '发布新活动' }}
        </h1>
        <form @submit.prevent="submitForm" class="space-y-8">
          <!-- 基本信息 -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">基本信息</h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                  活动名称 <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input v-model="form.activity_name" type="text" id="title"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="输入活动名称" required :disabled="isEditing && !editingFields.title">
                  <button v-if="isEditing" type="button" @click="toggleEdit('title')"
                    class="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    {{ editingFields.title ? '完成' : '修改' }}
                  </button>
                </div>
              </div>
              <div>
                <label for="location" class="block text-sm font-medium text-gray-700 mb-1">
                  活动地点 <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input v-model="form.activity_location" type="text" id="location"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="输入活动地点" required :disabled="isEditing && !editingFields.location">
                  <button v-if="isEditing" type="button" @click="toggleEdit('location')"
                    class="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    {{ editingFields.location ? '完成' : '修改' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 活动时间 -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">活动时间</h2>
            <div v-for="(date, index) in form.shift" :key="index" class="mb-4 p-4 bg-white rounded-md shadow-sm">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 items-end">
                <div>
                  <label :for="`date-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                    日期和时间 <span class="text-red-500">*</span>
                  </label>
                  <input v-model="date.date" type="datetime-local" :id="`date-${index}`"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                </div>
                <div>
                  <label :for="`duration-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                    志愿者时长（小时） <span class="text-red-500">*</span>
                  </label>
                  <input v-model="date.duration" type="number" :id="`duration-${index}`" min="0" step="0.5"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                </div>
                <div>
                  <label :for="`participants-${index}`" class="block text-sm font-medium text-gray-700 mb-1">
                    需求人数
                  </label>
                  <div class="relative">
                    <input v-model="date.participants" type="number" :id="`participants-${index}`" min="0"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      :disabled="date.unlimited" placeholder="输入人数">
                    <div class="absolute inset-y-0 right-0 flex items-center">
                      <label :for="`unlimited-${index}`" class="mr-2 text-sm text-gray-500">无限制</label>
                      <input v-model="date.unlimited" type="checkbox" :id="`unlimited-${index}`"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        @change="handleUnlimitedChange(index)">
                    </div>
                  </div>
                </div>
              </div>
              <button v-if="index > 0" type="button" @click="removeDate(index)"
                class="mt-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Icon icon="mdi:close" class="h-4 w-4 mr-1" />
                删除此时间段
              </button>
            </div>
            <button type="button" @click="addDate"
              class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Icon icon="mdi:plus" class="h-5 w-5 mr-2" />
              添加更多时间
            </button>
          </div>

          <!-- 活动分类 -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">活动分类</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <label v-for="category in availableCategories" :key="category" class="inline-flex items-center">
                <input type="checkbox" :checked="form.categories.includes(category)" @change="toggleCategory(category)"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <span class="ml-2 text-sm text-gray-700">{{ category }}</span>
              </label>
            </div>
          </div>

          <!-- 宣传海报 -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">宣传海报</h2>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                  aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="poster-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>上传海报</span>
                    <input id="poster-upload" name="poster-upload" type="file" class="sr-only"
                      @change="handlePosterUpload">
                  </label>
                  <p class="pl-1">或拖放图片至此处</p>
                </div>
                <p class="text-xs text-gray-500">
                  PNG, JPG, GIF 格式，最大 10MB
                </p>
              </div>
            </div>
            <img v-if="form.posterUrl" :src="form.posterUrl" alt="Activity Poster"
              class="mt-4 max-w-xs rounded-lg shadow-md">
          </div>

          <!-- 活动详情 -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">活动详情</h2>
            <div class="border rounded-md shadow-sm">
              <quill-editor v-model="form.activity_description" :options="editorOptions" @text-change="autoSave"
                class="h-64" />
            </div>
          </div>

          <!-- 举办者信息 -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">举办者信息</h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="organizer" class="block text-sm font-medium text-gray-700 mb-1">
                  姓名 <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input v-model="form.organizer_name" type="text" id="organizer"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="输入举办者姓名" required :disabled="isEditing && !editingFields.organizer">
                  <button v-if="isEditing" type="button" @click="toggleEdit('organizer')"
                    class="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    {{ editingFields.organizer ? '完成' : '修改' }}
                  </button>
                </div>
              </div>
              <div>
                <label for="organizerEmail" class="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input v-model="form.organizer_email" type="email" id="organizerEmail"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="输入举办者邮箱" required :disabled="isEditing && !editingFields.organizerEmail">
                  <button v-if="isEditing" type="button" @click="toggleEdit('organizerEmail')"
                    class="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    {{ editingFields.organizerEmail ? '完成' : '修改' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="$router.push('/admin/activities')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              取消
            </button>
            <button type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {{ isEditing ? '更新活动' : '发布活动' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Icon } from '@iconify/vue'
import debounce from 'lodash/debounce'
import { fetchActivity, createActivity, updateActivity } from '@/api/api'

const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const editingFields = ref({
  title: false,
  location: false,
  organizer: false,
  organizerEmail: false,
})

interface ActivityForm {
  activity_name: string
  shift: { date: string; duration: number; participants: number; unlimited: boolean }[]
  activity_location: string
  categories: string[]
  posterUrl: string
  organizer_name: string
  organizer_email: string
  activity_description: string
}

const form = ref<ActivityForm>({
  activity_name: '',
  shift: [{ date: '', duration: 0, participants: 0, unlimited: false }],
  activity_location: '',
  activity_description: '',
  categories: [],
  posterUrl: '',
  organizer_name: '',
  organizer_email: '',
})

const availableCategories = [
  '环保', '教育', '医疗', '社区服务', '文化艺术', '扶贫', '动物保护', '应急救援', '老年关怀', '儿童关爱'
]

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

const addDate = () => {
  form.value.shift.push({ date: '', duration: 0, participants: 0, unlimited: false })
}

const removeDate = (index: number) => {
  if (form.value.shift.length > 1) {
    form.value.shift.splice(index, 1)
  }
}

const handlePosterUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.posterUrl = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const toggleCategory = (category: string) => {
  const index = form.value.categories.indexOf(category);
  if (index > -1) {
    form.value.categories.splice(index, 1); // 移除类别
  } else {
    form.value.categories.push(category); // 添加类别
  }
};

const autoSave = debounce(() => {
  console.log('Auto-saving...')
  // Implement your auto-save logic here
}, 2000)

const toggleEdit = (field: keyof typeof editingFields.value) => {
  editingFields.value[field] = !editingFields.value[field]
}

const handleUnlimitedChange = (index: number) => {
  if (form.value.shift[index].unlimited) {
    form.value.shift[index].participants = 999
  }
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    isEditing.value = true
    const response = await fetchActivity(Number(id))
    const activity = response.data
    if (activity) {
      form.value = {
        activity_name: activity.activity_name,
        shift: activity.shift.map((date: { date: string; duration: number; participants?: number; unlimited?: boolean }) => ({
          date: new Date(date.date).toISOString().slice(0, 16), // 确保日期格式正确
          duration: date.duration,
          participants: date.participants ?? 0,
          unlimited: date.unlimited ?? false,
        })),
        activity_location: activity.activity_location,
        categories: activity.categories,
        posterUrl: activity.posterUrl ?? '',
        organizer_name: activity.organizer_name,
        organizer_email: activity.organizer_email,
        activity_description: activity.activity_description, // 确保这里设置了 activity_description
      }
    }
  }
})

const submitForm = async () => {
  try {
    const token = localStorage.getItem('token')
    if (isEditing.value) {
      await updateActivity(Number(route.params.id), form.value, token!)
    } else {
      await createActivity(form.value, token!)
    }
    router.push('/admin/activities')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

// Watch for changes in the form and trigger auto-save
watch(() => form.value, autoSave, { deep: true })
</script>