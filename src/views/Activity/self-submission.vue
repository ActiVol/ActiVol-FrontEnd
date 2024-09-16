<template>
  <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
    <div class="w-full max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-blue-800 mb-6">{{ $t('selfSubmission.title') }}</h1>

      <ActivityForm :initialForm="form" :isDisabled="isLoggedIn" @submit="submitForm"
        @toggle-login="toggleLoginStatus" />

      <div v-if="submissionResult" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
        <h2 class="font-bold mb-2">提交成功</h2>
        <p>学生表单链接: {{ submissionResult.studentLink }}</p>
        <br />
        <p>举办方表单链接: {{ submissionResult.organizerLink }}</p>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import ActivityForm from '@/components/ActivityForm.vue';
import Layout from '@/components/Layout.vue';
import { useI18n } from 'vue-i18n';

const isLoggedIn = ref(false)
const submissionResult = ref<{ studentLink: string; organizerLink: string; } | null>(null)

const form = reactive({
  firstName: '',
  lastName: '',
  graduationYear: null as number | null,
  internalEmail: '',
  personalEmail: '',
  activityLocation: '',
  activityDate: '',
  activityDuration: null,
  activityDescription: '',
  organizerName: '',
  organizerEmail: ''
});

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
    form.firstName = '';
    form.lastName = '';
    form.graduationYear = null;
    form.internalEmail = '';
    form.personalEmail = '';
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

// Initialize i18n
const { t } = useI18n()

// Define breadcrumb items for this page
const breadcrumbItems = [
  { label: t('breadcrumb.home'), path: '/' },
  { label: t('breadcrumb.activitySelfSubmission'), path: '/self-submission' }
]

// Define current page for breadcrumb
const currentPage = computed(() => {
  return t('breadcrumb.activitySelfSubmission')
})
</script>