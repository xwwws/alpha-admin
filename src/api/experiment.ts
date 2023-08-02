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
 * 等待
 * @param data {API.ReadReq}
 */
export const sleepMethod = (data: API.sleepReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/sleep`, {
    method: 'post',
    data,
  });
};
/**
 * 移动
 * @param data {API.MethodsRes}
 */

export const moveMethod = (data: API.MoveReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/movething`, {
    method: 'post',
    data,
  });
};
