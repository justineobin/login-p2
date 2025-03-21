import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://devapi-618v.onrender.com/api/';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Fetch all users
export const getUsers = async () => {
    const { data } = await api.get(`/user`);
    return data;
};

// Fetch a user by their ID
export const getUserById = async (id: number) => {
    const { data } = await api.get(`/user/${id}`);
    return data;
};

// Register (create) a new user
export const createUser = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { username, password });

        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to create user');
    }
};

// Update a user's username
export const updateUser = async (id: number, username: string) => {
    await api.put(`/user/${id}`, { username });
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
    await api.delete(`/user/${id}`);
};

export default api;
