<template>
    <div class="bg-sky-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Tab Navigation -->
            <nav class="flex justify-center mb-8" aria-label="Tabs">
                <div class="bg-white rounded-full shadow-lg p-1">
                    <button v-for="tab in tabs" :key="tab.name" @click="selectTab(tab)"
                        class="rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none"
                        :class="getTabClasses(tab)" :aria-current="tab.current ? 'page' : undefined">
                        {{ tab.name }}
                    </button>
                </div>
            </nav>

            <!-- Content section -->
            <div class="bg-white shadow-xl rounded-lg p-8">
                <component :is="currentTabComponent"></component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import About from './About.vue';

interface Tab {
    name: string;
    component: any;
    current: boolean;
    color: string;
}

const tabs = ref<Tab[]>([
    { name: 'About', component: About, current: true, color: 'blue' },
    // { name: 'Members', component: Members, current: false, color: 'green' },
    // { name: 'Gallery', component: Gallery, current: false, color: 'yellow' },
    //     { name: 'Billing', component: Billing, current: false, color: 'red' },
]);

const getTabClasses = (tab: Tab) => {
    if (tab.current) {
        return {
            'text-white shadow-md': true,
            'bg-blue-500': tab.color === 'blue',
            'bg-green-500': tab.color === 'green',
            'bg-yellow-500': tab.color === 'yellow',
            'bg-red-500': tab.color === 'red',
        };
    } else {
        return {
            'bg-white': true,
            'text-gray-500': true,
            'hover:text-blue-600': tab.color === 'blue',
            'hover:text-green-600': tab.color === 'green',
            'hover:text-yellow-600': tab.color === 'yellow',
            'hover:text-red-600': tab.color === 'red',
        };
    }
};

const currentTabComponent = ref(tabs.value.find(tab => tab.current)?.component);

const selectTab = (selectedTab: Tab) => {
    tabs.value.forEach(tab => tab.current = tab === selectedTab);
    currentTabComponent.value = selectedTab.component;
};
</script>
