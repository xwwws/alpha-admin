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
 * @param params {} object
 */
export const getExperimentDetailsById = (id: string | number, params?: { sibling?: string }) => {
  return request<Response<API.Experiments.ExperimentDetailsRes>>(`/api/v1/expt/expts/${id}`, {
    method: 'get',
    params,
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
 * @param params
 */
export const getStepsByExperimentId = (id: string | number, params?: { sibling?: string }) => {
  return request<Response<API.Experiments.ExperimentStepsRes>>(`/api/v1/expt/expts/${id}/steps`, {
    method: 'get',
    params
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

/**
 * 更新实验备注
 * @param expt_id
 * @param data
 */
export const updateDescription = (expt_id: string | number,data: {description: string}) => {
  return request<Response<any>>(`/api/v1/expt/expts/${expt_id}/description`,{
    method: 'put',
    data
  })
}


/**
 * 暂停或启动所有实验
 * @param params
 */

export const updateExecStatus = (params: {status: string}) => {
  return request<Response<any>>(`/api/v1/expt/expts/exec_status`,{
    method: 'post',
    params
  })
}

/**
 * 重新执行错误实验
 * @param expt_id
 */
export const reRunExp = (expt_id: string | number) => {
  return request<Response<any>>(`/api/v1/expt/expts/${expt_id}/rerun`,{
    method: 'post'
  })
}

/**
 * 重新执行错误步骤
 * @param step_id
 */
export const reRunExpStep = (step_id: string | number) => {
  return request<Response<any>>(`/api/v1/expt/expts/step/${step_id}/rerun`,{
    method: 'post'
  })
}

/**
 * 跳过错误步骤
 * @param step_id
 */
export const skipRunExpStep = (step_id: string | number) => {
  return request<Response<any>>(`/api/v1/expt/expts/step/${step_id}/succeed`,{
    method: 'post'
  })
}


/**
 * 上传附件
 * @param exp_id
 * @param data
 */
export const uploadExpAnnex = (exp_id: string | number, data: Experiments.UploadExpAnnex) => {
  const formData = new FormData()
  formData.append('name',data.name)
  formData.append('file ',data.file)
  formData.append('description',data.description)
  return request<Response<any>>(`/api/v1/expt/expts/${exp_id}/attachments`,{
    method: 'post',
    requestType: 'form',
    data: formData
  })
}
