import axios from 'axios';

const API = process.env.REACT_APP_API_HOST_PREFIX;

export const loginUser = (payload: { email: string; password: string }) => {
  const config = {
    method: 'POST',
    url: `${API}/api/auth/login`,
    data: payload,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config);
};
