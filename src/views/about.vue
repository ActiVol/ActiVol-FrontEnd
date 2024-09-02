<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <!-- <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-blue-600">志愿者时长记录系统</h1>
                <nav>
                    <a href="#" class="text-blue-600 hover:text-blue-800 mx-2">首页</a>
                    <a href="#" class="text-blue-600 hover:text-blue-800 mx-2">关于我们</a>
                </nav>
            </div>
        </header> -->

        <main class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-8">
                    <h2 class="text-3xl font-semibold text-blue-600 mb-6">关于我们的系统</h2>
                    <p class="text-gray-600 mb-4">
                        志愿者时长记录系统是为美国高中学生设计的专业平台，旨在帮助学生轻松记录和管理他们的志愿服务时间。我们的系统不仅简化了时间记录过程，还为学生提供了宝贵的数据分析和报告功能。
                    </p>
                    <p class="text-gray-600 mb-4">
                        通过使用我们的系统，学生可以：
                    </p>
                    <ul class="list-disc list-inside text-gray-600 mb-4 pl-4">
                        <li>轻松记录志愿服务时间和活动详情</li>
                        <li>查看个人志愿服务历史和统计数据</li>
                        <li>生成详细的志愿服务报告，用于大学申请</li>
                        <li>发现新的志愿服务机会</li>
                    </ul>
                </div>
            </div>

            <div class="mt-12">
                <h2 class="text-3xl font-semibold text-blue-600 mb-6">常见问题解答</h2>
                <div class="space-y-4">
                    <div v-for="(qa, index) in faqs" :key="index"
                        class="border border-blue-200 rounded-lg overflow-hidden">
                        <button @click="toggleFaq(index)"
                            class="w-full text-left px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 flex justify-between items-center">
                            <span class="text-lg font-medium text-blue-800">{{ qa.question }}</span>
                            <svg class="w-6 h-6 text-blue-600 transform transition-transform duration-200"
                                :class="{ 'rotate-180': qa.isOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div v-show="qa.isOpen" class="px-6 py-4 bg-white">
                            <p class="text-gray-600">{{ qa.answer }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- <footer class="bg-blue-600 text-white mt-16">
            <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; 2023 志愿者时长记录系统. 保留所有权利.</p>
            </div>
        </footer> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'QAAndIntroduction',
    setup() {
        const faqs = ref([
            {
                question: "如何开始使用志愿者时长记录系统？",
                answer: "首先，您需要注册一个账户。注册后，您可以立即开始记录您的志愿服务时间和活动。我们提供了直观的界面，引导您完成每一步。",
                isOpen: false
            },
            {
                question: "系统是否可以生成报告用于大学申请？",
                answer: "是的，我们的系统可以生成详细的志愿服务报告，包括总服务时间、参与的项目类型以及您的贡献概述。这些报告可以直接用于您的大学申请。",
                isOpen: false
            },
            {
                question: "我可以编辑或删除已记录的志愿服务时间吗？",
                answer: "当然可以。您可以随时编辑或删除您的记录。但请注意，为了保持记录的准确性，某些更改可能需要管理员审核。",
                isOpen: false
            },
            {
                question: "系统是否提供移动应用？",
                answer: "目前，我们的系统是一个响应式网页应用，可以在任何设备上使用。我们正在考虑开发专门的移动应用，敬请期待！",
                isOpen: false
            }
        ])

        const toggleFaq = (index: number) => {
            faqs.value[index].isOpen = !faqs.value[index].isOpen
        }

        return {
            faqs,
            toggleFaq
        }
    }
})
</script>