import { request } from '@umijs/max';

/**
 * 获取试剂列表
 * @param params
 */
export const getReagentList = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<API.Reagents.List>>>(`/api/v1/reagent/reagents`, {
    method: 'get',
    params,
  });
};
/**
 * 创建试剂
 * @param data
 */
export const createReagent = (data: API.Reagents.Create) => {
  return request<Response<API.PagesRes<API.Reagents.List>>>(`/api/v1/reagent/reagents`, {
    method: 'post',
    data,
  });
};
/**
 * 获取试剂详情
 * @param ID
 */
export const getReagentDetail = (ID: string | number) => {
  return request<Response<API.Reagents.List>>(`/api/v1/reagent/reagents/${ID}`, {
    method: 'get',
  });
};

/**
 * 修改试剂信息
 * @param ID
 * @param data
 */
export const editReagent = (ID: string | number, data: API.Reagents.Create) => {
  return request<Response<API.Reagents.List>>(`/api/v1/reagent/reagents/${ID}`, {
    method: 'put',
    data,
  });
};
/**
 * 修改试剂信息
 * @param ID
 * @param data
 */
export const deleteReagent = (ID: string | number) => {
  return request<Response<API.Reagents.List>>(`/api/v1/reagent/reagents/${ID}`, {
    method: 'delete',
  });
};
