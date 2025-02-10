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
import Layout from '../components/Layout.vue';
import ActivityDetail from '../components/ActivityDetail.vue';
defineComponent(['ActivityDetail','Layout']);
const { proxy } = getCurrentInstance();
const dictDatas = proxy.useDict('service_location', 'service_field', 'service_object');
const serviceField = dictDatas.service_field;
const serviceObject = dictDatas.service_object;
const serviceLocation = dictDatas.service_location;
const breadcrumbItems = [
  { label: '首页', path: '/' },
  { label: '活动详情', path: '/activityDetail' },
];
const currentPage = '活动详情';

</script>