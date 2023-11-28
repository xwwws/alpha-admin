import { request } from '@umijs/max';

/**
 * 获取工作流列表
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


/**
 * 获取工作流详情
 * @param flow_id
 * @param params
 */
export const getFlowDetail = (flow_id: string | number,params?: { sibling?: string }) => {
  return request<Response<Flows.Detail>>(
    `/api/v1/expt/flows/${flow_id}`,
    {
      method: 'get',
      params
    });
};








/**
 * 删除工作流
 * @param flow_id
 */
export const deleteFlow = (flow_id: number) => {
  return request<Response<API.PagesRes<Flows.List>>>(
    `/api/v1/expt/flows/${flow_id}`,
    {
      method: 'delete',
    });
};
