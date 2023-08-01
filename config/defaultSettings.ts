// @ts-ignore
import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "light",
  colorPrimary: "#1890ff",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  pwa: true,
  logo: "/logo.png",
  siderMenuType: "sub",
  splitMenus: false,
  // 拂晓蓝
  colorWeak: false,
  title: '计算化学合成平台监管系统',
  iconfontUrl: '',
  token: {
  },
};

export default Settings;
