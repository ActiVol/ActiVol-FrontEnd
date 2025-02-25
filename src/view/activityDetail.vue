<template>
  <Layout :breadcrumbItems="breadcrumbItems" :currentPage="currentPage">
    <ActivityDetail
      :serviceField="serviceField"
      :serviceObject="serviceObject"
      :serviceLocation="serviceLocation"/>
  </Layout>
</template>

<script setup>
import { defineComponent, getCurrentInstance} from 'vue';
import { useI18n } from 'vue-i18n';
import Layout from '../components/Layout.vue';
import ActivityDetail from '../components/ActivityDetail.vue';

defineComponent(['ActivityDetail','Layout']);

const { t } = useI18n();

const { proxy } = getCurrentInstance();
const dictDatas = proxy.useDict('service_location', 'service_field', 'service_object');
const serviceField = dictDatas.service_field;
const serviceObject = dictDatas.service_object;
const serviceLocation = dictDatas.service_location;
const breadcrumbItems = [
  { label: t('breadCrumb.home'), path: '/' },
  { label: t('breadCrumb.activityDetail'), path: '/activityDetail' },
];
const currentPage = t('breadCrumb.activityDetail');

</script>