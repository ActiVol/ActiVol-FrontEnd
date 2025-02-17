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
import { defineComponent, ref } from 'vue';
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

    return {
      version,
      showLicense
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