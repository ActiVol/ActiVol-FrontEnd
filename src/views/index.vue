<template>
    <Layout>
        <!-- <Breadcrumb :items="breadcrumbItems" currentPage="Home" /> -->
        <div class="bg-amber-100 rounded-md px-4 py-3 w-full">
            <p class="text-gray-700">This is a small container content.</p>
            <!-- Boxes area -->
            <div class="grid grid-cols-1 gap-4 mt-4">
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
// import Breadcrumb from '../components/Breadcrumb.vue';
import ListBox from '../components/ListBox.vue';

export default defineComponent({
    name: 'IndexView',
    components: {
        Layout,
        // Breadcrumb,
        ListBox,
    },
    data() {
        return {
            // breadcrumbItems: [
            //     { label: 'Home', path: '/' },
            // ],
            ListBox: [
                { icon: '/icon/PencilSquare.svg', title: 'Box 1', content: 'This is the content for box 1.', path: '/subpage' },
                { icon: '/icon/PencilSquare.svg', title: 'test', content: 'This is the content for box 2.', path: '/test' },
                { icon: '/icon/PencilSquare.svg', title: 'Details', content: 'This is the content for box 3.', path: '/details' },
                { icon: '/icon/PencilSquare.svg', title: 'Activities Self-submission', content: 'This is the content for box 4.', path: '/self-submission' },
                { icon: '/icon/PencilSquare.svg', title: 'About', content: 'This is the content for box 5.', path: '/about' },
            ],
        };
    },
});
</script>