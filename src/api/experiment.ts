import { request } from '@umijs/max';

/**
 * 读值
 * @param data {API.ReadReq}
 */
export const readMethod = (data: API.ReadReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/read`, {
    method: 'post',
    data,
  });
};
/**
 * 移动
 * @param data {API.MoveRes}
 */

export const moveMethod = (data: API.MoveReq) => {
  return request<API.MoveRes>(`/api/v1/lab/methods/read`, {
    method: 'post',
    data,
  });
};
