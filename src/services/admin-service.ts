import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API = process.env.REACT_APP_API_HOST_PREFIX;

export const getAdminResource = (): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `${API}/api/admin/resource`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios(config);
};
