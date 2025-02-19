<template>
  <footer class="mt-8 w-full">
    <div class="flex flex-col items-center justify-center space-y-2 px-4">
      <!-- Decorative Line -->
      <div class="w-32 h-[2px] bg-gradient-to-r from-blue-200/0 via-blue-400/50 to-blue-200/0"></div>

      <!-- Main Footer Content -->
      <div class="relative group px-4 py-1 rounded-xl">
        <div class="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl"></div>
        <div class="relative flex items-center justify-center space-x-1.5">
          <span class="text-sm font-medium text-blue-600">Made with</span>
          <div class="relative group/heart">
            <Icon
              icon="lucide:heart"
              class="w-4 h-4 text-red-400 transform transition-all duration-300 group-hover/heart:scale-110 group-hover/heart:text-red-500"
            />
            <div class="absolute -inset-1 bg-red-100 rounded-full opacity-0 group-hover/heart:opacity-30 group-hover/heart:animate-ping"></div>
          </div>
          <span class="text-sm font-medium text-blue-600">by</span>
          <a
            href="#"
            class="relative text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
          >
            kjch
            <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover/link:w-full"></span>
          </a>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="flex flex-wrap justify-center items-center gap-2 text-xs">
        <div class="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <button
            @click="showLicense = true"
            class="text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1"
          >
            <Icon icon="lucide:scroll" class="w-4 h-4" />
            <span class="text-xs">MIT License</span>
          </button>
          <span class="text-blue-300">•</span>
          <a
            href="https://github.com/ActiVol"
            target="_blank"
            class="text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1"
          >
            <Icon icon="lucide:github" class="w-4 h-4" />
            <span class="text-xs">GitHub</span>
          </a>
        </div>
        <div class="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <Icon icon="lucide:tag" class="w-4 h-4 text-blue-600" />
          <span class="text-blue-600 text-xs">v{{ version }}</span>
          <!-- v-if="isDevelopment" -->
          <span class="text-blue-300">•</span>
          <button
            @click="showDebugTools = true"
            class="text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1"
          >
            <Icon icon="lucide:settings" class="w-4 h-4" />
            <span class="text-xs">Debug Tools</span>
          </button>
        </div>
      </div>

      <!-- License Modal -->
      <div v-if="showLicense" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showLicense = false">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

          <div class="relative bg-white rounded-xl shadow-lg max-w-3xl w-full mx-auto">
            <div class="flex items-center justify-between p-4 border-b">
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:scale" class="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">MIT License</h3>
                  <p class="text-sm text-gray-500">ActiVol/ActiVol-FrontEnd is licensed under the MIT License</p>
                </div>
              </div>
              <button
                @click="showLicense = false"
                class="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Icon icon="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <div class="p-4 space-y-6">
              <!-- License Summary -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-yellow-50 rounded-lg border-2 border-dotted border-pink-500">
                <div class="space-y-2">
                  <h4 class="font-bold text-gray-900">Permissions</h4>
                  <ul class="space-y-1">
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:check" class="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Commercial use</span>
                    </li>
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:check" class="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Modification</span>
                    </li>
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:check" class="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Distribution</span>
                    </li>
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:check" class="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Private use</span>
                    </li>
                  </ul>
                </div>
                <div class="space-y-2">
                  <h4 class="font-bold text-gray-900">Limitations</h4>
                  <ul class="space-y-1">
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:x" class="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>Liability</span>
                    </li>
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:x" class="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>Warranty</span>
                    </li>
                  </ul>
                </div>
                <div class="space-y-2">
                  <h4 class="font-bold text-gray-900">Conditions</h4>
                  <ul class="space-y-1">
                    <li class="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon icon="lucide:info" class="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>License and copyright notice</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- License Text -->
              <div class="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-cyan-500">
                <div v-if="licenseContent" class="whitespace-pre-wrap text-sm text-gray-600">{{ licenseContent }}</div>
                <div v-else class="flex justify-center py-8">
                  <Icon icon="lucide:loader-2" class="w-6 h-6 animate-spin text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Debug Tools Modal -->
      <div v-if="showDebugTools" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showDebugTools = false">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

          <div class="relative bg-white rounded-xl shadow-lg max-w-2xl w-full mx-auto">
            <div class="flex items-center justify-between p-4 border-b">
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:settings" class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-900">Debug Tools</h3>
              </div>
              <button
                @click="showDebugTools = false"
                class="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Icon icon="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <!-- Warning Message -->
            <div class="p-4 bg-yellow-50 border-b border-yellow-100">
              <div class="flex items-start space-x-3">
                <Icon icon="lucide:alert-triangle" class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div class="text-sm text-yellow-700">
                  <p class="font-medium">警告：请在指导下使用调试工具</p>
                  <p class="mt-1">私自使用可能会导致未知异常。请确保您了解每个操作的影响。</p>
                </div>
              </div>
            </div>

            <div class="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              <!-- PageSpy Toggle -->
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="space-y-1">
                  <h4 class="font-medium text-gray-900">PageSpy</h4>
                  <p class="text-sm text-gray-500">Enable page inspection and debugging</p>
                </div>
                <button
                  @click="toggleDebug"
                  class="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs transition-all"
                  :class="debugEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                >
                  <Icon
                    :icon="debugEnabled ? 'lucide:check-circle' : 'lucide:circle'"
                    class="w-4 h-4"
                  />
                  <span>{{ debugEnabled ? 'Enabled' : 'Disabled' }}</span>
                </button>
              </div>

              <!-- Clear Cache and Reload -->
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="space-y-1">
                  <h4 class="font-medium text-gray-900">Clear Cache</h4>
                  <p class="text-sm text-gray-500">Clear all cache and reload page</p>
                </div>
                <button
                  @click="clearCacheAndReload"
                  class="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs hover:bg-red-200 transition-colors"
                >
                  Clear & Reload
                </button>
              </div>

              <!-- Local Storage Viewer -->
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="space-y-1">
                  <h4 class="font-medium text-gray-900">Local Storage</h4>
                  <p class="text-sm text-gray-500">View and manage local storage</p>
                </div>
                <button
                  @click="showLocalStorage = true"
                  class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                >
                  View
                </button>
              </div>

              <!-- Cookie Viewer -->
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="space-y-1">
                  <h4 class="font-medium text-gray-900">Cookies</h4>
                  <p class="text-sm text-gray-500">View and manage cookies</p>
                </div>
                <button
                  @click="showCookies = true"
                  class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                >
                  View
                </button>
              </div>

              <!-- Browser Info -->
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="space-y-1">
                  <h4 class="font-medium text-gray-900">Browser Information</h4>
                  <p class="text-sm text-gray-500">View detailed browser information</p>
                </div>
                <button
                  @click="showBrowserInfo = true"
                  class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                >
                  View
                </button>
              </div>
            </div>

            <!-- IP Information Footer -->
            <div class="p-4 border-t bg-gray-50">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="flex items-center justify-between">
                  <div class="flex items-center justify-start w-full">
                    <span class="text-gray-500">IPv4:</span>
                    <span class="text-gray-900 ml-2">{{ ipv4 || '无信息' }}</span>
                    <button @click="copyToClipboard(ipv4)" class="text-blue-600 hover:text-blue-700 transition-colors ml-2">
                      <Icon :icon="ipv4CopyIcon" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center justify-start w-full">
                    <span class="text-gray-500">IPv6:</span>
                    <span class="text-gray-900 ml-2 truncate max-w-fit">{{ ipv6 || '无信息' }}</span>
                    <button @click="copyToClipboard(ipv6)" class="text-blue-600 hover:text-blue-700 transition-colors ml-2">
                      <Icon :icon="ipv6CopyIcon" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Local Storage Modal -->
      <div v-if="showLocalStorage" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showLocalStorage = false">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

          <div class="relative bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
            <div class="flex items-center justify-between p-4 border-b">
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:database" class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-900">Local Storage</h3>
              </div>
              <button
                @click="showLocalStorage = false"
                class="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Icon icon="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <div class="p-4">
              <div class="bg-gray-50 rounded-lg p-4 max-h-[60vh] overflow-y-auto">
                <div v-for="(value, key) in localStorageItems" :key="key" class="flex items-start justify-between py-2">
                  <div class="space-y-1 flex-1 min-w-0">
                    <div class="font-medium text-gray-900 break-all">{{ key }}</div>
                    <div class="text-sm text-gray-500 break-all">{{ value }}</div>
                  </div>
                  <button
                    @click="removeLocalStorageItem(key)"
                    class="ml-4 p-1 text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <Icon icon="lucide:trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cookies Modal -->
      <div v-if="showCookies" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showCookies = false">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

          <div class="relative bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
            <div class="flex items-center justify-between p-4 border-b">
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:cookie" class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-900">Cookies</h3>
              </div>
              <button
                @click="showCookies = false"
                class="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Icon icon="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <div class="p-4">
              <div class="bg-gray-50 rounded-lg p-4 max-h-[60vh] overflow-y-auto">
                <div v-for="cookie in cookies" :key="cookie.name" class="flex items-start justify-between py-2">
                  <div class="space-y-1 flex-1 min-w-0">
                    <div class="font-medium text-gray-900 break-all">{{ cookie.name }}</div>
                    <div class="text-sm text-gray-500 break-all">{{ cookie.value }}</div>
                  </div>
                  <button
                    @click="confirmDeleteCookie(cookie.name)"
                    class="ml-4 p-1 text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <Icon icon="lucide:trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Cookie Confirmation Modal -->
      <div v-if="showDeleteCookieConfirm" class="fixed inset-0 z-[60] overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>

          <div class="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div class="p-6 space-y-4">
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:alert-triangle" class="w-6 h-6 text-yellow-500" />
                <h3 class="text-lg font-semibold text-gray-900">确认删除</h3>
              </div>
              <p class="text-sm text-gray-600">
                您确定要删除这个 Cookie 吗？此操作无法撤销，可能会影响网站的某些功能。
              </p>
              <div class="flex justify-end space-x-3">
                <button
                  @click="showDeleteCookieConfirm = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  @click="deleteCookie"
                  class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Browser Info Modal -->
      <div v-if="showBrowserInfo" class="fixed inset-0 z-50 overflow-y-auto" @click.self="showBrowserInfo = false">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div class="relative bg-white rounded-xl shadow-lg max-w-2xl w-full mx-auto">
            <div class="flex items-center justify-between p-4 border-b">
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:info" class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-900">Browser Information</h3>
              </div>
              <button
                @click="showBrowserInfo = false"
                class="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Icon icon="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <div class="p-4 max-h-[60vh] overflow-y-auto">
              <div v-if="browserInfo" class="space-y-4">
                <div v-for="(value, key) in browserInfo" :key="key" class="bg-gray-50 p-3 rounded-lg">
                  <h4 class="font-medium text-gray-900 capitalize">{{ key }}</h4>
                  <p class="mt-1 text-sm text-gray-600">{{ value }}</p>
                </div>
              </div>
              <div v-else class="flex justify-center py-8">
                <Icon icon="lucide:loader-2" class="w-6 h-6 animate-spin text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { Icon } from '@iconify/vue';
