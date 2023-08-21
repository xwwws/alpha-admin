import { request } from '@umijs/max';

/**
 * 区域类型
 */
export const getAreasTypes = (): Promise<
  Response<{ value: string; label: string; area_type: string }[]>
> => {
  return request(`/api/v1/lab/areas/types`, { method: 'get' });
};

/**
 * 获取托盘内通道信息
 */
export const getAreasPositionsByAreaType = (
  area_name: string,
): Promise<Response<API.Trays.positions[]>> => {
  return request(`/api/v1/expt/area_positions`, {
    method: 'get',
    params: {
      area_name,
    },
  });
};
/**
 * 给通道绑定试剂
 * @param id
 * @param data
 */
export const setReagentToPosition = (
  id: string | number,
  data: {
    reagent_id: string | number;
    quantity: string | number;
    unit: string;
  },
): Promise<Response<API.Trays.positions[]>> => {
  return request(`/api/v1/expt/area_positions/${id}`, {
    method: 'put',
    data,
  });
};

/**
 * 删除工作区
 * @param id
 */

export const deletePosition = (id: string | number): Promise<Response<boolean>> => {
  return request(`/api/v1/expt/area_positions/${id}`, {
    method: 'delete',
  });
};
/**
 * 添加工作区
 * @param data
 */
export const createPosition = (data: API.Trays.CreateReq): Promise<Response<any>> => {
  return request(`/api/v1/expt/area_positions`, {
    method: 'post',
    data,
  });
};
