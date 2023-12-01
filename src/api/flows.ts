import { request } from '@umijs/max';

/**
 * 获取作业流程列表
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
 * 获取作业流程详情
 * @param flow_id
 * @param params
 */
export const getFlowDetail = (flow_id: string | number, params?: { sibling?: string }) => {
  return request<Response<Flows.Detail>>(
    `/api/v1/expt/flows/${flow_id}`,
    {
      method: 'get',
      params
    });
};

/**
 * 获取作业流程记录
 * @param flow_id
 * @param params
 */
export const getFlowRecord = (flow_id: string | number, params?: { sibling?: string }) => {
  return request<Response<Flows.Record>>(
    `/api/v1/expt/flows/${flow_id}/record`,
    {
      method: 'get',
      params
    });
};


/**
 * 删除作业流程
 * @param flow_id
 */
export const deleteFlow = (flow_id: number) => {
  return request<Response<API.PagesRes<Flows.List>>>(
    `/api/v1/expt/flows/${flow_id}`,
    {
      method: 'delete',
    });
};

/**
 * 执行作业流程
 * @param flow_id
 */
export const runFlow = (flow_id: number) => {
  return request<Response<any>>(
    `/api/v1/expt/flows/${flow_id}/run`,
    {
      method: 'post',
    });
};


/**
 * 取消作业流程
 * @param flow_id
 */
export const cancelFlow = (flow_id: number) => {
  return request<Response<any>>(
    `/api/v1/expt/flows/${flow_id}/cancel`,
    {
      method: 'post',
    });
};


/**
 * 暂停 继续作业流程
 * @param flow_id
 * @param query
 */
export const statusFlow = (flow_id: number, query: { status: 'running' | 'pause' }) => {
  return request<Response<any>>(
    `/api/v1/expt/flows/${flow_id}/flow_status`,
    {
      method: 'post',
      query
    });
};

