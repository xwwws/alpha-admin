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
 * 创建用户
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
 * 获取用户详情
 * @param id
 */
export const getUserInfo = (id: string | number) => {
  return request<Response<Users.UserInfo>>(
    `/api/v1/user/users/${id}`,
    {
      method: 'get',
    }
  );
};


/**
 * 获取用户详情
 * @param id
 * @param data
 */
export const editUserInfo = (id: string | number, data: Users.SetUserInfo) => {
  return request<Response<any>>(
    `/api/v1/user/users/${id}`,
    {
      method: 'put',
      data
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
