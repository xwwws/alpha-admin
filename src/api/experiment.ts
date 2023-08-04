import { request } from '@umijs/max';
/**
 * 读值
 * @param data {API.ReadReq}
 */
export const readMethod = (data: API.ReadReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/read`, {
    method: 'post',
    data,
  });
};
/**
 * 等待
 * @param data {API.sleepReq}
 */
export const sleepMethod = (data: API.sleepReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/sleep`, {
    method: 'post',
    data,
  });
};
/**
 * 移动
 * @param data {API.MoveReq}
 */
export const moveMethod = (data: API.MoveReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/movething`, {
    method: 'post',
    data,
  });
};
/**
 * 加液
 * @param data {API.AddSolReq}
 */
export const addSolMethod = (data: API.AddSolReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/addsol`, {
    method: 'post',
    data,
  });
};
/**
 * 开盖
 * @param data {API.OpenCap}
 */
export const openCapMethod = (data: API.OpenCap) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/uncap`, {
    method: 'post',
    data,
  });
};
/**
 * 加盖
 * @param data {API.CloseCap}
 */
export const closeCapMethod = (data: API.CloseCap) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/recap`, {
    method: 'post',
    data,
  });
};
/**
 * 更换夹爪
 * @param data {API.ClawGripper}
 */
export const clawGripperMethod = (data: API.ClawGripper) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/chngtool`, {
    method: 'post',
    data,
  });
};
/**
 * 抬起枪头
 * @param data {API.PickTipReq}
 */
export const pickTipMethod = (data: API.PickTipReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/picktip`, {
    method: 'post',
    data,
  });
};

/**
 * 移动液体
 * @param data {API.LiquidMovementReq}
 */
export const liquidMovementMethod = (data: API.LiquidMovementReq) => {
  return request<API.MethodsRes>(`/api/v1/lab/methods/trnsliquid`, {
    method: 'post',
    data,
  });
};
