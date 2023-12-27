import { experiments } from './routes/experiments';
import { methods } from './routes/methods';
import { reagents } from './routes/reagents';
import { reactionVessels } from './routes/reactionVessels';
import { steps } from './routes/steps';
import { trays } from './routes/trays';
import { project } from "./routes/project";
import { users } from "./routes/users";
import { devices } from "./routes/devices";
import { flows } from "./routes/flows";
import { others } from "./routes/others";
import { roles } from "./routes/roles";
import { menus } from "./routes/menus";
import { AreaChartOutlined, HddOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons';

// 文档地址  https://v3.umijs.org/zh-CN/plugins/plugin-layout
//config/route.ts
/*
export const routes: IBestAFSRoute[] = [
  {
    path: '/welcome',
    component: 'IndexPage',
    name: '欢迎', // 兼容此写法
    icon: 'testicon',
    // 更多功能查看
    // https://beta-pro.ant.design/docs/advanced-menu
    // ---
    // 新页面打开
    target: '_blank',
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 权限配置，需要与 plugin-access 插件配合使用
    access: 'canRead',
    // 隐藏子菜单
    hideChildrenInMenu: true,
    // 隐藏自己和子菜单
    hideInMenu: true,
    // 在面包屑中隐藏
    hideInBreadcrumb: true,
    // 子项往上提，仍旧展示,
    flatMenu: true,
  },
];

*/

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  ...others,
  {
    path: '/welcome',
    name: 'welcome',
    icon: <SmileOutlined />,
    component: './Welcome',
  },
  {
    path: '/account',
    name: 'account',
    icon: <SettingOutlined />,
    routes: [

      {
        path: '/account',
        redirect: '/account/users',
      },

      ...users,
      ...roles,
      ...menus,


      // 修改密码
      {
        hideInMenu: true,
        name: 'changePwd',
        path: '/account/change-pwd',
        component: './User/ChangePwd/ChangePwd',
      }

    ],
  },
  {
    path: '/device',
    name: 'device',
    icon: <HddOutlined/>,
    hideChildrenInMenu: true,
    routes: [
      ...devices
    ],
  },
  ...methods,
  ...steps,
  {
    path: '/exp',
    name: 'exp',
    icon: <AreaChartOutlined/>,
    routes: [
      ...reagents,
      ...trays,
      ...experiments,
      ...flows,
      ...reactionVessels
    ],
  },
  ...project,
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
