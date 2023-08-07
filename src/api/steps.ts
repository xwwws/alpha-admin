// @ts-ignore
import { API } from '@/api/typings';
import { request } from '@umijs/max';

/**
 * 添加溶剂
 * @param data {API.AddSolReq}
 */
export const addSolvent = (data: API.AddSolvent) => {
  return request<API.MethodsRes>(`/api/v1/lab/steps/addsolventstep`, {
    method: 'post',
    data,
  });
};

/**
 * 移液
 * @param data {API.Pipette}
 */
export const pipette = (data: API.Pipette) => {
  return request<API.MethodsRes>(`/api/v1/lab/steps/pipettestep`, {
    method: 'post',
    data,
  });
};

/**
 *
 * @param data {API.AddSolid}
 */
export const addSolid = (data: API.AddSolid) => {
  return request<API.MethodsRes>(`/api/v1/lab/steps/addsolidstep`, {
    method: 'post',
    data,
  });
};
