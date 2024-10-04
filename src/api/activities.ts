import { ref } from 'vue'

interface Activity {
    id: number;
    title: string;
    date?: string; // 将 date 属性设为可选
    dates: { date: string; duration: number; participants?: number }[]; // dates 属性是必需的
    location: string;
    categories: string[]; // categories 属性是必需的
    posterUrl?: string;
    organizer: string;
    organizerEmail: string;
    content: string;
}

const activities = ref<Activity[]>([
    {
        id: 1,
        title: '社区清洁日',
        dates: [
            { date: '2023-06-15T09:00', duration: 3, participants: 16 },
            { date: '2024-10-04T20:00', duration: 3, participants: 100 }
        ],
        location: '阳光社区公园',
        categories: ['环保', '社区服务'],
        posterUrl: 'https://placehold.co/300x600/skyblue/white',
        organizer: '张三',
        organizerEmail: 'zhangsan@example.com',
        content: '<p>让我们一起为我们的社区环境贡献力量！我们将在阳光社区公园进行清洁活动，清理垃圾，美化环境。</p>'
    },
    {
        id: 2,
        title: '儿童读书会',
        dates: [
            { date: '2023-06-20T14:00', duration: 2 }
        ],
        location: '市图书馆',
        categories: ['教育', '文化艺术'],
        organizer: '李四',
        organizerEmail: 'lisi@example.com',
        content: '<p>为儿童举办的读书会，旨在培养孩子们的阅读兴趣和能力。我们将阅读精选的儿童文学作品，并进行互动讨论。</p>'
    }
])

export const useActivities = () => {
    const fetchActivities = () => {
        return Promise.resolve(activities.value)
    }

    const fetchActivity = (id: number) => {
        const activity = activities.value.find(a => a.id === id)
        return Promise.resolve(activity || null)
    }

    const createActivity = (newActivity: Omit<Activity, 'id'>) => {
        const id = Math.max(...activities.value.map(a => a.id)) + 1
        const activity = { id, ...newActivity }
        activities.value.push(activity)
        return Promise.resolve(activity)
    }

    const updateActivity = (id: number, updatedActivity: Omit<Activity, 'id'>) => {
        const index = activities.value.findIndex(a => a.id === id)
        if (index !== -1) {
            activities.value[index] = { id, ...updatedActivity }
            return Promise.resolve(activities.value[index])
        }
        return Promise.reject(new Error('Activity not found'))
    }

    const deleteActivity = (id: number) => {
        const index = activities.value.findIndex(a => a.id === id)
        if (index !== -1) {
            activities.value.splice(index, 1)
            return Promise.resolve(true)
        }
        return Promise.reject(new Error('Activity not found'))
    }

    return {
        fetchActivities,
        fetchActivity,
        createActivity,
        updateActivity,
        deleteActivity
    }
}