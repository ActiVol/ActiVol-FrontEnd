<template>
    <div class="min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

            <!-- Search and Filter Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input type="text" id="search" v-model="searchQuery" placeholder="Search by name or email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select id="role" v-model="selectedRole"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div>
                        <label for="graduationYear" class="block text-sm font-medium text-gray-700 mb-1">Graduation
                            Year</label>
                        <input type="number" id="graduationYear" v-model="selectedGraduationYear"
                            placeholder="Enter graduation year"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
            </div>

            <!-- Table Actions -->
            <div class="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="space-x-2 mb-2 sm:mb-0 flex flex-wrap">
                        <button @click="openNewUserModal"
                            class="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center mb-2 sm:mb-0">
                            <Icon icon="mdi:plus" class="mr-1" /> New User
                        </button>
                        <button @click="batchDelete"
                            class="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200 flex items-center mb-2 sm:mb-0">
                            <Icon icon="mdi:delete" class="mr-1" /> Batch Delete
                        </button>
                        <button @click="fetchUsers"
                            class="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200 flex items-center mb-2 sm:mb-0">
                            <Icon :icon="isLoading ? 'mdi:loading' : 'mdi:refresh'" class="mr-1"
                                :class="{ 'animate-spin': isLoading }" />
                            Refresh
                        </button>
                    </div>
                    <div class="relative" ref="columnSettingsRef">
                        <button @click="toggleColumnSettings"
                            class="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center">
                            <Icon icon="mdi:cog" class="mr-1" /> Column Settings
                        </button>
                        <div v-show="showColumnSettings" :class="columnSettingsPosition"
                            class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-60 overflow-y-auto">
                            <div class="py-1">
                                <label v-for="col in columns" :key="col.key"
                                    class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <input type="checkbox" v-model="visibleColumns" :value="col.key"
                                        class="mr-2 form-checkbox h-5 w-5 text-blue-600" />
                                    <span class="text-gray-700">{{ col.label }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- User List -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left">
                                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                                        class="form-checkbox h-5 w-5 text-blue-600" />
                                </th>
                                <th v-for="col in visibleColumns" :key="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {{ getColumnLabel(col) }}
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="user in filteredUsers" :key="user.id"
                                :class="{ 'bg-blue-50': selectedUsers.includes(user.id) }">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <input type="checkbox" :checked="selectedUsers.includes(user.id)"
                                        @change="toggleRowSelection(user.id)"
                                        class="form-checkbox h-5 w-5 text-blue-600" />
                                </td>
                                <td v-for="col in visibleColumns" :key="col" class="px-6 py-4 whitespace-nowrap">
                                    <template v-if="col === 'name'">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-8 w-8">
                                                <img class="h-8 w-8 rounded-full"
                                                    :src="`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&format=svg`"
                                                    alt="" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">{{ user.first_name }} {{
                                                    user.last_name }}</div>
                                                <div class="text-sm text-gray-500">{{ user.username }}</div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else-if="col === 'role'">
                                        <span :class="[
                                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                            user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        ]">
                                            {{ user.isAdmin ? 'Admin' : 'User' }}
                                        </span>
                                    </template>
                                    <template v-else>
                                        {{ user[col as keyof User] }}
                                    </template>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">
                                        <Icon icon="mdi:pencil" class="w-5 h-5" />
                                    </button>
                                    <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
                                        <Icon icon="mdi:delete" class="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                    <select v-model="itemsPerPage" @change="updatePagination"
                        class="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option :value="10">10 per page</option>
                        <option :value="20">20 per page</option>
                        <option :value="50">50 per page</option>
                    </select>
                    <div class="space-x-2">
                        <button v-for="page in visiblePages" :key="page" @click="currentPage = page" :class="[
                            'px-3 py-1 rounded-md',
                            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        ]">
                            {{ page }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Edit User Modal -->
            <Modal v-if="showEditModal" @close="closeEditModal">
                <h2 class="text-2xl font-bold mb-4">{{ editingUser.id ? 'Edit User' : 'Add New User' }}</h2>
                <form @submit.prevent="submitUser" class="space-y-4">
                    <div>
                        <label for="editFirstName" class="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" id="editFirstName" v-model="editingUser.first_name" required
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="editLastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" id="editLastName" v-model="editingUser.last_name" required
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="editEmail" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="editEmail" v-model="editingUser.interior_email" required
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="editUid" class="block text-sm font-medium text-gray-700">UID</label>
                        <input type="text" id="editUid" v-model="editingUser.uid" required
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="editGraduationYear" class="block text-sm font-medium text-gray-700">Graduation
                            Year</label>
                        <input type="number" id="editGraduationYear" v-model="editingUser.graduation_year" required
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="editRole" class="block text-sm font-medium text-gray-700">Role</label>
                        <select id="editRole" v-model="editingUser.isAdmin"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option :value="0">User</option>
                            <option :value="1">Admin</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="closeEditModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {{ editingUser.id ? 'Update User' : 'Add User' }}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import axios from 'axios';
import { Icon } from '@iconify/vue';
import Modal from '@/components/Admin/Modal.vue';

interface User {
    id: number;
    username: string;
    uid: string;
    first_name: string;
    last_name: string;
    graduation_year: number;
    interior_email: string;
    exterior_email: string;
    isAdmin: number;
    latest_ip: string;
    device_UA: string;
    device_lang: string;
    device_screen_size: string;
    created_at: string;
    updated_at: string;
}

const users = ref<User[]>([]);
const searchQuery = ref('');
const selectedRole = ref('');
const selectedGraduationYear = ref('');
const showEditModal = ref(false);
const editingUser = ref<Partial<User>>({});
const selectedUsers = ref<number[]>([]);
const selectAll = ref(false);
const isLoading = ref(false);
const showColumnSettings = ref(false);
const columnSettingsPosition = ref("right-0");
const columnSettingsRef = ref<HTMLElement | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'uid', label: 'UID' },
    { key: 'interior_email', label: 'Interior Email' },
    { key: 'exterior_email', label: 'Exterior Email' },
    { key: 'role', label: 'Role' },
    { key: 'graduation_year', label: 'Graduation Year' },
];

