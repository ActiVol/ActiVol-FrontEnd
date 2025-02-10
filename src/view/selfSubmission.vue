<template>
  <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
    <div class="w-full max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-blue-800 mb-6">自主录入活动信息</h1>
      <ActivityForm />
    </div>
  </Layout>
</template>

<script setup>
import { computed } from 'vue';
import ActivityForm from '../components/ActivityForm.vue';
import Layout from '../components/Layout.vue';
const breadcrumbItems = [
  { label: '主页', path: '/' },
  { label: '参与活动信息录入', path: '/selfSubmission' }
];
const currentPage = computed(() => {
  return '参与活动信息录入';
});
</script>