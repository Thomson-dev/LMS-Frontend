import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://lms-server-oqfi.onrender.com/api',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post('https://lms-server-oqfi.onrender.com/api/refresh-token', null, {
          headers: {
            'refresh-token': refreshToken,
          },
        });

        if (response.data.success) {
          await AsyncStorage.setItem('access_token', response.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;