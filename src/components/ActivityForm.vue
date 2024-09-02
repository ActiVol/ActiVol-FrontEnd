<template>
    <div class="w-full max-w-3xl mx-auto">
        <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">名</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input type="text" id="firstName" v-model="form.firstName" :disabled="isLoggedIn"
                            @blur="touchField('firstName')" :class="getInputClass('firstName')" placeholder="名"
                            required />
                    </div>
                    <p v-if="touched.firstName && !form.firstName" class="mt-1 text-sm text-red-500">名字是必填的。</p>
                </div>
                <div>
                    <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">姓</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input type="text" id="lastName" v-model="form.lastName" :disabled="isLoggedIn"
                            @blur="touchField('lastName')" :class="getInputClass('lastName')" placeholder="姓"
                            required />
                    </div>
                    <p v-if="touched.lastName && !form.lastName" class="mt-1 text-sm text-red-500">姓氏是必填的。</p>
                </div>
            </div>

            <div>
                <label for="graduationYear" class="block text-sm font-medium leading-6 text-gray-900">毕业年份</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:calendar" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="number" id="graduationYear" v-model="form.graduationYear" :disabled="isLoggedIn"
                        @blur="touchField('graduationYear')" :class="getInputClass('graduationYear')" placeholder="毕业年份"
                        required />
                </div>
                <p v-if="touched.graduationYear && !form.graduationYear" class="mt-1 text-sm text-red-500">毕业年份是必填的。</p>
            </div>

            <div>
                <label for="internalEmail" class="block text-sm font-medium leading-6 text-gray-900">内部邮箱</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" id="internalEmail" v-model="form.internalEmail" :disabled="isLoggedIn"
                        @blur="touchField('internalEmail')" :class="getInputClass('internalEmail')" placeholder="内部邮箱"
                        required />
                </div>
                <p v-if="touched.internalEmail && !form.internalEmail" class="mt-1 text-sm text-red-500">内部邮箱是必填的。</p>
            </div>

            <div>
                <label for="personalEmail" class="block text-sm font-medium leading-6 text-gray-900">个人邮箱</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" id="personalEmail" v-model="form.personalEmail" :disabled="isLoggedIn"
                        @blur="touchField('personalEmail')" :class="getInputClass('personalEmail')" placeholder="个人邮箱"
                        required />
                </div>
                <p v-if="touched.personalEmail && !form.personalEmail" class="mt-1 text-sm text-red-500">个人邮箱是必填的。</p>
            </div>

            <div>
                <label for="activityLocation" class="block text-sm font-medium leading-6 text-gray-900">参加活动的地点</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:map-marker-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="text" id="activityLocation" v-model="form.activityLocation"
                        @blur="touchField('activityLocation')" :class="getInputClass('activityLocation')"
                        placeholder="活动地点" required />
                </div>
                <p v-if="touched.activityLocation && !form.activityLocation" class="mt-1 text-sm text-red-500">活动地点是必填的。
                </p>
            </div>

            <div>
                <label for="activityDate" class="block text-sm font-medium leading-6 text-gray-900">参加活动的日期</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:calendar" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="date" id="activityDate" v-model="form.activityDate" @blur="touchField('activityDate')"
                        :class="getInputClass('activityDate')" required />
                </div>
                <p v-if="touched.activityDate && !form.activityDate" class="mt-1 text-sm text-red-500">活动日期是必填的。</p>
            </div>

            <div>
                <label for="activityDuration"
                    class="block text-sm font-medium leading-6 text-gray-900">参加活动的总时长（小时）</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:clock-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="number" id="activityDuration" v-model="form.activityDuration"
                        @blur="touchField('activityDuration')" :class="getInputClass('activityDuration')"
                        placeholder="活动时长" min="0" step="0.5" required />
                </div>
                <p v-if="touched.activityDuration && !form.activityDuration" class="mt-1 text-sm text-red-500">活动时长是必填的。
                </p>
            </div>

            <div>
                <label for="activityDescription"
                    class="block text-sm font-medium leading-6 text-gray-900">参加活动的简介</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <textarea id="activityDescription" v-model="form.activityDescription"
                        @blur="touchField('activityDescription')" :class="getInputClass('activityDescription')" rows="3"
                        placeholder="活动简介" required></textarea>
                </div>
                <p v-if="touched.activityDescription && !form.activityDescription" class="mt-1 text-sm text-red-500">
                    活动简介是必填的。</p>
            </div>

            <div>
                <label for="organizerName" class="block text-sm font-medium leading-6 text-gray-900">活动举办者的名字</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:account-group-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="text" id="organizerName" v-model="form.organizerName"
                        @blur="touchField('organizerName')" :class="getInputClass('organizerName')" placeholder="举办者名字"
                        required />
                </div>
                <p v-if="touched.organizerName && !form.organizerName" class="mt-1 text-sm text-red-500">举办者名字是必填的。</p>
            </div>

            <div>
                <label for="organizerEmail" class="block text-sm font-medium leading-6 text-gray-900">活动举办者的邮箱</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" id="organizerEmail" v-model="form.organizerEmail"
                        @blur="touchField('organizerEmail')" :class="getInputClass('organizerEmail')"
                        placeholder="举办者邮箱" required />
                </div>
                <p v-if="touched.organizerEmail && !form.organizerEmail" class="mt-1 text-sm text-red-500">举办者邮箱是必填的。
                </p>
            </div>

            <div class="flex justify-between">
                <button type="button" @click="toggleLoginStatus"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                    {{ isLoggedIn ? '切换到未登录状态' : '切换到已登录状态' }}
                </button>
                <button type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                    最终提交
                </button>
            </div>
        </form>

        <div v-if="submissionResult" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <h2 class="font-bold mb-2">提交成功</h2>
            <p>学生表单链接: {{ submissionResult.studentLink }}</p>
            <p>举办方表单链接: {{ submissionResult.organizerLink }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'

// 定义 props 和 emits
const props = defineProps({
    initialForm: {
        type: Object,
        required: true,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['submit', 'toggle-login']);

// 表单状态，直接从 props 复制
const form = reactive({ ...props.initialForm });

// 用户登录状态
const isLoggedIn = ref(false)

// 提交结果
const submissionResult = ref<{ studentLink: string; organizerLink: string; } | null>(null)

interface Form {
    firstName: string;
    lastName: string;
    graduationYear: number | null;
    internalEmail: string;
    personalEmail: string;
    activityLocation: string;
    activityDate: string;
    activityDuration: number | null;
    activityDescription: string;
    organizerName: string;
    organizerEmail: string;
}

const touched = reactive({
    firstName: false,
    lastName: false,
    graduationYear: false,
    internalEmail: false,
    personalEmail: false,
    activityLocation: false,
    activityDate: false,
    activityDuration: false,
    activityDescription: false,
    organizerName: false,
    organizerEmail: false
})

type FormFields = keyof typeof touched;

const touchField = (fieldName: FormFields) => {
    touched[fieldName] = true
}

const getInputClass = (fieldName: string) => {
    return [
        'block w-full rounded-md py-1.5 pl-10 pr-3 text-gray-900',
        'ring-1 ring-inset',
        form[fieldName as keyof Form] ? 'ring-blue-300' : (touched[fieldName as keyof typeof touched] && !form[fieldName as keyof Form] ? 'ring-red-300' : 'ring-gray-300'),
        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
    ]
}

const toggleLoginStatus = () => {
    isLoggedIn.value = !isLoggedIn.value;
    if (isLoggedIn.value) {
        // Simulate filling in data for logged-in user
        form.firstName = 'Kevin';
        form.lastName = 'Lee';
        form.graduationYear = 2024;
        form.internalEmail = 'kevin.lee@school.edu';
        form.personalEmail = 'kevin.lee@example.com';
    } else {
        // Clear form data when logging out
        (Object.keys(form) as Array<keyof Form>).forEach(key => {
            form[key] = '' as any; // 强制转换为 any
        });
    }
};

const submitForm = async () => {
    try {
        // Simulate API call to backend
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Generate unique IDs for links
        const studentId = Math.random().toString(36).substr(2, 9)
        const organizerId = Math.random().toString(36).substr(2, 9)
        // Get the current URL
        const currentUrl = window.location.href;

        submissionResult.value = {
            studentLink: `${currentUrl}/ActivityForm/${studentId}`,
            organizerLink: `${currentUrl}/ActivityForm/${studentId}/${organizerId}`
        }

        // Here you would typically send the form data to your backend
        console.log('Form submitted:', form)
    } catch (error) {
        console.error('Error submitting form:', error)
    }
}
</script>