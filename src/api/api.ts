import axios from 'axios';

const API_BASE_URL = 'https://test-api-v.us.kjchmc.cn/api';

// 用户认证相关
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

export const refreshToken = (token: string) =>
    axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const fetchAllUsers = (token: string) =>
    axios.get(`${API_BASE_URL}/auth/all-users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const addUser = (userData: any, token: string) =>
    axios.post(`${API_BASE_URL}/auth/users`, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const updateUser = (id: string, userData: any, token: string) =>
    axios.put(`${API_BASE_URL}/auth/users/${id}`, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const deleteUser = (id: string, token: string) =>
    axios.delete(`${API_BASE_URL}/auth/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const batchDeleteUsers = (userIds: string[], token: string) =>
    axios.delete(`${API_BASE_URL}/auth/users/batch-delete`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: { userIds }
    });

export const setAdmin = (userId: string, isAdmin: string, token: string) =>
    axios.post(`${API_BASE_URL}/auth/set-admin`, { userId, isAdmin }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

// 活动记录相关
export const fetchActivityRecords = (params: any, token?: string) =>
    axios.get(`${API_BASE_URL}/activity/records`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        params
    });

export const addActivityRecord = (recordData: any, token: string) =>
    axios.post(`${API_BASE_URL}/activity/records/add`, recordData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const updateActivityRecord = (id: string, recordData: any, token: string) =>
    axios.put(`${API_BASE_URL}/activity/records/update/${id}`, recordData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const deleteActivityRecord = (id: string, token: string) =>
    axios.delete(`${API_BASE_URL}/activity/records/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const reviewActivityRecord = (id: string, status: string, token: string) =>
    axios.put(`${API_BASE_URL}/activity/records/review/${id}`, { status }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

// 活动公告相关
export const fetchActivities = () =>
    axios.get(`${API_BASE_URL}/activity/posts`);

export const fetchActivity = (id: number) =>
    axios.get(`${API_BASE_URL}/activity/posts/${id}`);

export const createActivity = (activityData: any, token: string) =>
    axios.post(`${API_BASE_URL}/activity/posts/create`, activityData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

export const updateActivity = (id: number, activityData: any, token: string) =>
    axios.put(`${API_BASE_URL}/activity/posts/update/${id}`, activityData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

export const deleteActivity = (id: number, token: string) =>
    axios.delete(`${API_BASE_URL}/activity/posts/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });