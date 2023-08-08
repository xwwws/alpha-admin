/**
 * 登录
 * @param data {API.UserLoginReq}
 */
export const login = (data: API.UserLoginReq): Promise<API.response<API.UserLoginRes>> => {
  return Promise.resolve({
    status: 'ok',
    code: 200,
    data: {
      token: 'asdfadfdfasdfasdfasdfasdfa',
    },
  });
  // return request<API.MethodsRes>(`/api/user/login`, {
  //   method: 'post',
  //   data,
  // });
};

/**
 * 查询用户信息
 */
export const currentUser = (): Promise<API.response<API.UserInfoRes>> => {
  return Promise.resolve({
    status: 'ok',
    code: 200,
    data: {
      username: 'wangzhen',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
  });
  // return request<API.MethodsRes>(`/api/user/info`, {
  //   method: 'post',
  //   data,
  // });
};
/**
 * 退出登录
 */
export const outLogin = (): Promise<API.response<API.LogoutReq>> => {
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
