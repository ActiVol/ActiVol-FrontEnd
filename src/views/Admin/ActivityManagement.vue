<template>
    <div>
        <!-- 搜索和过滤 -->
        <div class="mb-6 bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-wrap gap-4 items-center">
                <input @input="handleSearchInput" type="text" placeholder="搜索活动或用户"
                    class="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                <select v-model="statusFilter"
                    class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">所有状态</option>
                    <option value="approved">已批准</option>
                    <option value="pending">待审核</option>
                    <option value="rejected">已拒绝</option>
                </select>
                <button @click="fetchActivities"
                    class="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition duration-300 shadow-md">
                    搜索
                </button>
            </div>
        </div>

        <!-- 添加新活动按钮 -->
        <div class="mb-6 text-right">
            <button @click="showAddActivityModal = true"
                class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 shadow-md">
                添加新活动
            </button>
        </div>

        <!-- 活动列表 -->
        <div class="bg-white rounded-lg shadow-md overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="bg-indigo-100 text-indigo-800">
                        <th class="p-3 text-left">活动名称</th>
                        <th class="p-3 text-left">日期</th>
                        <th class="p-3 text-left">时长</th>
                        <th class="p-3 text-left">用户</th>
                        <th class="p-3 text-left">状态</th>
                        <th class="p-3 text-left">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="activity in paginatedActivities" :key="activity.id" class="border-b hover:bg-gray-50">
                        <td class="p-3">{{ activity.name }}</td>
                        <td class="p-3">{{ formatDate(activity.date) }}</td>
                        <td class="p-3">{{ activity.hours }} 小时</td>
                        <td class="p-3">{{ activity.userId }}</td>
                        <td class="p-3">
                            <span :class="getStatusClass(activity.status)">
                                {{ getStatusText(activity.status) }}
                            </span>
                        </td>
                        <td class="p-3">
                            <button @click="editActivity(activity)" class="text-blue-500 hover:text-blue-700 mr-2"
                                title="编辑">
                                <Icon icon="mdi:pencil" />
                            </button>
                            <button @click="confirmDeleteActivity(activity)"
                                class="text-red-500 hover:text-red-700 mr-2" title="删除">
                                <Icon icon="mdi:delete" />
                            </button>
                            <button v-if="activity.status === 'pending'" @click="showApproveModal(activity)"
                                class="text-green-500 hover:text-green-700" title="审核">
                                <Icon icon="mdi:check-circle" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 分页控件 -->
        <div class="mt-6 flex justify-between items-center">
            <div>
                <select v-model="itemsPerPage" @change="updatePagination"
                    class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option :value="10">10条/页</option>
                    <option :value="20">20条/页</option>
                    <option :value="50">50条/页</option>
                </select>
            </div>
            <div class="space-x-2">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                    'px-3 py-1 rounded-md',
                    currentPage === page
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-indigo-500 hover:bg-indigo-100'
                ]">
                    {{ page }}
                </button>
            </div>
        </div>

        <!-- 添加/编辑活动模态框 -->
        <Modal v-if="showAddActivityModal || editingActivity" @close="closeActivityModal">
            <h2 class="text-2xl font-bold mb-4">{{ editingActivity ? '编辑活动' : '添加新活动' }}</h2>
            <form @submit.prevent="submitActivity" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">活动名称</label>
                    <input id="name" v-model="currentActivity.name" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700">日期</label>
                    <input id="date" v-model="currentActivity.date" type="date" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label for="hours" class="block text-sm font-medium text-gray-700">时长（小时）</label>
                    <input id="hours" v-model="currentActivity.hours" type="number" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label for="userId" class="block text-sm font-medium text-gray-700">用户ID</label>
                    <input id="userId" v-model="currentActivity.userId" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                    <textarea id="description" v-model="currentActivity.description" rows="3"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="closeActivityModal"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        取消
                    </button>
                    <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                        {{ editingActivity ? '保存修改' : '添加活动' }}
                    </button>
                </div>
            </form>
        </Modal>

        <!-- 审核活动模态框 -->
        <Modal v-if="showApproveModalFlag" @close="closeApproveModal">
            <h2 class="text-2xl font-bold mb-4">审核活动</h2>
            <p class="mb-4">您正在审核活动：{{ currentActivity.name }}</p>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">更新状态</label>
                    <select v-model="currentActivity.status"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="approved">批准</option>
                        <option value="rejected">拒绝</option>
                        <option value="pending">待审核</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">审核备注</label>
                    <textarea v-model="currentActivity.approvalNote" rows="3"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                    <button @click="closeApproveModal"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        取消
                    </button>
                    <button @click="submitApproval"
                        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        提交审核
                    </button>
                </div>
            </div>
        </Modal>

        <!-- 确认删除模态框 -->
        <Modal v-if="showDeleteConfirmModal" @close="closeDeleteConfirmModal">
            <h2 class="text-2xl font-bold mb-4">确认删除</h2>
            <p class="mb-4">您确定要删除活动 "{{ activityToDelete?.name }}" 吗？此操作不可撤销。</p>
            <div class="flex justify-end space-x-3">
                <button @click="closeDeleteConfirmModal"
                    class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    取消
                </button>
                <button @click="deleteActivity" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    确认删除
                </button>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import Modal from '@/components/Admin/Modal.vue'
