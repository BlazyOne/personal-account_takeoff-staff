import axios from 'axios';

const REQUEST_TIMEOUT = 30000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};