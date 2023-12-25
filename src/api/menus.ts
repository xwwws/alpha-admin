import { request } from '@umijs/max';

/**
 * 获取菜单配置列表
 * @param params
 */
export const getMenuList = (params: API.PagesReq) => {
  return request<Response<Menus.List[]>>(
    `/api/v1/menu/elements/tree`,
    {
      method: 'get',
      params,
    }
  );
};
/**
 * 创建新菜单
 * @param data
 */
export const createMenu = (data: Menus.Create) => {
  return request<Response<any>>(
    `/api/v1/menu/elements`,
    {
      method: 'post',
      data,
    }
  );
};


/**
 * 菜单信息
 * @param id
 */
export const menuInfo = (id: string | number) => {
  return request<Response<any>>(
    `/api/v1/menu/elements/${id}`,
    {
      method: 'get',
    }
  );
};

/**
 * 修改菜单信息
 * @param id
 * @param data
 */
export const editMenu = (id: string | number, data: Menus.Edit) => {
  return request<Response<any>>(
    `/api/v1/menu/elements/${id}`,
    {
      method: 'put',
      data
    }
  );
};


/**
 * 删除菜单
 */
export const deleteMenu = (id: number) => {
  return request<Response<any>>(
    `/api/v1/menu/elements/${id}`,
    {
      method: 'delete',
    }
  );
};

/**
 * 获取所有的接口权限列表
 */
export const getApiPermissions = () => {
  return request<Response<Menus.AllPermission[]>>(
    `/api/v1/menu/api_permissions`,
    {
      method: 'get',
    }
  );
};


/**
 * 保存菜单权限
 */
export const savePermissions = (menu_id: number | string, data: any[]) => {
  return request<Response<any>>(
    `/api/v1/menu/elements/${menu_id}/api_permissions`,
    {
      method: 'put',
      data
    }
  );
};

/**
 * 获取所有的菜单权限
 */
export const getPermissionsByMenuId = (menu_id: number | string) => {
  return request<Response<number[]>>(
    `/api/v1/menu/elements/${menu_id}/api_permissions`,
    {
      method: 'get',
    }
  );
};





