<template>
    <div class="space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Add New Activity</h2>
            <form @submit.prevent="addActivity" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input v-model="newActivity.name" type="text" placeholder="Activity Name"
                        class="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary" required>
                    <input v-model="newActivity.date" type="date"
                        class="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary" required>
                    <input v-model="newActivity.hours" type="number" placeholder="Hours"
                        class="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary" required>
                    <textarea v-model="newActivity.description" placeholder="Description"
                        class="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary"
                        required></textarea>
                </div>
                <button type="submit"
                    class="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition duration-200">Add
                    Activity</button>
            </form>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Activity List</h2>
            <table class="w-full">
                <thead>
                    <tr class="bg-gray-100 rounded-lg">
                        <th class="p-2 text-left rounded-tl-lg">Name</th>
                        <th class="p-2 text-left">Date</th>
                        <th class="p-2 text-left">Hours</th>
                        <th class="p-2 text-left">Status</th>
                        <th class="p-2 text-left rounded-tr-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="activity in activities" :key="activity.id" class="border-b">
                        <td class="p-2">{{ activity.name }}</td>
                        <td class="p-2">{{ activity.date }}</td>
                        <td class="p-2">{{ activity.hours }}</td>
                        <td class="p-2">
                            <span :class="activity.status === 'Approved' ? 'text-secondary' : 'text-accent'">
                                {{ activity.status }}
                            </span>
                        </td>
                        <td class="p-2">
                            <button class="text-primary hover:text-primary-dark mr-2 transition duration-200">
                                <Icon icon="mdi:pencil" />
                            </button>
                            <button class="text-accent hover:text-accent-dark transition duration-200">
                                <Icon icon="mdi:delete" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

interface Activity {
    id: number
    name: string
    date: string
    hours: number
    status: string
    description?: string
}

const activities = ref<Activity[]>([])
const newActivity = ref<Omit<Activity, 'id' | 'status'>>({
    name: '',
    date: '',
    hours: 0,
    description: '',
})

const fetchActivities = () => {
    // Simulate API call to fetch activities
    setTimeout(() => {
        activities.value = [
            { id: 1, name: 'Beach Cleanup', date: '2023-06-15', hours: 4, status: 'Approved' },
            { id: 2, name: 'Food Drive', date: '2023-06-20', hours: 3, status: 'Pending' },
            { id: 3, name: 'Tree Planting', date: '2023-06-25', hours: 5, status: 'Approved' },
        ]
    }, 1000)
}

const addActivity = () => {
    // Simulate API call to add new activity
    activities.value.push({
        id: activities.value.length + 1,
        ...newActivity.value,
        status: 'Pending',
    })
    newActivity.value = { name: '', date: '', hours: 0, description: '' }
}

onMounted(fetchActivities)
</script>

<style scoped>
.bg-secondary {
    background-color: var(--secondary-color);
}

.bg-secondary-dark {
    background-color: #27ae60;
}

.text-secondary {
    color: var(--secondary-color);
}

.text-accent {
    color: var(--accent-color);
}

.text-primary {
    color: var(--primary-color);
}

.text-primary-dark {
    color: #2980b9;
}

.text-accent-dark {
    color: #c0392b;
}
</style>