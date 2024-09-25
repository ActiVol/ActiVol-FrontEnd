import axios from 'axios';

const API_BASE_URL = 'https://test-api-v.us.kjchmc.cn/api';

export const login = (credentials: { identifier: string; password: string }) =>
    axios.post(`${API_BASE_URL}/auth/login`, credentials);

export const register = (userData: any) =>
    axios.post(`${API_BASE_URL}/auth/register`, userData);

export const forgotPassword = (email: string) =>
    axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });

export const fetchUserInfo = (token: string) =>
    axios.get(`${API_BASE_URL}/auth/userinfo`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const fetchActivities = (params: any, token?: string) =>
    axios.get(`${API_BASE_URL}/auth/activities`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        params
    });