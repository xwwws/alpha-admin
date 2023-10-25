import { request } from '@umijs/max';

/**
 * 获取所有设备信息
 */
export const getDevices = () => {
  return request<Response<Devices.Devices[]>>(`/api/v1/lab/devices/all`, {
    method: 'get',
  });
};
