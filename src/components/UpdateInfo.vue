<template>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-8">
            <h2 class="text-3xl font-semibold text-blue-600 mb-6">更新信息</h2>
            <div class="mb-4">
                <div class="flex border-b border-gray-200">
                    <button v-for="tab in tabs" :key="tab.id" :class="[
                        activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    ]" @click="activeTab = tab.id">
                        {{ tab.name }}
                    </button>
                </div>
            </div>

            <div v-if="activeTab === 'updates'">
                <p class="text-gray-600 mb-4">
                    当前版本：v{{ version }}
                </p>
                <p class="text-gray-600 mb-4">
                    构建号：{{ commitHash }}
                </p>
                <h3 class="text-xl font-semibold text-gray-800 mb-4">最近更新</h3>
                <div class="relative ml-4">
                    <div class="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                    <ul class="space-y-6 relative">
                        <li v-for="(update, index) in recentUpdates" :key="index" class="ml-6">
                            <div class="absolute -left-3 mt-1.5">
                                <span
                                    class="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                    <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </span>
                            </div>
                            <div
                                class="flex flex-col bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="text-lg font-medium text-gray-900">{{ update.message }}</h4>
                                    <a :href="update.url" target="_blank" rel="noopener noreferrer"
                                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-300">
                                        {{ update.sha.substring(0, 7) }}
                                        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                                <div class="flex flex-wrap items-center text-sm text-gray-500">
                                    <span class="mr-4">{{ formatDate(update.date) }}</span>
                                    <span class="mr-4">
                                        <svg class="inline-block h-4 w-4 mr-1" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {{ update.author }}
                                    </span>
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <svg class="mr-1.5 h-2 w-2 text-green-400" fill="currentColor"
                                            viewBox="0 0 8 8">
                                            <circle cx="4" cy="4" r="3" />
                                        </svg>
                                        master
                                    </span>
                                    <span :class="[
                                        'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                        update.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    ]">
                                        {{ update.verified ? 'Verified Signature' : 'Unverified Signature' }}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="activeTab === 'dependencies'">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">生产依赖</h3>
                <table class="min-w-full divide-y divide-gray-200 mb-8">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                包名</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                版本</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(dep, index) in dependencies.production" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ dep.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ dep.version }}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="text-xl font-semibold text-gray-800 mb-4">开发依赖</h3>
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                包名</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                版本</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(dep, index) in dependencies.development" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ dep.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ dep.version }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

interface Dependency {
    name: string
    version: string
}

interface DependencyGroup {
    production: Dependency[]
    development: Dependency[]
}

interface Commit {
    sha: string
    message: string
    date: string
    url: string
    author: string
    verified: boolean
}

export default defineComponent({
    name: 'UpdateInfo',
    setup() {
        const activeTab = ref<'updates' | 'dependencies'>('updates')
        const version = ref<string>('')
        const commitHash = ref<string>('')
        const recentUpdates = ref<Commit[]>([])
        const dependencies = ref<DependencyGroup>({ production: [], development: [] })

        const tabs: { id: 'updates' | 'dependencies', name: string }[] = [
            { id: 'updates', name: '最近更新' },
            { id: 'dependencies', name: '系统依赖' },
        ]

        const formatDate = (dateString: string): string => {
            const date = new Date(dateString)
            return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
        }

        onMounted(async () => {
            try {
                // Fetch version from package.json
                const packageResponse = await fetch('/package.json')
                const packageData = await packageResponse.json()
                version.value = packageData.version

                // Fetch recent commits from GitHub API (master branch only)
                const githubResponse = await axios.get('https://api.github.com/repos/1834423612/test-v/commits?sha=master')
                commitHash.value = githubResponse.data[0].sha.substring(0, 7)

                // Process commits
                recentUpdates.value = githubResponse.data.slice(0, 5).map((commit: any) => ({
                    sha: commit.sha,
                    message: commit.commit.message,
                    date: commit.commit.author.date,
                    url: commit.html_url,
                    author: commit.commit.author.name,
                    verified: commit.commit.verification.verified
                }))

                // Set dependencies
                dependencies.value = {
                    production: Object.entries(packageData.dependencies).map(([name, version]) => ({ name, version: version as string })),
                    development: Object.entries(packageData.devDependencies).map(([name, version]) => ({ name, version: version as string }))
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        })

        return {
            activeTab,
            version,
            commitHash,
            recentUpdates,
            dependencies,
            tabs,
            formatDate
        }
    }
})
</script>