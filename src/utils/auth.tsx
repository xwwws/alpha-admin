const TOKEN = 'token';
const USER_INFO = 'user_info';
export const SET_TOKEN = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
export const CLEAR_TOKEN = () => {
  localStorage.removeItem(TOKEN);
};
export const CLEAR_USER = () => {
  localStorage.removeItem(USER_INFO);
};
export const SET_USER = (userInfo: object) => {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
};
export const GET_TOKEN = () => {
  return localStorage.getItem(TOKEN);
};
export const GET_USER = () => {
  return JSON.parse(localStorage.getItem(USER_INFO) as string);
};

export const setUser = async (user: { username: string; token: string }) => {
  const { username, token } = user;
  return new Promise((resolve, reject) => {
    SET_TOKEN(token);
    const user = {
      username,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    };
    SET_USER(user);
    resolve(user);
  });
};
export const getUser = async () => {
  return new Promise((resolve, reject) => {
    resolve(GET_USER());
  });
};
