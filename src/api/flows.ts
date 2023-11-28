import { request } from '@umijs/max';

/**
 * 获取实验列表
 * @param params {API.AddSolvent}
 */
export const getFlowList = (params: Flows.ListReq) => {
  return request<Response<API.PagesRes<Flows.List>>>(
    `/api/v1/expt/flows`,
    {
      method: 'get',
      params,
    });
};
