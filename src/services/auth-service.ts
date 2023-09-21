import axios, { AxiosResponse } from 'axios';
import { IRegister } from '../types/Register.interface';

const API = process.env.REACT_APP_API_HOST_PREFIX;

export const registerUser = (payload: IRegister): Promise<AxiosResponse> => {
  const config = {
    method: 'POST',
    url: `${API}/api/auth/register`,
    data: payload,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config);
};

export const loginUser = (payload: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  const config = {
    method: 'POST',
    url: `${API}/api/auth/login`,
    data: payload,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config);
};

export const verifyEmail = (verifyId: string): Promise<AxiosResponse> => {
  const config = {
    method: 'PUT',
    url: `${API}/api/auth/verify/${verifyId}`,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config);
};