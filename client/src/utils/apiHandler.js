import axios from 'axios';

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
});

export default apiHandler;
