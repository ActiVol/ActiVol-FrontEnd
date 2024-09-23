// src/store/user.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: null,
            username: '',
            isAdmin: 0,
        },
        isLoggedIn: false,
    }),
    actions: {
        async fetchUser() {
            try {
                const response = await axios.get('/api/user');
                this.user = response.data;
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.isLoggedIn = false;
            this.user = { id: null, username: '', isAdmin: 0 };
        },
    },
});
