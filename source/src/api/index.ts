import axios from 'axios';
import router from '@/router/index';
import queryString from 'query-string';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: 'none' }),
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      await router.replace('/login');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default http;
