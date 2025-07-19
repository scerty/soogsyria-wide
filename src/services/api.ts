// src/api.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: 'scerty7@gmail.com',
    password: 'Qweasd774411',
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
