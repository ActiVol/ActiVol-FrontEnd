<template>
  <Layout :breadcrumbItems="breadcrumbItems" currentPage="Home">
    <div class="bg-gray-50 rounded-lg shadow-inner px-4 sm:px-6 py-6 sm:py-8 w-full">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{{$t('home.welcome')}}</h1>
      <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{{$t('home.easyVolunteer')}}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <ListBox v-for="(item, index) in listBoxItems"
                 :key="index"
                 :icon="item.icon"
                 :title="item.title"
                 :content="item.content"
                 :path="item.path"
                 :color="item.color" />
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { defineComponent, ref ,getCurrentInstance} from 'vue';
import Layout from '../components/Layout.vue';
import ListBox from '../components/ListBox.vue';
defineComponent(['Layout', 'ListBox']);
const { proxy } = getCurrentInstance();

const breadcrumbItems = ref([
  { label: '', path: '/' },
]);

const listBoxItems = ref([
  { icon: 'mdi:clipboard-text', title: proxy.$t('menu.TimeLog'), content: proxy.$t('menu.ActivityLogger'), path: '/selfSubmission', color: 'blue' },
  { icon: 'mdi:chart-bar', title:  proxy.$t('menu.StatsView'), content:proxy.$t('menu.VolunteerImpact'), path: '/userDetails', color: 'green' },
  { icon: 'mdi:calendar', title: proxy.$t('menu.Activity'), content: proxy.$t('menu.ActivityViewer'), path: '/activity', color: 'red' },
  // { icon: 'mdi:certificate', title: 'index.certificates', content: 'index.certificatesContent', path: '/certificates', color: 'indigo' },
  // { icon: 'mdi:information', title: '关于本站点', content: '更好的了解本项目', path: '/about', color: 'purple' },
  // { icon: 'mdi:account-group', title: '管理站点', content: '供管理员对活动进行管理审批', path: '/admin', color: 'yellow' },
]);
</script>