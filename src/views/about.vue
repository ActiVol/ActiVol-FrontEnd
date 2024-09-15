<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-blue-600">志愿者时长记录系统</h1>
                <nav>
                    <router-link to="/" class="text-blue-600 hover:text-blue-800 mx-2">首页</router-link>
                    <router-link to="/about" class="text-blue-600 hover:text-blue-800 mx-2">关于我们</router-link>
                </nav>
            </div>
        </header>

        <main class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
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

            <div class="mb-8">
                <h2 class="text-3xl font-semibold text-blue-600 mb-6">帮助 & 常见问题</h2>
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex" aria-label="Tabs">
                            <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = tab.id" :class="[
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
                            ]">
                                {{ tab.name }}
                            </button>
                        </nav>
                    </div>
                    <div class="p-4">
                        <div v-if="activeTab === 'faq'" class="space-y-4">
                            <div v-for="(qa, index) in faqs" :key="index"
                                class="border border-blue-200 rounded-lg overflow-hidden">
                                <button @click="toggleFaq(index)"
                                    class="w-full text-left px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 flex justify-between items-center">
                                    <span class="text-lg font-medium text-blue-800">{{ qa.question }}</span>
                                    <Icon :icon="qa.isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                        class="w-6 h-6 text-blue-600" />
                                </button>
                                <div v-show="qa.isOpen" class="px-6 py-4 bg-white">
                                    <p class="text-gray-600">{{ qa.answer }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="activeTab === 'usage'" class="prose">
                            <h3 class="text-xl font-semibold mb-4">使用指南</h3>
                            <ol class="list-decimal list-inside">
                                <li class="mb-2">注册账户或登录</li>
                                <li class="mb-2">在仪表板上点击"记录时间"</li>
                                <li class="mb-2">填写志愿服务详情并提交</li>
                                <li class="mb-2">查看您的服务历史和统计数据</li>
                                <li>需要帮助时，请联系我们的支持团队</li>
                            </ol>
                        </div>
                        <div v-else-if="activeTab === 'contact'" class="prose">
                            <h3 class="text-xl font-semibold mb-4">联系我们</h3>
                            <p>如果您有任何问题或需要帮助，请通过以下方式联系我们：</p>
                            <ul class="list-disc list-inside">
                                <li>一些文本</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div class="p-8">
                    <h2 class="text-3xl font-semibold text-blue-600 mb-6">开发者介绍</h2>
                    <p class="text-gray-600 mb-4">
                        我们的开发团队由热情的程序员和设计师组成，致力于为高中生创造最佳的志愿服务跟踪体验。
                    </p>
                    <div class="flex items-center mb-4">
                        <img src="https://avatars.githubusercontent.com/u/49981661?v=4" alt="Developer" class="w-16 h-16 rounded-full mr-4" />
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">kjch</h3>
                            <p class="text-gray-600">首席开发者</p>
                        </div>
                    </div>
                    <p class="text-gray-600">
                        拥有多年的 Web 开发经验，专注于创建用户友好和高效的应用程序。
                    </p>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div class="p-8">
                    <h2 class="text-3xl font-semibold text-blue-600 mb-6">开源仓库</h2>
                    <p class="text-gray-600 mb-4">
                        我们的项目是开源的！您可以在 GitHub 上查看我们的代码，参与开发，或者提出建议。
                    </p>
                    <a href="https://github.com/1834423612/test-v" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        <Icon icon="mdi:github" class="w-5 h-5 mr-2" />
                        访问 GitHub 仓库
                    </a>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <UpdateInfo />
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Icon } from '@iconify/vue'
import UpdateInfo from '@/components/UpdateInfo.vue'

export default defineComponent({
    name: 'AboutPage',
    components: {
        Icon,
        UpdateInfo,
    },
    setup() {
        const activeTab = ref('faq')
        const tabs = [
            { id: 'faq', name: '常见问题' },
            { id: 'usage', name: '使用指南' },
            { id: 'contact', name: '联系我们' },
        ]

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
            activeTab,
            tabs,
            faqs,
            toggleFaq
        }
    }
})
</script>