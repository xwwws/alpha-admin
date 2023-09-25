import { request } from '@umijs/max';

/**
 * 获取实验列表
 * @param params {API.AddSolvent}
 */
export const getExperimentList = (params: API.PagesReq) => {
  return request<Response<API.PagesRes<API.Experiments.List>>>(`/api/v1/expt/expts`, {
    method: 'get',
    params,
  });
};

/**
 * 创建实验
 * @param data {API.Experiments.CreateExperimentReq}
 */
export const createExperiment = (data: API.Experiments.CreateExperimentReq) => {
  return request<Response<API.Experiments.CreateExperimentRes>>(`/api/v1/expt/expts`, {
    method: 'post',
    data,
  });
};
/**
 * 执行实验
 * @param id string
 * @param data {} object
 */
export const runExperimentById = (id: string | number, data?: object | undefined) => {
  return request<Response<boolean>>(`/api/v1/expt/expts/${id}/run`, {
    method: 'post',
    data,
  });
};
/**
 * 取消实验
 * @param id string
 * @param data {} object
 */
export const cancelExperimentById = (id: string | number, data?: object | undefined) => {
  return request<Response<boolean>>(`/api/v1/expt/expts/${id}/cancel`, {
    method: 'post',
    data,
  });
};
/**
 * 查询实验详情
 * @param id string
 * @param data {} object
 */
export const getExperimentDetailsById = (id: string | number, data?: object | undefined) => {
  return request<Response<API.Experiments.ExperimentDetailsRes>>(`/api/v1/expt/expts/${id}`, {
    method: 'get',
    data,
  });
};

/**
 * 查询实验记录
 * @param id string
 * @param data {} object
 */
export const getExperimentLogsById = (id: string | number, data?: object | undefined) => {
  return request<Response<API.Experiments.ExperimentRecordRes[]>>(`/api/v1/expt/expts/${id}/logs`, {
    method: 'get',
    data,
  });
};


/**
 * 根据实验id获取步骤信息
 * @param id string
 */
export const getStepsByExperimentId = (id: string | number) => {
  return request<Response<API.Experiments.ExperimentStepsRes[]>>(`/api/v1/expt/expts/${id}/steps`, {
    method: 'get',
  });
};



/**
 * 删除实验
 * @param expt_id
 */
export const deleteExperiment = (expt_id: string | number) => {
  return request<Response<any>>(
    `/api/v1/expt/expts/${expt_id}`,
    {
      method: 'delete'
    }
  );
};
