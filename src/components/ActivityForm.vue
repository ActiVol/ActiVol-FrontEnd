<template>
    <div class="w-full max-w-3xl mx-auto">
        <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">
                        {{ t('submitForm.firstName') }}
                    </label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input type="text" id="firstName" v-model="form.firstName" :disabled="isLoggedIn"
                            @blur="touchField('firstName')" :class="getInputClass('firstName')"
                            :placeholder="t('submitForm.firstName')" required />
                    </div>
                    <p v-if="touched.firstName && !form.firstName" class="mt-1 text-sm text-red-500">{{
                        t('submitForm.firstNameRequired') }}</p>
                </div>
                <div>
                    <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">{{
                        t('submitForm.lastName') }}</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input type="text" id="lastName" v-model="form.lastName" :disabled="isLoggedIn"
                            @blur="touchField('lastName')" :class="getInputClass('lastName')"
                            :placeholder="t('submitForm.lastName')" required />
                    </div>
                    <p v-if="touched.lastName && !form.lastName" class="mt-1 text-sm text-red-500">{{
                        t('submitForm.lastNameRequired') }}</p>
                </div>
            </div>

            <div>
                <label for="graduationYear" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.graduationYear') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:calendar" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="number" id="graduationYear" v-model="form.graduationYear" :disabled="isLoggedIn"
                        @blur="touchField('graduationYear')" :class="getInputClass('graduationYear')"
                        :placeholder="t('submitForm.graduationYear')" required />
                </div>
                <p v-if="touched.graduationYear && !form.graduationYear" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.graduationYearRequired') }}</p>
            </div>

            <div>
                <label for="internalEmail" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.internalEmail') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" id="internalEmail" v-model="form.internalEmail" :disabled="isLoggedIn"
                        @blur="touchField('internalEmail')" :class="getInputClass('internalEmail')"
                        :placeholder="t('submitForm.internalEmail')" required />
                </div>
                <p v-if="touched.internalEmail && !form.internalEmail" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.internalEmailRequired') }}</p>
            </div>

            <div>
                <label for="personalEmail" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.personalEmail') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" id="personalEmail" v-model="form.personalEmail" :disabled="isLoggedIn"
                        @blur="touchField('personalEmail')" :class="getInputClass('personalEmail')"
                        :placeholder="t('submitForm.personalEmail')" required />
                </div>
                <p v-if="touched.personalEmail && !form.personalEmail" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.personalEmailRequired') }}</p>
            </div>

            <div>
                <label for="activityLocation" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.activityLocation') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:map-marker-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="text" id="activityLocation" v-model="form.activityLocation" :disabled="isLoggedIn"
                        @blur="touchField('activityLocation')" :class="getInputClass('activityLocation')"
                        :placeholder="t('submitForm.activityLocation')" required />
                </div>
                <p v-if="touched.activityLocation && !form.activityLocation" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.activityLocationRequired') }}</p>
            </div>

            <div>
                <label for="activityDate" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.activityDate') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:calendar" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="date" id="activityDate" v-model="form.activityDate" @blur="touchField('activityDate')"
                        :class="getInputClass('activityDate')" :placeholder="t('submitForm.activityDate')" required />
                </div>
                <p v-if="touched.activityDate && !form.activityDate" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.activityDateRequired') }}</p>
            </div>

            <div>
                <label for="activityDuration" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.activityDuration') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:clock-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="number" id="activityDuration" v-model="form.activityDuration" :disabled="isLoggedIn"
                        @blur="touchField('activityDuration')" :class="getInputClass('activityDuration')"
                        :placeholder="t('submitForm.activityDuration')" required />
                </div>
                <p v-if="touched.activityDuration && !form.activityDuration" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.activityDurationRequired') }}</p>
            </div>

            <div>
                <label for="activityDescription" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.activityDescription') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <textarea id="activityDescription" v-model="form.activityDescription" :disabled="isLoggedIn"
                        @blur="touchField('activityDescription')" :class="getInputClass('activityDescription')"
                        :placeholder="t('submitForm.activityDescription')" required></textarea>
                </div>
                <p v-if="touched.activityDescription && !form.activityDescription" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.activityDescriptionRequired') }}</p>
            </div>

            <div>
                <label for="organizerName" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.organizerName') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:account-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="text" id="organizerName" v-model="form.organizerName" :disabled="isLoggedIn"
                        @blur="touchField('organizerName')" :class="getInputClass('organizerName')"
                        :placeholder="t('submitForm.organizerName')" required />
                </div>
                <p v-if="touched.organizerName && !form.organizerName" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.organizerNameRequired') }}</p>
            </div>

            <div>
                <label for="organizerEmail" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.organizerEmail') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon icon="mdi:email-outline" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" id="organizerEmail" v-model="form.organizerEmail" :disabled="isLoggedIn"
                        @blur="touchField('organizerEmail')" :class="getInputClass('organizerEmail')"
                        :placeholder="t('submitForm.organizerEmail')" required />
                </div>
                <p v-if="touched.organizerEmail && !form.organizerEmail" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.organizerEmailRequired') }}</p>
            </div>

            <div>
                <label for="activityCommentToAdmin" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('submitForm.activityCommentToAdmin') }}</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <textarea id="activityCommentToAdmin" v-model="form.activityCommentToAdmin" 
                        @blur="touchField('activityCommentToAdmin')" :class="getInputClass('activityCommentToAdmin')"
                        :placeholder="t('submitForm.activityCommentToAdmin')" required></textarea>
                </div>
                <p v-if="touched.activityCommentToAdmin && !form.activityCommentToAdmin" class="mt-1 text-sm text-red-500">{{
                    t('submitForm.activityDescriptionRequired') }}</p>
            </div>

            <div class="flex justify-between">
                <button type="button" @click="toggleLoginStatus"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                {{ isLoggedIn ? t('submitForm.toggleUnLoginStatus') : t('submitForm.toggleLoginStatus') }}
                </button>
                <button type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                    {{ t('submitForm.submit') }}
                </button>
            </div>
        </form>

        <div v-if="submissionResult" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <h2 class="font-bold mb-2">{{ t('submitForm.submissionSuccess') }}</h2>
            <p>{{ t('submitForm.studentLink') }}: {{ submissionResult.studentLink }}</p>
            <p>{{ t('submitForm.organizerLink') }}: {{ submissionResult.organizerLink }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

// 使用 i18n
const { t } = useI18n()

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
    activityCommentToAdmin: string;
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
    organizerEmail: false,
    activityCommentToAdmin: false,
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

const onSubmit = async () => {
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