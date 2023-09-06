import { request } from '@umijs/max';
/**
 * 登录
 * @param data {API.UserLoginReq}
 */
export const login = (data: API.UserLoginReq): Promise<Response<API.UserLoginRes>> => {
  return request(`/api/v1/auth/login`, {
    method: 'post',
    data,
  });
};

/**
 * 退出登录
 */
export const outLogin = (): Promise<Response<API.LogoutReq>> => {
  return Promise.resolve({
    status: 'ok',
    code: 200,
    data: {},
  });
  // return request<API.MethodsRes>(`/api/user/info`, {
  //   method: 'post',
  //   data,
  // });
};
