// @ts-ignore
import { API } from '@/api/typings';
import { request } from '@umijs/max';

/**
 * 添加溶剂
 * @param data {API.AddSolReq}
 */
export const addSolvent = (data: API.AddSolvent) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/addsolventstep`, {
    method: 'post',
    data,
  });
};
