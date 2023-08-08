export const experiments = [
  {
    path: '/experiment',
    name: 'experiment',
    icon: 'AreaChartOutlined',
    hideChildrenInMenu: true,
    // access: 'canAdmin',

    routes: [
      {
        path: '/experiment',
        redirect: '/experiment/list',
      },
      // 实验列表

      {
        path: '/experiment/list',
        name: 'experimentList',
        component: './Experiments/List',
      },

      // 实验详情
      {
        path: '/experiment/:id/detail',
        name: 'experimentDetail',
        component: './Experiments/Detail',
      },
      // 实验记录
      {
        path: '/experiment/:id/record',
        name: 'experimentRecord',
        component: './Experiments/Record',
      },
    ],
  },
];
