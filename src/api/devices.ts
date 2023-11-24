import { request } from '@umijs/max';

/**
 * 获取所有设备信息
 */
export const getDevices = () => {
  return request<Response<Devices.Devices[]>>(
    `/api/v1/lab/devices/all`,
    {
      method: 'get',
    });
};

/**
 * 查询步骤执行的历史记录列表
 * @param device_name
 * @param params
 */
export const getDeviceHis = (device_name: string, params: Devices.DeviceHisReq) => {
  return request<Response<API.PagesRes<Devices.DeviceHisRes>>>(
    `/api/v1/lab/devices/${device_name}/history`,
    {
      method: 'get',
      params
    });
};


/**
 * 设备按日运行时长统计:
 * 默认返回过去两周的统计数据
 * @param device_name
 * @param params
 */
export const getDeviceStatistics = (device_name: string,params: Devices.DeviceRunTimeReq) => {
  return request<Response<Devices.DeviceRunTimeRes[]>>(
    `/api/v1/lab/devices/${device_name}/statistics`,
    {
      method: 'get',
      params
    });
};
