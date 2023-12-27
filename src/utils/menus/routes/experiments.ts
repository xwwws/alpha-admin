export const experiments = [
  {
    path: '/exp/experiment',
    name: 'experiment',
    icon: 'AreaChartOutlined',
    hideChildrenInMenu: true,
    // access: 'canAdmin',

    routes: [
      {
        path: '/exp/experiment',
        redirect: '/exp/experiment/list',
      },
      // 实验列表

      {
        path: '/exp/experiment/list',
        name: 'experimentList',
        component: './Experiments/List',
      },

      // 创建实验
      {
        path: '/exp/experiment/create',
        name: 'experimentCreate',
        component: './Experiments/Create',
      },

      // 实验详情
      {
        path: '/exp/experiment/:id/detail',
        name: 'experimentDetail',
        component: './Experiments/Detail',
      },
      // 实验记录
      {
        path: '/exp/experiment/:id/record',
        name: 'experimentRecord',
        component: './Experiments/Record',
      },
    ],
  },
];
