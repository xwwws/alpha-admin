import { experiments } from './routes/experiments';
import { methods } from './routes/methods';
import { reagents } from './routes/reagents';
import { steps } from './routes/steps';
import { trays } from './routes/trays';

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
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  ...methods,
  ...steps,
  {
    path: '/exp',
    name: 'exp',
    icon: 'AreaChartOutlined',
    routes: [...reagents, ...trays, ...experiments],
  },

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
