import { request } from '@umijs/max';
/**
 * 区域类型
 */
export const getAreasTypes = (): Promise<Response<{ value: string; label: string }[]>> => {
  return request(`/api/v1/lab/areas/types`, { method: 'get' });
};
