<template>
  <footer class="mt-8 w-full">
    <div class="flex flex-col items-center justify-center space-y-4">
      <!-- Decorative Line -->
      <div class="w-32 h-[2px] bg-gradient-to-r from-blue-200/0 via-blue-400/50 to-blue-200/0"></div>

      <!-- Main Footer Content -->
      <div class="relative group px-6 py-2 rounded-xl">
        <!-- Frosted glass background for text -->
        <div class="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl"></div>

        <!-- Content -->
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

      <!-- Version and License -->
      <div class="flex items-center justify-center space-x-2 text-xs text-blue-400">
        <span>Version {{ version }}</span>
        <span>•</span>
        <button
          @click="showLicense = true"
          class="hover:text-blue-600 transition-colors underline-offset-2 hover:underline"
        >
          MIT License
        </button>
        <span>•</span>
        <a href="https://github.com/ActiVol" target="_blank" class="hover:text-blue-600 transition-colors">
          <Icon icon="akar-icons:github-fill" class="w-4 h-4 text-blue-400" />
          <!-- GitHub -->
        </a>
      </div>

      <!-- Debug Button -->
      <div class="flex items-center justify-center space-x-2 text-xs text-blue-400 mt-4">
        <button
          @click="toggleDebug"
          class="hover:text-blue-600 transition-colors underline-offset-2 hover:underline"
        >
          {{ debugEnabled ? 'Disable Debug' : 'Enable Debug' }}
        </button>
      </div>

      <!-- License Modal -->
      <el-dialog
        v-model="showLicense"
        title="MIT License"
        width="90%"
        max-width="600px"
        class="license-dialog"
      >
        <div class="text-sm text-gray-600 space-y-4">
          <p>Copyright (c) {{ new Date().getFullYear() }} kjch</p>
          <p>
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
          </p>
          <p>
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
          </p>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
      </el-dialog>
    </div>
  </footer>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
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
    const debugEnabled = ref(false);

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

    onMounted(() => {
      const debugStatus = localStorage.getItem('debugEnabled');
      if (debugStatus === 'true') {
        debugEnabled.value = true;
        if (!window.$pageSpy) {
          initializePageSpy();
        }
        debugEnabled.value = true;
        window.$pageSpy.render();
      }
    });

    return {
      version,
      showLicense,
      debugEnabled,
      toggleDebug
    };
  }
});
</script>

<style>
.license-dialog .el-dialog {
  border-radius: 1rem;
  overflow: hidden;
}

.license-dialog .el-dialog__header {
  margin: 0;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.license-dialog .el-dialog__body {
  padding: 1.5rem;
}
</style>