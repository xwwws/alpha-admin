import { request } from '@umijs/max';

/**
 * 获取实验列表
 * @param params {API.AddSolvent}
 */
export const getExperimentList = (params: API.PagesReq) => {
  return request<API.Experiments.List[]>(`/api/v1/expt/expts`, {
    method: 'get',
    params,
  });
};

/**
 * 创建实验
 * @param data {API.Experiments.CreateExperimentReq}
 */
export const createExperiment = (data: API.Experiments.CreateExperimentReq) => {
  return request<API.Experiments.CreateExperimentRes>(`/api/v1/expt/expts`, {
    method: 'post',
    data,
  });
};
/**
 * 执行实验
 * @param id string
 * @param data {} object
 */
export const runExperimentById = (id: string | number, data?: object | undefined) => {
  return request<boolean>(`/api/v1/expt/expts/${id}/run`, {
    method: 'post',
    data,
  });
};
/**
 * 取消实验
 * @param id string
 * @param data {} object
 */
export const cancelExperimentById = (id: string | number, data?: object | undefined) => {
  return request<boolean>(`/api/v1/expt/expts/${id}/cancel`, {
    method: 'post',
    data,
  });
};
/**
 * 查询实验记录
 * @param id string
 * @param data {} object
 */
export const getExperimentDetailsById = (id: string | number, data?: object | undefined) => {
  return request<API.Experiments.ExperimentRecordRes>(`/api/v1/expt/expts/${id}`, {
    method: 'get',
    data,
  });
};
