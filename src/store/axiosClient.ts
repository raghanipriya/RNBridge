import axios from 'axios';
import {Alert} from 'react-native';
import {ZodType} from 'zod';
import {logApiError} from '../utils/crashlyticsLogger';

const BASE_URL = 'https://stage.erp.promptgroup.co.in/';

const PUBLIC_APIS = ['/login', '/register', '/forgot-password', '/send-otp'];

const isPublicApi = (url?: string) => {
  if (!url) return false;
  return PUBLIC_APIS.some(publicUrl => url.includes(publicUrl));
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    responseSchema?: ZodType<any, any, any>;
  }
}

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async config => {
    config.headers.Authorization = 'token fe96157e60f01be:64ed3cb071ac452';

    config.headers['X-Frappe-CSRF-Token'] =
      'ab03ec0105e18693a8fccc00faff2862a99da749bca9e33550eb7f04';

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    console.log('\n\n 🚀 ~ config:', config);
    return config;
  },
  error => {
    logApiError({
      apiName: error?.config?.url,
      methodName: error?.config?.method?.toUpperCase(),
      error,
      extraInfo: error?.config?.data,
    });
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    const data = response.data.message;

    if (data?.success === false) {
      const message = data.message || 'Something went wrong';

      Alert.alert('Error', message);

      return Promise.reject({
        isBusinessError: true,
        message,
        data,
      });
    }

    // 🔥 ZOD VALIDATION STARTS HERE
    const schema = response.config.responseSchema;

    if (schema) {
      const result = schema.safeParse(data.data);
      console.log('\n\n\n 🚀 ~ result:', result);

      if (!result.success) {
        console.log(
          '\n ❌ API Response Validation Failed:',
          typeof result.error,
          result.error.format(),
        );

        Alert.alert('Error', 'Invalid data received from server');

        return Promise.reject({
          isValidationError: true,
          message: 'Invalid server response',
          zodError: result.error.format(),
        });
      }

      return result.data; // ✅ validated & typed
    }

    // ✅ success case
    return data.data;
  },
  error => {
    let message = 'Something went wrong';

    if (error.response) {
      const status = error.response.status;
      const apiMessage =
        error.response.data?.message || error.response.data?.error;

      switch (status) {
        case 401:
          message = 'Session expired. Please login again.';
          break;
        case 403:
          message = 'You are not authorized.';
          break;
        case 404:
          message = 'API not found.';
          break;
        case 500:
          message = 'Server error. Try again later.';
          break;
        default:
          message = apiMessage || message;
      }
    } else if (error.request) {
      message = 'Network error. Check internet.';
    }

    Alert.alert('Error', message);

    logApiError({
      apiName: error?.config?.url,
      methodName: error?.config?.method?.toUpperCase(),
      error,
      extraInfo: error?.config?.data,
    });
    return Promise.reject({
      isHttpError: true,
      message,
      error,
    });
  },
);
