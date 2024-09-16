<template>
    <div class="relative inline-block text-left">
        <button @click="toggleDropdown($event)" type="button"
            class="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="language-menu" aria-expanded="true" aria-haspopup="true">
            <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129">
                </path>
            </svg>
            {{ currentLanguage.name }}
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-if="isOpen" ref="dropdown"
                :class="['absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none', dropdownPosition]"
                role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                <div class="py-1" role="none">
                    <a v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang.code)" href="#"
                        :class="['block px-4 py-2 text-sm', currentLanguage.code === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50']"
                        role="menuitem">
                        {{ lang.name }}
                    </a>
                </div>
            </div>
        </transition>

        <transition enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200" leave-to-class="transform opacity-0 scale-95">
            <div v-if="showBanner" class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
                <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div class="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
                        <div class="flex items-center justify-between flex-wrap">
                            <div class="w-0 flex-1 flex items-center">
                                <span class="flex p-2 rounded-lg bg-indigo-800">
                                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
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
                                    <span class="sr-only">{{ $t('languageBanner.dismiss') }}</span>
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

        <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showLanguagePrompt"
                class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div class="bg-white rounded-lg p-6 max-w-sm mx-auto">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('languagePrompt.title') }}</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        {{ $t('languagePrompt.message', { detectedLanguage: detectedLanguage.name }) }}
                    </p>
                    <div class="flex justify-end space-x-4">
                        <button @click="confirmLanguage"
                            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                            {{ $t('languagePrompt.confirm', { detectedLanguage: detectedLanguage.name }) }}
                        </button>
                        <button @click="switchToEnglish"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                            Switch to English
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

export interface LanguageOption {
    // label: string;
    // value: string;
    code: string;
    name: string;
}

export default defineComponent({
    name: 'LanguageSelector',
    setup() {
        const { locale, t } = useI18n();
        const isOpen = ref(false);
        const showBanner = ref(false);
        const showLanguagePrompt = ref(false);
        const dropdown = ref<HTMLElement | null>(null);

        const languages: LanguageOption[] = [
            { code: 'en', name: 'English' },
            { code: 'zh-cn', name: '中文' },
        ];

        const currentLanguage = ref<LanguageOption>(languages.find(lang => lang.code === locale.value) || languages[0]);
        const detectedLanguage = ref<LanguageOption>(languages[0]);

        const dropdownPosition = computed(() => {
            if (!dropdown.value) return 'right-0';
            const rect = dropdown.value.getBoundingClientRect();
            return rect.right > window.innerWidth ? 'right-0' : 'left-0';
        });

        const toggleDropdown = (event: Event) => {
            event.stopPropagation();
            isOpen.value = !isOpen.value;
        };

        const selectLanguage = (langCode: string) => {
            locale.value = langCode;
            currentLanguage.value = languages.find(lang => lang.code === langCode) || languages[0];
            isOpen.value = false;
            localStorage.setItem('selectedLanguage', langCode);
            checkBannerVisibility();
        };

        const closeBanner = () => {
            showBanner.value = false;
            localStorage.setItem('lastBannerClose', Date.now().toString());
        };

        const confirmLanguage = () => {
            selectLanguage(detectedLanguage.value.code);
            showLanguagePrompt.value = false;
        };

        const switchToEnglish = () => {
            selectLanguage('en');
            showLanguagePrompt.value = false;
        };

        const detectBrowserLanguage = () => {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                selectLanguage(savedLanguage);
            } else {
                const browserLang = navigator.language.toLowerCase();
                const matchedLang = languages.find(lang => lang.code === browserLang || browserLang.startsWith(lang.code));
                if (matchedLang && matchedLang.code !== 'en') {
                    detectedLanguage.value = matchedLang;
                    locale.value = matchedLang.code;
                    showLanguagePrompt.value = true;
                } else {
                    selectLanguage('en');
                }
            }
        };

        const checkBannerVisibility = () => {
            const lastClose = localStorage.getItem('lastBannerClose');
            if (!lastClose || Date.now() - parseInt(lastClose) > 24 * 60 * 60 * 1000) {
                showBanner.value = true;
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen.value && dropdown.value && !dropdown.value.contains(event.target as Node)) {
                isOpen.value = false;
            }
        };

        onMounted(() => {
            detectBrowserLanguage();
            checkBannerVisibility();
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        watch(locale, () => {
            checkBannerVisibility();
        });

        return {
            isOpen,
            showBanner,
            showLanguagePrompt,
            languages,
            currentLanguage,
            detectedLanguage,
            dropdownPosition,
            dropdown,
            toggleDropdown,
            selectLanguage,
            closeBanner,
            confirmLanguage,
            switchToEnglish,
            t
        };
    }
});
</script>