import { defineStore } from 'pinia';
import axios from 'axios';
import { User } from '../types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isLoggedIn: false,
    }),
    actions: {
        async login(credentials: { identifier: string; password: string }) {
            const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/login', credentials);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            this.user = user;
            this.isLoggedIn = true;
        },
        async register(userData: any) {
            const response = await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/register', userData);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            this.user = user;
            this.isLoggedIn = true;
        },
        async forgotPassword(email: string) {
            await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/forgot-password', { email });
        },
        async fetchUser() {
            const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/user');
            this.user = response.data;
            this.isLoggedIn = true;
        },
        logout() {
            localStorage.removeItem('token');
            this.user = null;
            this.isLoggedIn = false;
        },
    },
});
