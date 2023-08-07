// @ts-ignore
import { API } from '@/api/typings';
import { request } from '@umijs/max';

/**
 * 获取实验列表
 * @param params {API.AddSolvent}
 */
export const getExperimentList = (params: API.PagesReq) => {
  return request<API.Experiments.List[]>(`/api/v1/expt/expts`, {
    method: 'get',
    // data,
    params,
  });
};
