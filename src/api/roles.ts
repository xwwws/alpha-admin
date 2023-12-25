import { request } from '@umijs/max';

/**
 * 获取角色列表
 * @param params
 */
export const getRoleList = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<Roles.List>>>(
    `/api/v1/user/roles`,
    {
      method: 'get',
      params,
    }
  );
};


/**
 * 创建角色
 * @param data
 */
export const createRoles = ( data: Roles.Create) => {
  return request<Response<any>>(
    `/api/v1/user/roles`,
    {
      method: 'post',
      data,
    }
  );
};


/**
 * 角色详情
 * @param userId
 * @param data
 */
export const roleInfo = (userId: string | number) => {
  return request<Response<any>>(
    `/api/v1/user/roles/${userId}`,
    {
      method: 'get',
    }
  );
};

/**
 * 角色详情
 * @param userId
 * @param data
 */
export const editRoleInfo = (userId: string | number, data: Roles.Create) => {
  return request<Response<any>>(
    `/api/v1/user/roles/${userId}`,
    {
      method: 'put',
      data,
    }
  );
};




/**
 * 删除角色
 * @param id
 */
export const deleteRole = (id: string| number) => {
  return request<Response<any>>(
    `/api/v1/user/roles/${id}`,
    {
      method: 'delete',
    }
  );
};


/**
 * 更新角色的菜单
 * @param role_id
 * @param data
 */
export const saveRoleMenus = (role_id: string| number, data: number[]) => {
  console.log(data);
  return request<Response<any>>(
    `/api/v1/user/roles/${role_id}/elements`,
    {
      method: 'post',
      data
    }
  );
};

/**
 * 获取角色对应菜单
 * @param role_id
 */
export const getRoleMenusById = (role_id: string| number) => {
  return request<Response<number[]>>(
    `/api/v1/user/roles/${role_id}/elements`,
    {
      method: 'get',
    }
  );
};





