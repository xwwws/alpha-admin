import { request } from '@umijs/max';

/**
 *  项目列表
 * @param params
 */
export const getProjects = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<API.Projects.List>>>(
    `/api/v1/project/projects`,
    {
      method: 'get',
      params
    }
  );
};

/**
 * 创建项目
 * @param data
 */
export const createProject = (data: API.Projects.CreateProject) => {
  return request<Response<any>>(
    `/api/v1/project/projects`,
    {
      method: 'post',
      data
    }
  )
}

/**
 * 编辑项目
 * @param id
 * @param data
 */
export const editProject = (id: string | number, data: API.Projects.EditProject) => {
  return request<Response<any>>(
    `/api/v1/project/projects/${ id }`,
    {
      method: 'put',
      data
    }
  )
}
/**
 * 获取项目信息
 * @param id
 */
export const getProjectDetail = (id: string | number) => {
  return request<Response<API.Projects.ProjectDetail>>(
    `/api/v1/project/projects/${ id }`,
    {
      method: 'get',
    }
  )
}

/**
 * 删除项目
 * @param id
 */
export const deleteProject = (id: string | number) => {
  return request<Response<any>>(
    `/api/v1/project/projects/${ id }`,
    {
      method: 'delete',
    }
  )
}
