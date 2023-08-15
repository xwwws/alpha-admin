export const reagents = [
  {
    path: '/reagent',
    name: 'reagent',
    icon: 'AreaChartOutlined',
    hideChildrenInMenu: true,
    // access: 'canAdmin',

    routes: [
      {
        path: '/reagent',
        redirect: '/reagent/list',
      },
      // 试剂列表
      {
        path: '/reagent/list',
        name: 'reagentList',
        component: './reagents/List',
      },
    ],
  },
];
