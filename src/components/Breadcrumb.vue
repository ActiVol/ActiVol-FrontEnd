<template>
  <div class="mx-auto py-2 px-4 bg-white mb-4 rounded-lg">
    <nav class="flex items-center justify-center">
      <ol class="flex items-center space-x-2">
        <li v-for="(item, index) in translatedItems" :key="index" class="flex items-center">
          <div v-if="index === 0" class="flex items-center">
            <Icon icon="mdi:home" class="w-5 h-5 text-blue-500 mr-1" />
          </div>
          <router-link :to="item.path"
                       :class="[isCurrentPage(item.label) ? 'font-bold text-blue-600' : 'text-blue-500', 'text-sm hover:text-blue-700 hover:decoration-dashed transition-colors']">
            {{ item.label }}
          </router-link>
          <Icon v-if="index < translatedItems.length - 1" icon="mdi:chevron-right" class="w-5 h-5 text-blue-400 mx-1" />
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Breadcrumb',
  components: {
    Icon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t, locale } = useI18n();
    const translatedItems = ref(props.items.map(item => ({
      ...item,
      label: t(item.label)
    })));

    watch(locale, () => {
      translatedItems.value = props.items.map(item => ({
        ...item,
        label: t(item.label)
      }));
    });

    const isCurrentPage = (label) => {
      return label === props.currentPage;
    };

    return {
      translatedItems,
      isCurrentPage
    };
  }
});
</script>