<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <div class="flex items-center cursor-pointer border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50 transition-colors duration-200">
      <Icon icon="mdi:translate" class="text-xl mr-2 text-gray-600" />
      <span class="text-sm text-gray-700">{{ currentLanguageName }}</span>
      <Icon icon="mdi:chevron-down" class="text-sm ml-2 text-gray-500" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lang in languages"
          :key="lang.code"
          :command="lang.code"
          :class="{ 'el-dropdown-menu__item--active': currentLanguage === lang.code }"
        >
          <div class="flex items-center">
            <Icon :icon="lang.flag" class="mr-2" />
            <span>{{ lang.name }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import useAppStore from '../../stores/modules/app';

const emit = defineEmits(['change_language']);
const appStore = useAppStore();
const { locale, t } = useI18n();

const languages = [
  { code: 'zh_CN', name: '中文', flag: 'twemoji:flag-china' },
  { code: 'en_US', name: 'English', flag: 'twemoji:flag-us-outlying-islands' },
];

const currentLanguage = ref(appStore.$state.language);

const currentLanguageName = computed(() => {
  const lang = languages.find(lang => lang.code === currentLanguage.value);
  return lang ? lang.name : '';
});

const handleSetLanguage = (langCode) => {
  appStore.setLanguage(langCode);
  locale.value = langCode;
  currentLanguage.value = langCode; // 立即更新当前语言

  const selectedLang = languages.find(lang => lang.code === langCode);
  if (selectedLang) {
    ElMessage.success(t('message.languageSwitchSuccess', { language: selectedLang.name }));
  }

  emit('change_language');
};
</script>

<style scoped>
:deep(.el-dropdown-menu__item--active) {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}
</style>
