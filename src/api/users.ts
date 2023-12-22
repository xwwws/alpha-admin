import { request } from '@umijs/max';

/**
 * 获取用户列表
 * @param params
 */
export const getUserList = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<Users.List>>>(
    `/api/v1/user/users`,
    {
      method: 'get',
      params,
    }
  );
};
/**
 * 获取用户列表
 * @param data
 */
export const createUser = (data: Users.Create) => {
  return request<Response<any>>(
    `/api/v1/user/users`,
    {
      method: 'post',
      data,
    }
  );
};


/**
 * 删除用户
 * @param id
 */
export const delUser = (id: string | number) => {
  return request<Response<API.PagesRes<Users.List>>>(
    `/api/v1/user/users/${id}`,
    {
      method: 'delete',
    }
  );
};
