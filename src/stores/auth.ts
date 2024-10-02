import { defineStore } from 'pinia';
import { login, register, forgotPassword, fetchUserInfo, fetchActivities } from '@/api/api';
import { User } from '../types';

const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 缓存有效期为60分钟

function clearExpiredCache() {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.endsWith('_time')) {
            const cacheTime = parseInt(localStorage.getItem(key) || '0');
            if (now - cacheTime > CACHE_EXPIRY_TIME) {
                const dataKey = key.replace('_time', '');
                localStorage.removeItem(key);
                localStorage.removeItem(dataKey);
            }
        }
    }
}

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
                // console.log('User Info:', response.data); // 添加日志
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
            const cachedData = localStorage.getItem(cacheKey);
            const cachedTime = localStorage.getItem(`${cacheKey}_time`);

            if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_EXPIRY_TIME) {
                this.activities = JSON.parse(cachedData);
                return;
            }

            try {
                const response = await fetchActivities(params, token || undefined);
                this.activities = response.data;
                clearExpiredCache(); // 清理过期缓存
                localStorage.setItem(cacheKey, JSON.stringify(response.data));
                localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        },
        async refreshActivities(params = {}) {
            const token = localStorage.getItem('token');
            const cacheKey = `activities_${JSON.stringify(params)}`;

            // 清除缓存
            localStorage.removeItem(cacheKey);
            localStorage.removeItem(`${cacheKey}_time`);

            // 重新请求数据
            try {
                const response = await fetchActivities(params, token || undefined);
                this.activities = response.data;
                clearExpiredCache(); // 清理过期缓存
                localStorage.setItem(cacheKey, JSON.stringify(response.data));
                localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
            } catch (error) {
                console.error('Error refreshing activities:', error);
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.user = null;
            this.isLoggedIn = false;
        },
    },
});
