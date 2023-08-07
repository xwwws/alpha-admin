export const experiments = [
  {
    path: '/experiment',
    name: 'experiment',
    icon: 'AreaChartOutlined',
    // access: 'canAdmin',

    routes: [
      {
        path: '/experiment',
        redirect: '/experiment/list',
      },
      // 实验列表
      {
        path: 'list',
        name: 'experimentList',
        component: './Experiments/List',
      },
    ],
  },
];
