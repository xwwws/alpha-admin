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
export const outLogin = (): any => {
  return Promise.resolve({
    status: 'ok',
    code: 200,
    data: {},
  });
};

/**
 * 修改密码
 * @param data
 */
export const changePass = (data: {passwd:string}) => {
  return request<any>('/api/v1/auth/changepass',{
    method: 'post',
    data
  })
}
