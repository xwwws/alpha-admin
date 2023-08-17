import { request } from '@umijs/max';

/**
 * 获取steps
 */
export const getStepsMap = (): Promise<Response<API.Enum[]>> => {
  return request(`/api/v1/lab/steps/all`, {
    method: 'get',
  });
};
/**
 * 获取methods
 */
export const getMethodsMap = (): Promise<Response<API.Enum[]>> => {
  return request(`/api/v1/lab/methods/all`, {
    method: 'get',
  });
};
/**
 * 获取area
 */
export const getAreasMap = (): Promise<Response<API.Enum[]>> => {
  return request(`/api/v1/lab/areas/all`, {
    method: 'get',
  });
};
