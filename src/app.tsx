import { AvatarDropdown, AvatarName } from '@/components';
import { getUser } from '@/utils/auth';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
console.log(process.env, 'env')
console.log(WS_URL, 'WS_URL')
console.log(BASE_URL, 'BASE_URL')

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
interface IgetInitialState {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfoRes;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserInfoRes | undefined>;
}

export async function getInitialState(): Promise<IgetInitialState> {
  const fetchUserInfo = async (): Promise<API.UserInfoRes | undefined> => {
    try {
      const user = await getUser();
      return user as API.UserInfoRes;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  return {
    bgLayout:'red',
    // 头部右侧按钮
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    actionsRender: () => [],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 水印
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    // 暂时不需要渲染footer
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 导航底部按钮
    // links: isDev ? [<Link key="openapi" to="/umi/plugin/openapi" target="_blank"><LinkOutlined /><span>OpenAPI 文档</span></Link>,] : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,

};
