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
        component: './Reagents/List',
      },
      // 创建试剂
      {
        path: '/reagent/create',
        name: 'create',
        component: './Reagents/Create',
      },
      // 创建试剂
      {
        path: '/reagent/edit/:id',
        name: 'edit',
        component: './Reagents/Create',
      },
    ],
  },
];
