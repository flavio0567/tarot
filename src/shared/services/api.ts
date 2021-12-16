import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tarotonline.com.br/',
});

export default api;
