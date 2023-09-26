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

/**
 * 蠕动泵加液
 * @param data
 */
export const doperistalticStep = (
  data: API.DoPeristalticStep,
): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/doperistalticstep`, {
    method: 'post',
    data,
  });
};
/**
 * 搅拌3
 * @param data
 */
export const mix3Step = (data: API.Mix3Step): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/heatingstirstep`, {
    method: 'post',
    data,
  });
};


/**
 * 根据步骤id获取指令信息
 * @param step_id
 * @param params
 */

export const getMethodsByStepId = (step_id:string|number,params:API.PagesReq): Promise<Response<API.PagesRes<API.Steps.getMethodsByStepId>>> => {
  return request(`/api/v1/lab/steps/${step_id}/logs`, {
    method: 'get',
    params
  });
};
