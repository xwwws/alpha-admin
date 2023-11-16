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
    method: 'get',
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
 * 行星搅拌
 * @param data
 */
export const mix3PlanetStep = (data: Steps.Mix3PlanetStep): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/domix3planetstep`, {
    method: 'post',
    data,
  });
};
/**
 * 废液蒸馏
 * @param data
 */
export const dodistillc3step = (data: Steps.Dodistillc3): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/steps/dodistillc3step`, {
    method: 'post',
    data,
  });
};


/**
 * 根据步骤id获取指令信息
 * @param step_id
 * @param params
 */

export const getMethodsByStepId = (step_id: string | number, params: API.PagesReq): Promise<Response<API.PagesRes<API.Steps.getMethodsByStepId>>> => {
  return request(`/api/v1/lab/steps/${step_id}/logs`, {
    method: 'get',
    params
  });
};


/**
 * 获取步骤调用历史
 * @param step_name // API.Steps.StepName
 * @param params
 */
export const getStepHis = (step_name: string, params: API.Steps.GetStepHisReq): Promise<Response<API.PagesRes<API.Steps.StepHis>>> => {
  return request(`/api/v1/lab/steps/${step_name}/history`, {
    method: 'get',
    params,
  });
};


/**
 * 查询步骤详情：
 */
export const getStepHisInfo = (step_id: number ): Promise<Response<Steps.StepHisInfo>> => {
  return request(`/api/v1/lab/steps/${step_id}/detail`, {
    method: 'get',
  });
};



