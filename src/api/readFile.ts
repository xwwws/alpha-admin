import { request } from '@umijs/max';

/**
 * 获取实验列表
 */
export const getFile = (csvUrl: string):Promise<string> => {
  return request(`/api/static/acquisitions/${csvUrl}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      withCredentials: true,
    }
  });
};
