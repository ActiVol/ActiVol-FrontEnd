// src/stores/activity.ts
import { defineStore } from 'pinia'
import axios from 'axios'

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
        const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/activities?firstName=Test&lastName=Hello&uid=123456')
        this.activities = response.data
      } catch (error) {
        console.error('Error fetching activities:', error)
        throw error
      }
    },
    async fetchActivity(id: number) {
      try {
        const response = await axios.get(`https://test-api-v.us.kjchmc.cn/api/auth/activities/${id}`)
        return response.data
      } catch (error) {
        console.error(`Error fetching activity ${id}:`, error)
        throw error
      }
    },
    async createActivity(activityData: Partial<Activity>) {
      try {
        const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/activities', activityData)
        this.activities.push(response.data)
        return response.data
      } catch (error) {
        console.error('Error creating activity:', error)
        throw error
      }
    },
    async updateActivity(id: number, activityData: Partial<Activity>) {
      try {
        const response = await axios.put(`https://test-api-v.us.kjchmc.cn/api/auth/activities/${id}`, activityData)
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
    async deleteActivity(id: number) {
      try {
        await axios.delete(`https://test-api-v.us.kjchmc.cn/api/auth/activities/${id}`)
        this.activities = this.activities.filter(a => a.id !== id)
      } catch (error) {
        console.error(`Error deleting activity ${id}:`, error)
        throw error
      }
    },
  },
})