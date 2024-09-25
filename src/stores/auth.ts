// src/stores/auth.ts
import { defineStore } from 'pinia';
import { login, register, forgotPassword, fetchUserInfo, fetchActivities } from '@/api/api';
import { User } from '../types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isLoggedIn: false,
        activities: [] as any[],
    }),
    actions: {
        async login(credentials: { identifier: string; password: string }) {
            const response = await login(credentials);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            this.user = user;
            this.isLoggedIn = true;
        },
        async register(userData: any) {
            const response = await register(userData);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            this.user = user;
            this.isLoggedIn = true;
        },
        async forgotPassword(email: string) {
            await forgotPassword(email);
        },
        async fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                this.isLoggedIn = false;
                return;
            }

            if (this.user) {
                this.isLoggedIn = true;
                return;
            }

            try {
                const response = await fetchUserInfo(token);
                console.log('User Info:', response.data); // 添加日志
                this.user = response.data;
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Error fetching user info:', error);
                this.isLoggedIn = false;
            }
        },
        async fetchActivities(params = {}) {
            const token = localStorage.getItem('token');
            const cacheKey = `activities_${JSON.stringify(params)}`;
            const cachedActivities = localStorage.getItem(cacheKey);

            if (cachedActivities) {
                this.activities = JSON.parse(cachedActivities);
                return;
            }

            try {
                const response = await fetchActivities(params, token || undefined);
                this.activities = response.data;
                localStorage.setItem(cacheKey, JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.user = null;
            this.isLoggedIn = false;
        },
    },
});
