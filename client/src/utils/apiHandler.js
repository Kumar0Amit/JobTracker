import axios from 'axios';

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jobtracker-o6xb.onrender.com/api/v1',
  withCredentials: true,
});

export default apiHandler;
