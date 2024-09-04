<template>
    <div>
        <!-- Tab Navigation -->
        <div class="bg-white shadow-md mt-4 rounded-lg mx-4 sm:mx-8 lg:mx-16">
            <nav class="flex justify-center space-x-4 p-4" aria-label="Tabs">
                <button v-for="tab in tabs" :key="tab.name" @click="selectTab(tab)"
                    :class="[tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']"
                    :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</button>
            </nav>
        </div>

        <!-- Content section -->
        <div class="mt-8 bg-white shadow-md p-6 rounded-lg mx-4 sm:mx-8 lg:mx-16">
            <component :is="currentTabComponent"></component>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import About from './About.vue';

const tabs = ref([
    { name: 'About', component: About, current: true },
]);

const currentTabComponent = ref(tabs.value.find(tab => tab.current).component);

const selectTab = (selectedTab) => {
    tabs.value.forEach(tab => tab.current = false);
    selectedTab.current = true;
    currentTabComponent.value = selectedTab.component;
};
</script>
