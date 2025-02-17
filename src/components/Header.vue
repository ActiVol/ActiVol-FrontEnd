<template>
  <header class="w-full flex items-center justify-center mb-6">
    <router-link to="/"
                 class="bg-blue-600 text-white text-2xl font-bold py-3 px-8 rounded-2xl inline-block hover:bg-blue-700 transition-colors">
      {{ $t('app.title') }}
    </router-link>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>