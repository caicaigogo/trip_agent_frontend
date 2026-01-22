import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 与后端接口前缀一致
});

export const fetchUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
