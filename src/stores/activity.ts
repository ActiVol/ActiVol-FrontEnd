import { defineStore } from 'pinia'
import { fetchActivities, fetchActivity, createActivity, updateActivity, deleteActivity } from '@/api/api'

interface Activity {
  id: number;
  title: string;
  date: string;
  location: string;
  duration: number;
  maxParticipants: number;
  status: '报名中' | '已结束';
  content: string;
}

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [] as Activity[],
  }),
  actions: {
    async fetchActivities() {
      try {
          const response = await fetchActivities();
          this.activities = response.data;
      } catch (error) {
          console.error('Error fetching activities:', error);
          throw error;
      }
  },
    async fetchActivity(id: number) {
      try {
        const response = await fetchActivity(id)
        return response.data
      } catch (error) {
        console.error(`Error fetching activity ${id}:`, error)
        throw error
      }
    },
    async createActivity(activityData: Partial<Activity>, token: string) {
      try {
        const response = await createActivity(activityData, token)
        this.activities.push(response.data)
        return response.data
      } catch (error) {
        console.error('Error creating activity:', error)
        throw error
      }
    },
    async updateActivity(id: number, activityData: Partial<Activity>, token: string) {
      try {
        const response = await updateActivity(id, activityData, token)
        const index = this.activities.findIndex(a => a.id === id)
        if (index !== -1) {
          this.activities[index] = response.data
        }
        return response.data
      } catch (error) {
        console.error(`Error updating activity ${id}:`, error)
        throw error
      }
    },
    async deleteActivity(id: number, token: string) {
      try {
        await deleteActivity(id, token)
        this.activities = this.activities.filter(a => a.id !== id)
      } catch (error) {
        console.error(`Error deleting activity ${id}:`, error)
        throw error
      }
    },
  },
})