const visibleColumns = ref(['name', 'uid', 'interior_email', 'exterior_email', 'role', 'graduation_year']);

const fetchUsers = async () => {
    isLoading.value = true;
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://test-api-v.us.kjchmc.cn/api/auth/all-users', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        users.value = response.data;

        // Implement a small delay strategy
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const startTime = Date.now();
        await delay(800); // Minimum delay of 0.8 seconds
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 800) {
            await delay(800 - elapsedTime);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        isLoading.value = false;
    }
};

const filteredUsers = computed(() => {
    return users.value.filter(user => {
        const matchesSearch = (user.first_name + ' ' + user.last_name + ' ' + user.interior_email)
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const matchesRole = selectedRole.value === '' ||
            (selectedRole.value === 'admin' && user.isAdmin === 1) ||
            (selectedRole.value === 'user' && user.isAdmin === 0);
        const matchesGraduationYear = selectedGraduationYear.value === '' ||
            user.graduation_year === parseInt(selectedGraduationYear.value);
        return matchesSearch && matchesRole && matchesGraduationYear;
    });
});

const visiblePages = computed(() => {
    const totalPages = Math.ceil(filteredUsers.value.length / itemsPerPage.value);
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const toggleColumnSettings = () => {
    showColumnSettings.value = !showColumnSettings.value;
    nextTick(() => {
        if (showColumnSettings.value) {
            const rect = columnSettingsRef.value?.getBoundingClientRect();
            if (rect) {
                const viewportWidth = window.innerWidth;
                if (viewportWidth < 768) {
                    columnSettingsPosition.value = "left-0";
                } else {
                    columnSettingsPosition.value = "right-0";
                }
            }
        }
    });
};

const getColumnLabel = (key: string) => {
    const column = columns.find(col => col.key === key);
    return column ? column.label : key;
};

const editUser = (user: User) => {
    editingUser.value = { ...user };
    showEditModal.value = true;
};

const openNewUserModal = () => {
    editingUser.value = { isAdmin: 0 };
    showEditModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
    editingUser.value = {};
};

const submitUser = async () => {
    try {
        const token = localStorage.getItem('token');
        if (editingUser.value.id) {
            await axios.put(`https://test-api-v.us.kjchmc.cn/api/auth/users/${editingUser.value.id}`, editingUser.value, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } else {
            await axios.post('https://test-api-v.us.kjchmc.cn/api/auth/users', editingUser.value, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        }
        await fetchUsers();
        closeEditModal();
    } catch (error) {
        console.error('Error submitting user:', error);
    }
};

const deleteUser = async (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://test-api-v.us.kjchmc.cn/api/auth/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
};

const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedUsers.value = filteredUsers.value.map(user => user.id);
    } else {
        selectedUsers.value = [];
    }
};

const toggleRowSelection = (userId: number) => {
    const index = selectedUsers.value.indexOf(userId);
    if (index === -1) {
        selectedUsers.value.push(userId);
    } else {
        selectedUsers.value.splice(index, 1);
    }
    selectAll.value = selectedUsers.value.length === filteredUsers.value.length;
};

const batchDelete = async () => {
    if (selectedUsers.value.length === 0) {
        alert('Please select users to delete');
        return;
    }
    if (confirm(`Are you sure you want to delete ${selectedUsers.value.length} selected users?`)) {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('https://test-api-v.us.kjchmc.cn/api/auth/users/batch-delete', {
                data: { ids: selectedUsers.value },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await fetchUsers();
            selectedUsers.value = [];
            selectAll.value = false;
        } catch (error) {
            console.error('Error batch deleting users:', error);
        }
    }
};

const updatePagination = () => {
    currentPage.value = 1;
};

const handleClickOutside = (event: MouseEvent) => {
    if (columnSettingsRef.value && !columnSettingsRef.value.contains(event.target as Node)) {
        showColumnSettings.value = false;
    }
};

onMounted(() => {
    fetchUsers();
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>