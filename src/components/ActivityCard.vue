<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div class="relative">
      <div v-if="activity.activityPictures" class="h-48 overflow-hidden">
        <img :src="activity.activityPictures"
             :alt="truncateDescription(activity.activityName, 10)"
             class="w-full h-full object-cover" />
      </div>
      <div v-else :class="['h-48 flex items-center justify-center', gradientClass]">
        <span class="text-4xl text-white">{{ truncateDescription(activity.activityName, 10) }}</span>
      </div>
      <!-- <div class="absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs font-bold"
            :class="getStatusClass(activity.status)">
        正常
      </div> -->
    </div>
    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ truncateDescription(activity.activityName, 10) }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ truncateDescription(activity.details, 50) }}</p>
      <div class="flex items-center mb-2">
        <dict-tag class="mr-2" :options="serviceFields" :value="activity.serviceField" />
        <dict-tag class="mr-2" :options="serviceObjects" :value="activity.serviceObject" />
        <dict-tag class="mr-2" :options="serviceLocations" :value="activity.serviceLocation" />
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500">
          <Icon icon="mdi:calendar" class="w-4 h-4 mr-1" />
          {{ activity.startTime }}
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <Icon icon="mdi:clock-outline" class="w-4 h-4 mr-1" />
          <span class="mr-1"> {{ activity.duration }}</span>
          <span class="mr-1">小时</span>
        </div>
      </div>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center text-sm text-gray-500">
          <Icon icon="mdi:map-marker" class="flex w-4 h-4 mr-1" />
          <p class="text-gray-600">
            {{ truncateDescription(activity.address, 20) }}
          </p>
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <Icon icon="mdi:account-group" class="w-4 h-4 mr-1" />
          <span class="mr-1">
            招募人数
          </span>
          <span class="mr-1">
            {{ activity.recruitNumber }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed, defineProps, watch, ref } from 'vue';
import { Icon } from '@iconify/vue';
import config from 'config';

const gradients = {
  blue: 'bg-gradient-to-br from-blue-400 to-indigo-600',
  green: 'bg-gradient-to-br from-green-400 to-emerald-600',
  purple: 'bg-gradient-to-br from-purple-400 to-fuchsia-600',
  orange: 'bg-gradient-to-br from-orange-400 to-red-600',
  teal: 'bg-gradient-to-br from-teal-400 to-cyan-600',
};

defineComponent(['Icon']);

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
  serviceField: {
    type: Array,
    required: true,
    default: () => [],
  },
  serviceObject: {
    type: Array,
    required: true,
    default: () => [],
  },
  serviceLocation: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const serviceFields = ref([]);
const serviceObjects = ref([]);
const serviceLocations = ref([]);

watch(() => props.serviceField, (newValue) => {
  serviceFields.value = newValue;
}, { deep: true, immediate: true });

watch(() => props.serviceObject, (newValue) => {
  serviceObjects.value = newValue;
}, { deep: true, immediate: true });

watch(() => props.serviceLocation, (newValue) => {
  serviceLocations.value = newValue;
}, { deep: true, immediate: true });

const baseURL = config.baseURL;
const gradientClass = computed(() => {
  if (props.activity.gradientColor && gradients[props.activity.gradientColor]) {
    return gradients[props.activity.gradientColor];
  }
  const colors = Object.values(gradients);
  return colors[Math.floor(Math.random() * colors.length)];
});

const getStatusClass = (status) => {
  switch (status) {
  case 'open':
    return 'bg-green-500 text-white';
  case 'full':
    return 'bg-yellow-500 text-white';
  case 'closed':
    return 'bg-red-500 text-white';
  default:
    return 'bg-gray-500 text-white';
  }
};

const truncateDescription = (details, maxLength = 100) => {
  return details && details.length > maxLength
    ? details.substring(0, maxLength) + '...'
    : details;
};

// export default defineComponent({
//   name: 'ActivityCard',
//   components: {
//     Icon,
//   },
//   props: {
//     activity: {
//       type: Object,
//       required: true,
//     },
//   },
//   setup(props) {
//     const { proxy } = getCurrentInstance();
//     const { serviceLocation,serviceField,serviceObject } = proxy.useDict('service_location', 'service_field', 'service_object');

//     const baseURL = config.baseURL;
//     const gradientClass = computed(() => {
//       if (props.activity.gradientColor && gradients[props.activity.gradientColor]) {
//         return gradients[props.activity.gradientColor];
//       }
//       const colors = Object.values(gradients);
//       return colors[Math.floor(Math.random() * colors.length)];
//     });
//     const getStatusClass = (status) => {
//       switch (status) {
//       case 'open':
//         return 'bg-green-500 text-white';
//       case 'full':
//         return 'bg-yellow-500 text-white';
//       case 'closed':
//         return 'bg-red-500 text-white';
//       default:
//         return 'bg-gray-500 text-white';
//       }
//     };

//     const truncateDescription = (details, maxLength = 100) => {
//       return details && details.length > maxLength
//         ? details.substring(0, maxLength) + '...'
//         : details;
//     };

//     return { getStatusClass, truncateDescription, gradientClass,baseURL };
//   },
// });

</script>