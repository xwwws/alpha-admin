import { request } from '@umijs/max';

/**
 *  项目列表
 * @param params
 */
export const getProjects = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<Projects.List>>>(
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
export const createProject = (data: Projects.CreateProject) => {
  return request<Response<any>>(
    `/api/v1/project/projects`,
    {
      method: 'post',
      data
    }
  );
};

/**
 * 编辑项目
 * @param id
 * @param data
 */
export const editProject = (id: string | number, data: Projects.EditProject) => {
  return request<Response<any>>(
    `/api/v1/project/projects/${id}`,
    {
      method: 'put',
      data
    }
  );
};
/**
 * 获取项目信息
 * @param id
 */
export const getProjectDetail = (id: string | number) => {
  return request<Response<Projects.ProjectDetail>>(
    `/api/v1/project/projects/${id}`,
    {
      method: 'get',
    }
  );
};

/**
 * 删除项目
 * @param id
 */
export const deleteProject = (id: string | number) => {
  return request<Response<any>>(
    `/api/v1/project/projects/${id}`,
    {
      method: 'delete',
    }
  );
};

/**
 * 项目数据列表
 * @param project_id
 * @param params
 */
export const getProDataList = (project_id: string | number, params: API.PagesReq) => {
  return request<Response<API.PagesRes<Projects.ProDataList>>>(
    `/api/v1/project/projects/${project_id}/dataitems`,
    {
      method: 'get',
      params
    }
  );
};

/**
 * 创建数据
 * @param project_id
 * @param data
 */
export const createProData = (project_id: string | number, data: Projects.CreateProData) => {
  return request<Response<any>>(
    `/api/v1/project/projects/${project_id}/dataitems`,
    {
      method: 'post',
      data
    }
  );
};


/**
 * 删除数据
 * @param project_id
 */
export const getProDataItemInfo = (project_id: string | number) => {
  return request<Response<Projects.ProDataItemInfo>>(
    `/api/v1/project/projects/dataitems/${project_id}`,
    {
      method: 'get',
    }
  );
};

/**
 * 删除数据
 * @param project_id
 */
export const deleteProData = (project_id: string | number) => {
  return request<Response<any>>(
    `/api/v1/project/projects/dataitems/${project_id}`,
    {
      method: 'delete',
    }
  );
};


/**
 * 编辑
 * @param project_id
 */
export const editProData = (project_id: string | number, data: Projects.CreateProData) => {
  return request<Response<any>>(
    `/api/v1/project/projects/dataitems/${project_id}`,
    {
      method: 'put',
      data
    }
  );
};

/**
 * 获取数据项
 * @param proDataId
 */

export const getProDataInfo = (proDataId: string | number) => {
  return request<Response<Projects.ProDataInfo>>(
    `/api/v1/project/projects/dataitems/${proDataId}/query`,
    {
      method: 'post',
    }
  );
};

