<template>
    <div class="relative inline-block text-left">
        <div>
            <button @click="toggleDropdown" type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="language-menu" aria-expanded="true" aria-haspopup="true">
                {{ currentLanguage.name }}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-if="isOpen"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                <div class="py-1" role="none">
                    <a v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang.code)" href="#"
                        class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem">
                        {{ lang.name }}
                    </a>
                </div>
            </div>
        </transition>

        <transition enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-to-class="transform opacity-0 scale-95">
            <div v-if="showBanner" class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
                <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div class="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
                        <div class="flex items-center justify-between flex-wrap">
                            <div class="w-0 flex-1 flex items-center">
                                <span class="flex p-2 rounded-lg bg-indigo-800">
                                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                <p class="ml-3 font-medium text-white truncate">
                                    <span class="md:hidden">
                                        {{ $t('languageBanner.shortMessage') }}
                                    </span>
                                    <span class="hidden md:inline">
                                        {{ $t('languageBanner.longMessage') }}
                                    </span>
                                </p>
                            </div>
                            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                                <button @click="closeBanner" type="button"
                                    class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white">
                                    <span class="sr-only">Dismiss</span>
                                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { LanguageTypes } from '@/types';

export default defineComponent({
    name: 'LanguageSelector',
    setup() {
        const { locale, t } = useI18n();
        const isOpen = ref(false);
        const showBanner = ref(true);

        const languages: LanguageTypes.Option[] = [
            { code: 'en', name: 'English' },
            { code: 'zh-cn', name: '中文' },
        ];

        const currentLanguage = ref<LanguageTypes.Option>(languages.find(lang => lang.code === locale.value) || languages[0]);

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };

        const selectLanguage = (langCode: string) => {
            locale.value = langCode;
            currentLanguage.value = languages.find(lang => lang.code === langCode) || languages[0];
            isOpen.value = false;
            showBanner.value = true;
        };

        const closeBanner = () => {
            showBanner.value = false;
        };

        const detectBrowserLanguage = () => {
            const browserLang = navigator.language.toLowerCase();
            const matchedLang = languages.find(lang => lang.code === browserLang);
            if (matchedLang) {
                selectLanguage(matchedLang.code);
            } else {
                selectLanguage('en');
            }
        };

        onMounted(() => {
            detectBrowserLanguage();
        });

        watch(locale, () => {
            showBanner.value = true;
        });

        return {
            isOpen,
            showBanner,
            languages,
            currentLanguage,
            toggleDropdown,
            selectLanguage,
            closeBanner,
            t
        };
    }
});
</script>