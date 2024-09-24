import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: null,
            username: '',
            isAdmin: 0,
            firstName: '',
            lastName: '',
            interiorEmail: '',
            uid: '',
        },
        isLoggedIn: false,
    }),
    actions: {
        async fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                this.isLoggedIn = false;
                return;
            }

            try {
                const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/userinfo', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.user = {
                    id: response.data.id,
                    username: response.data.username,
                    isAdmin: response.data.isAdmin,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    interiorEmail: response.data.interior_email,
                    uid: response.data.uid,
                };
                this.isLoggedIn = true;
                // console.log('Updated user state:', this.user); // 添加调试信息
            } catch (error) {
                console.error('Error fetching user info:', error);
                this.isLoggedIn = false;
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.isLoggedIn = false;
            this.user = {
                id: null,
                username: '',
                isAdmin: 0,
                firstName: '',
                lastName: '',
                interiorEmail: '',
                uid: '',
            };
        },
    },
});
