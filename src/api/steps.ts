import { request } from '@umijs/max';

/**
 * 添加溶剂
 * @param data {API.AddSolvent}
 */
export const addSolvent = (data: API.AddSolvent): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/addsolventstep`, {
    method: 'post',
    data,
  });
};

/**
 * 移液
 * @param data {API.Pipette}
 */
export const pipette = (data: API.Pipette): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/pipettestep`, {
    method: 'post',
    data,
  });
};

/**
 * 加固
 * @param data {API.AddSolid}
 */
export const addSolid = (data: API.AddSolid): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/addsolidstep`, {
    method: 'post',
    data,
  });
};

export const getReagentsByStep = (step_name: string): Promise<Response<API.ReagentsInfo[]>> => {
  return request(`/api/v1/lab/steps/${step_name}/area_positions`, {
    method: 'post',
  });
};
