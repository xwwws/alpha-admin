import { request } from '@umijs/max';

/**
 * 更新实验步骤上传附件
 * @param exptattach_id
 * @param data
 */
export const updateExpAnnex = (exptattach_id : string | number, data: Experiments.UploadExpAnnex) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('file', data.file);
  formData.append('description', data.description);

  return request<Response<any>>(
    `/api/v1/lab/attachments/attachments/${exptattach_id}`, {
      method: 'put',
      requestType: 'form',
      data: formData
    });
};


/**
 * 获取附件列表
 * @param params
 */
export const getAnnexList = (params: Attachments.GetAnnexReq) => {
  return request<Response<Attachments.GetAnnexRes[]>>(
    `/api/v1/lab/attachments/attachments`, {
      method: 'get',
      params
    });
};

