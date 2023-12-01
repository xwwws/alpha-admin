import { request } from '@umijs/max';


/**
 * 实验上传附件
 * @param data
 */
export const uploadAnnex = ( data: Other.UploadExpAnnex) => {
  const formData = new FormData();
  formData.append('expt_id', data.expt_id);
  formData.append('name', data.name);
  formData.append('file', data.file);
  formData.append('description', data.description);
  return request<Response<any>>(`/api/v1/expt/expts/attachments/upload`, {
    method: 'post',
    requestType: 'form',
    data: formData
  });
};
