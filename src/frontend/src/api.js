import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // change if needed
  withCredentials: true,
});

export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/login', data);
