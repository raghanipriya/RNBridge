import {AxiosRequestConfig} from 'axios';
import {axiosClient} from './axiosClient';
import {ZodType} from 'zod';

export interface ApiRequestConfig<T = any> extends AxiosRequestConfig {
  responseSchema?: ZodType<T>;
}

export const apiGet = async <T>(
  url: string,
  config?: ApiRequestConfig<T>,
): Promise<T> => {
  return axiosClient.get<any, T>(url, config);
};

export const apiPost = <T>(url: string, body: any, config?: ApiRequestConfig) =>
  axiosClient.post<any, T>(url, body, config);

export const apiPut = <T>(url: string, data?: any, config?: ApiRequestConfig) =>
  axiosClient.put<T>(url, data, config);

export const apiDelete = <T>(url: string, config?: ApiRequestConfig) =>
  axiosClient.delete<T>(url, config);
