import axios from 'axios';

import authHelper from './auth-helper';

const axiosInstance = axios.create({
  baseURL: 'https://api.influencenation.co',
});

axiosInstance.interceptors.request.use(config => {
  const token = authHelper.getAccessToken();
  config.headers['Authorization'] = token ? `Bearer ${token}` : undefined;
  return config;
});

export default axiosInstance;