import debounce from 'lodash/debounce'

interface Activity {
    id: number
    name: string
    date: string
    hours: number
    userId: string
    status: string
    description?: string
    approvalNote?: string
}

const activities = ref<Activity[]>([])
const searchQuery = ref('')
const statusFilter = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const showAddActivityModal = ref(false)
const showApproveModalFlag = ref(false)
const showDeleteConfirmModal = ref(false)
const editingActivity = ref<Activity | null>(null)
const currentActivity = ref<Partial<Activity>>({})
const activityToDelete = ref<Activity | null>(null)

const paginatedActivities = computed(() => {
    const filteredActivities = activities.value.filter(activity => {
        const matchesSearch = activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            activity.userId.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesStatus = !statusFilter.value || activity.status === statusFilter.value
        return matchesSearch && matchesStatus
    })

    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredActivities.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(activities.value.length / itemsPerPage.value)
})

const fetchActivities = async () => {
    try {
        const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/activities')
        activities.value = response.data
    } catch (error) {
        console.error('Error fetching activities:', error)
        // 如果API调用失败，使用模拟数据
        activities.value = [
            { id: 1, name: '海滩清洁', date: '2023-06-15', hours: 4, userId: 'user1', status: 'approved' },
            { id: 2, name: '食品募捐', date: '2023-06-20', hours: 3, userId: 'user2', status: 'pending' },
            { id: 3, name: '植树活动', date: '2023-06-25', hours: 5, userId: 'user3', status: 'approved' },
        ]
    }
}

const updatePagination = () => {
    currentPage.value = 1
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const getStatusClass = (status: string) => {
    switch (status) {
        case 'approved':
            return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
        case 'pending':
            return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
        case 'rejected':
            return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
        default:
            return 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'approved':
            return '已批准'
        case 'pending':
            return '待审核'
        case 'rejected':
            return '已拒绝'
        default:
            return '未知状态'
    }
}

const editActivity = (activity: Activity) => {
    editingActivity.value = activity
    currentActivity.value = { ...activity }
    showAddActivityModal.value = true
}

const closeActivityModal = () => {
    showAddActivityModal.value = false
    editingActivity.value = null
    currentActivity.value = {}
}

const submitActivity = async () => {
    try {
        if (editingActivity.value) {
            // 更新现有活动
            await axios.put(`https://test-api-v.us.kjchmc.cn/api/admin/activities/${editingActivity.value.id}`, currentActivity.value)
        } else {
            // 添加新活动
            await axios.post('https://test-api-v.us.kjchmc.cn/api/admin/activities', currentActivity.value)
        }
        await fetchActivities()
        closeActivityModal()
    } catch (error) {
        console.error('Error submitting activity:', error)
        // 处理错误，例如显示错误消息给用户
    }
}

const showApproveModal = (activity: Activity) => {
    currentActivity.value = { ...activity }
    showApproveModalFlag.value = true
}

const closeApproveModal = () => {
    showApproveModalFlag.value = false
    currentActivity.value = {}
}

const submitApproval = async () => {
    try {
        await axios.put(`https://test-api-v.us.kjchmc.cn/api/admin/activities/${currentActivity.value.id}/approve`, {
            status: currentActivity.value.status,
            approvalNote: currentActivity.value.approvalNote
        })
        await fetchActivities()
        closeApproveModal()
    } catch (error) {
        console.error('Error submitting approval:', error)
        // 处理错误，例如显示错误消息给用户
    }
}

const confirmDeleteActivity = (activity: Activity) => {
    activityToDelete.value = activity
    showDeleteConfirmModal.value = true
}

const closeDeleteConfirmModal = () => {
    showDeleteConfirmModal.value = false
    activityToDelete.value = null
}

const deleteActivity = async () => {
    if (!activityToDelete.value) return

    try {
        await axios.delete(`https://test-api-v.us.kjchmc.cn/api/admin/activities/${activityToDelete.value.id}`)
        await fetchActivities()
        closeDeleteConfirmModal()
    } catch (error) {
        console.error('Error deleting activity:', error)
        // 处理错误，例如显示错误消息给用户
    }
}

// 防抖搜索输入,延迟0.8秒
const handleSearchInput = debounce((event: Event) => {
    const target = event.target as HTMLInputElement
    searchQuery.value = target.value
    updatePagination()
}, 800)

onMounted(fetchActivities)
</script>
