import { request } from '@umijs/max';

/**
 * 获取steps
 */
export const getStepsMap = () => {
  return request<API.Enum[]>(`/api/v1/lab/steps/all`, {
    method: 'get',
  });
};
/**
 * 获取methods
 */
export const getMethodsMap = () => {
  return request<API.Enum[]>(`/api/v1/lab/methods/all`, {
    method: 'get',
  });
};
