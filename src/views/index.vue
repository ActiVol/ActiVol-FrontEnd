<template>
    <Layout>
        <Breadcrumb :items="breadcrumbItems" currentPage="Home" />
        <div class="bg-amber-100 rounded-md px-4 py-3">
            <p class="text-gray-700">This is a small container content.</p>
            <!-- Boxes area -->
            <div class="grid grid-cols-1 gap-4 mt-4">
                <!-- <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-lg font-bold text-gray-800">Box 1</h2>
                    <p class="text-gray-700">This is the content for box 1.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-lg font-bold text-gray-800">Box 2</h2>
                    <p class="text-gray-700">This is the content for box 2.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <h2 class="text-lg font-bold text-gray-800">Box 3</h2>
                    <p class="text-gray-700">This is the content for box 3.</p>
                </div> -->

                <ListBox 
                    v-for="(item, index) in ListBox" 
                    :key="index" 
                    :icon="item.icon"
                    :title="item.title" 
                    :content="item.content" 
                    :path="item.path"
                />
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import ListBox from '../components/ListBox.vue';

export default defineComponent({
    name: 'IndexView',
    components: {
        Layout,
        Breadcrumb,
        ListBox,
    },
    data() {
        return {
            breadcrumbItems: [
                { label: 'Home', path: '/' },
                { label: 'SubPage', path: '/subpage' },
                { label: 'CurrentPage', path: '/current' },
            ],
            ListBox: [
                { icon: '/icon/PencilSquare.svg', title: 'Box 1', content: 'This is the content for box 1.', path: '/subpage' },
                { icon: '/icon/PencilSquare.svg', title: 'Box 2', content: 'This is the content for box 2.', path: '/box2' },
                { icon: '/icon/PencilSquare.svg', title: 'Box 3', content: 'This is the content for box 3.', path: '/box3' },
            ],
        };
    },
});
</script>