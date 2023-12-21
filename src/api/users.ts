import { request } from '@umijs/max';

/**
 * 获取用户列表
 * @param params
 */
export const getUserList = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<Users.List>>>(`/api/v1/user/users`, {
    method: 'get',
    params,
  });
};
