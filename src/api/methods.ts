import { request } from '@umijs/max';

/**
 * 获取读值信息
 */
export const getReadNodeList = (): Promise<Response<API.Methods.ReadNode[]>> => {
  return request(`/api/v1/lab/methods/node_indexs`, {
    method: 'get',
  });
};

/**
 * 读值
 * @param data {API.ReadReq}
 */
export const readMethod = (data: API.ReadReq): Promise<Response<API.MethodsRes>> => {

  return request(`/api/v1/lab/methods/read`, {
    method: 'post',
    data: {
      ...data,
      nodeid: data.node_index
    }
  });
};

/**
 * 写值
 * @param data {API.Write}
 */
export const writeMethod = (data: Methods.Write): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/write`, {
    method: 'post',
    data: {
      ...data,
      nodeid: data.node_index
    }
  });
};

/**
 * 等待
 * @param data {API.sleepReq}
 */
export const sleepMethod = (data: API.sleepReq): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/sleep`, {
    method: 'post',
    data,
  });
};
/**
 * 移动
 * @param data {API.MoveReq}
 */
export const moveMethod = (data: API.MoveReq): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/movething`, {
    method: 'post',
    data,
  });
};



/**
 * 加液
 * @param data {API.AddSolReq}
 */
export const addSolidMethod = (data: Methods.AddSolidReq): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/doaddsolid`, {
    method: 'post',
    data,
  });
};



/**
 * 加液
 * @param data {API.AddSolReq}
 */
export const addSolMethod = (data: API.AddSolReq): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/addsol`, {
    method: 'post',
    data,
  });
};
/**
 * 开盖
 * @param data {API.OpenCap}
 */
export const openCapMethod = (data: API.OpenCap): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/uncap`, {
    method: 'post',
    data,
  });
};
/**
 * 加盖
 * @param data {API.CloseCap}
 */
export const closeCapMethod = (data: API.CloseCap): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/recap`, {
    method: 'post',
    data,
  });
};
/**
 * 更换夹爪
 * @param data {API.ClawGripper}
 */
export const clawGripperMethod = (data: API.ClawGripper): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/chngtool`, {
    method: 'post',
    data,
  });
};
/**
 * 抬起枪头
 * @param data {API.PickTipReq}
 */
export const pickTipMethod = (data: API.PickTipReq): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/picktip`, {
    method: 'post',
    data,
  });
};

/**
 * 移动液体
 * @param data {API.LiquidMovementReq}
 */
export const liquidMovementMethod = (
  data: API.LiquidMovementReq,
): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/trnsliquid`, {
    method: 'post',
    data,
  });
};

/**
 * 移动固体料仓
 * @param data {API.SolidMovementReq}
 */
export const solidMovementMethod = (
  data: API.SolidMovementReq,
): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/mvsolid`, {
    method: 'post',
    data,
  });
};

/**
 * 蠕动泵加液
 * @param data
 */
export const doperistaltic = (data: API.DoPeristaltic): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/doperistaltic`, {
    method: 'post',
    data,
  });
};

/**
 * 搅拌3
 * @param data
 */
export const mix3 = (data: API.Mix3): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/methddomix3`, {
    method: 'post',
    data,
  });
};
/**
 * 废液蒸馏
 * @param data
 */
export const dodistillc3 = (data: Methods.DoDistillc3Req): Promise<Response<API.MethodsRes>> => {
  return request(`/api/v1/lab/methods/dodistillc3`, {
    method: 'post',
    data,
  });
};


/**
 * 获取指令调用历史
 * @param method_action
 * @param params
 */
export const getMethodHisByMethods = (method_action:string,params: API.Methods.GetMethodHisByMethodReq): Promise<Response<API.PagesRes<API.Methods.MethodHis>>> => {
  return request(`/api/v1/lab/methods/${method_action}/history`, {
    method: 'get',
    params,
  });
};
/**
 * 获取指令调用历史
 * @param method_action
 * @param params
 */
export const getMethodStatisticsByMethods = (method_action:string,params: API.Methods.GetMethodStatisticsByMethods): Promise<Response<API.Methods.MethodStatistics>> => {
  return request(`/api/v1/lab/methods/${method_action}/statistics`, {
    method: 'get',
    params,
  });
};
