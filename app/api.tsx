import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://devapi-618v.onrender.com/api/';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getUsers = async (): Promise<any> => {
  const { data } = await api.get('/user');
  return data;
};

export const getUserById = async (id: string | number): Promise<any> => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const updateUser = async (
  username: string,
  password?: string
): Promise<void> => {
  await api.put('/user', { username, password });
};

export const deleteUser = async (id: string | number): Promise<void> => {
  await api.delete(`/user/${id}`);
};

export default api;