import pkg from '../../package.json';

export default defineComponent({
  name: 'Footer',
  components: {
    Icon
  },
  setup() {
    const version = ref(pkg.version);
    const showLicense = ref(false);
    const showDebugTools = ref(false);
    const showLocalStorage = ref(false);
    const showCookies = ref(false);
    const showBrowserInfo = ref(false);
    const showDeleteCookieConfirm = ref(false);
    const debugEnabled = ref(false);
    const licenseContent = ref('');
    const localStorageItems = ref({});
    const cookies = ref([]);
    const cookieToDelete = ref('');
    const browserInfo = ref(null);
    const ipv4 = ref('');
    const ipv6 = ref('');
    const ipv4CopyIcon = ref('lucide:copy');
    const ipv6CopyIcon = ref('lucide:copy');

    const isDevelopment = computed(() => import.meta.env.MODE === 'development');

    const fetchLicense = async () => {
      try {
        // GitHub raw content URL: https://raw.githubusercontent.com/ActiVol/ActiVol-FrontEnd/refs/heads/master/LICENSE
        const response = await fetch('https://cdn.jsdelivr.net/gh/ActiVol/ActiVol-FrontEnd@refs/heads/master/LICENSE');
        const text = await response.text();
        licenseContent.value = text;
      } catch (error) {
        console.error('Failed to fetch license:', error);
        licenseContent.value = 'Failed to load license content. Please try again later.';
      }
    };

    const updateLocalStorageItems = () => {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = localStorage.getItem(key);
      }
      localStorageItems.value = items;
    };

    const removeLocalStorageItem = (key) => {
      localStorage.removeItem(key);
      updateLocalStorageItems();
    };

    const updateCookies = () => {
      cookies.value = document.cookie.split(';').map(cookie => {
        const [name, value] = cookie.trim().split('=');
        return { name, value };
      }).filter(cookie => cookie.name);
    };

    const confirmDeleteCookie = (name) => {
      cookieToDelete.value = name;
      showDeleteCookieConfirm.value = true;
    };

    const deleteCookie = () => {
      document.cookie = `${cookieToDelete.value}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      showDeleteCookieConfirm.value = false;
      updateCookies();
    };

    const clearCacheAndReload = async () => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        await caches.keys().then(keys => {
          return Promise.all(keys.map(key => caches.delete(key)));
        });
        window.location.reload(true);
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    };

    const initializePageSpy = () => {
      if (!window.$harbor) {
        window.$harbor = new DataHarborPlugin();
        PageSpy.registerPlugin(window.$harbor);
      }

      if (!window.$rrweb) {
        window.$rrweb = new RRWebPlugin();
        PageSpy.registerPlugin(window.$rrweb);
      }

      window.$pageSpy = new PageSpy({
        api: 'report.makesome.cool',
        clientOrigin: 'https://report.makesome.cool',
        autoRender: false,
        enableSSL: true,
        project: 'ActiVol_Index',
        title: 'PROD',
        logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSIjNTM1MzUzIiBkPSJNMyA2YTMgMyAwIDAgMSAzLTNoOGEzIDMgMCAwIDEgMyAzdjIuMDNhNC41IDQuNSAwIDAgMC0xLS4wMDRWN0g0djdhMiAyIDAgMCAwIDIgMmgzLjQ5MmEyLjUgMi41IDAgMCAwLS40NDMgMUg2YTMgMyAwIDAgMS0zLTN6bTEwLjA0NCAzLjU4N2wtMS40NC0xLjQ0YS41LjUgMCAwIDAtLjcwOC43MDdsMS41NzggMS41NzdxLjIzMi0uNDQ3LjU3LS44NDRtLTMuOTQtLjczM2EuNS41IDAgMSAwLS43MDgtLjcwOGwtMi41IDIuNWEuNS41IDAgMCAwIDAgLjcwOGwyLjUgMi41YS41LjUgMCAwIDAgLjcwOC0uNzA4TDYuOTU3IDExem03Ljc4OC4xN2MuMzY2LjA0Mi40NzEuNDguMjEuNzQybC0uOTc1Ljk3NWExLjUwNyAxLjUwNyAwIDEgMCAyLjEzMiAyLjEzMmwuOTc1LS45NzVjLjI2MS0uMjYxLjctLjE1Ni43NDIuMjFhMy41MTggMy41MTggMCAwIDEtNC42NzYgMy43MjNsLTIuNzI2IDIuNzI3YTEuNTA3IDEuNTA3IDAgMSAxLTIuMTMyLTIuMTMybDIuNzI2LTIuNzI2YTMuNTE4IDMuNTE4IDAgMCAxIDMuNzI0LTQuNjc2Ii8+PC9zdmc+',
        logoStyle: {
          width: '10%',
          height: '10%',
        },
      });
    };

    const toggleDebug = () => {
      if (!window.$pageSpy) {
        initializePageSpy();
      }

      if (debugEnabled.value) {
        window.$pageSpy.abort();
        console.log('[PageSpy] [LOG]  Render aborted');
        localStorage.setItem('debugEnabled', 'false');
      } else {
        window.$pageSpy.render();
        localStorage.setItem('debugEnabled', 'true');
        initializePageSpy();
        window.$pageSpy.updateRoomInfo({
          project: 'ActiVol_Index',
          title: 'PROD',
        });
      }
      debugEnabled.value = !debugEnabled.value;
    };

    const fetchIPs = async () => {
      try {
        const ipv4Response = await fetch('https://api.ipify.org?format=json');
        if (ipv4Response.ok) {
          const data = await ipv4Response.json();
          ipv4.value = data.ip;
        } else {
          console.error('[Debug Tools] Error fetching IPv4 address:', ipv4Response.statusText);
        }
      } catch (error) {
        console.error('[Debug Tools] Error fetching IPv4 address:', error);
      }

      try {
        const ipv6Response = await fetch('https://api6.ipify.org?format=json');
        if (ipv6Response.ok) {
          const data = await ipv6Response.json();
          ipv6.value = data.ip;
        } else {
          console.error('[Debug Tools] Error fetching IPv6 address:', ipv6Response.statusText);
        }
      } catch (error) {
        console.error('[Debug Tools] Error fetching IPv6 address:', error);
      }
    };

    const loadBrowserInfo = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/browser-tool@1.3.2/dist/browser.min.js';
        script.async = true;

        script.onload = async () => {
          browserInfo.value = await window.browser.getInfo();
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading browser info:', error);
        browserInfo.value = {
          browser: 'Unknown',
          version: 'Unknown',
          system: 'Unknown',
          device: 'Unknown'
        };
      }
    };

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        const icon = text === ipv4.value ? ipv4CopyIcon : ipv6CopyIcon;
        icon.value = 'lucide:check';
        setTimeout(() => {
          icon.value = 'lucide:copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    watch(showLicense, (newVal) => {
      if (newVal && !licenseContent.value) {
        fetchLicense();
      }
    });

    watch(showLocalStorage, (newVal) => {
      if (newVal) {
        updateLocalStorageItems();
      }
    });

    watch(showCookies, (newVal) => {
      if (newVal) {
        updateCookies();
      }
    });

    watch(showDebugTools, (newVal) => {
      if (newVal) {
        fetchIPs();
      }
    });

    watch(showBrowserInfo, (newVal) => {
      if (newVal && !browserInfo.value) {
        loadBrowserInfo();
      }
    });

    onMounted(() => {
      const debugStatus = localStorage.getItem('debugEnabled');
      if (debugStatus === 'true') {
        debugEnabled.value = true;
        if (!window.$pageSpy) {
          initializePageSpy();
        }
        window.$pageSpy.render();
      }
    });

    return {
      version,
      showLicense,
      showDebugTools,
      showLocalStorage,
      showCookies,
      showBrowserInfo,
      showDeleteCookieConfirm,
      debugEnabled,
      licenseContent,
      localStorageItems,
      cookies,
      browserInfo,
      ipv4,
      ipv6,
      ipv4CopyIcon,
      ipv6CopyIcon,
      isDevelopment,
      toggleDebug,
      clearCacheAndReload,
      removeLocalStorageItem,
      confirmDeleteCookie,
      deleteCookie,
      copyToClipboard
    };
  }
});
</script>
