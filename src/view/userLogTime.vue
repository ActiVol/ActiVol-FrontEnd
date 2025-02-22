<template>
  <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
    <div class="w-full max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-blue-800 mb-6">{{ $t('page.logTime.title') }}</h1>
      <ActivityForm />
    </div>
  </Layout>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ActivityForm from '../components/ActivityForm.vue';
import Layout from '../components/Layout.vue';

const { t } = useI18n();

const breadcrumbItems = [
  { label: t('breadCrumb.home'), path: '/' },
  { label: t('breadCrumb.logTime'), path: '/log-time' }
];

const currentPage = computed(() => {
  return t('breadCrumb.logTime');
});
</script>