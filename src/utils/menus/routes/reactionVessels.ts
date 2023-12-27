/**
 *  反应容器
 */

export const reactionVessels = [
  {
    path: '/exp/reaction-vessel',
    name: 'reactionVessel',
    icon: 'ExperimentOutlined',
    hideChildrenInMenu: true,

    routes: [
      {
        path: '/exp/reaction-vessel',
        redirect: '/exp/reaction-vessel/list',
      },
      // 反应容器列表
      {
        path: '/exp/reaction-vessel/list',
        name: 'list',
        component: './ReactionVessel/List',
      },
      // 创建反应容器
      {
        path: '/exp/reaction-vessel/create',
        name: 'create',
        component: './ReactionVessel/Create',
      },
      // 创建反应容器
      {
        path: '/exp/reaction-vessel/detail/:id',
        name: 'info',
        component: './ReactionVessel/Detail',
      },
    ],
  },
];
