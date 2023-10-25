import { request } from '@umijs/max';
// reactionVessel 反应容器
/**
 * 获取反应容器列表
 * @param params
 */
export const getReactionVesselList = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<API.ReactionVessel.List>>>(`/api/v1/expt/vessels`, {
    method: 'get',
    params,
  });
};


/**
 * 创建反应容器
 * @param data
 */
export const createReactionVessel = (data: API.ReactionVessel.Create) => {
  return request<Response<any>>(`/api/v1/expt/vessels`, {
    method: 'post',
    data,
  });
};


/**
 * 删除反应容器
 * @param id
 */
export const deleteReactionVessel = (id: string | number) => {
  return request<Response<any>>(`/api/v1/expt/vessels/${id}`, {
    method: 'delete',
  });
};

/**
 * 查询反应容器详情
 * @param id
 */
export const getReactionVesselDetail = (id: string | number) => {
  return request<Response<API.ReactionVessel.Detail>>(`/api/v1/expt/vessels/${id}`, {
    method: 'get',
  });
};


export const updateReactionVessel = (id: string | number,data: API.ReactionVessel.Update) => {
  return request<Response<any>>(`/api/v1/expt/vessels/${id}`, {
    method: 'put',
    data
  })
}


