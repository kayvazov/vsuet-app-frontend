import axios from 'axios';
import { BASE_API_URL } from '@/constants';

const instance = axios.create({
  baseURL: BASE_API_URL,
});

export function addRequestInterceptors(onSuccess, onError) {
  instance.interceptors.request.use(onSuccess, onError);
}

export function addResponseInterceptors(onSuccess, onError) {
  instance.interceptors.response.use(onSuccess, onError);
}

function addHeadersToRequest(config) {
  const localConfig = config;

  if (!localConfig.headers) {
    localConfig.headers = {};
  }

  localConfig.headers = {
    ...localConfig.headers,
  };

  return config;
}

function handleSuccessResponse({ data }) {
  return data.response ? data.response : data;
}

instance.interceptors.request.use(addHeadersToRequest);
instance.interceptors.response.use(handleSuccessResponse);

export default instance;
