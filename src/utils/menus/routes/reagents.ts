export const reagents = [
  {
    path: '/exp/reagent',
    name: 'reagent',
    icon: 'AreaChartOutlined',
    hideChildrenInMenu: true,
    // access: 'canAdmin',

    routes: [
      {
        path: '/exp/reagent',
        redirect: '/exp/reagent/list',
      },
      // 试剂列表
      {
        path: '/exp/reagent/list',
        name: 'reagentList',
        component: './Reagents/List',
      },
      // 创建试剂
      {
        path: '/exp/reagent/create',
        name: 'create',
        component: './Reagents/Create',
      },
      // 创建试剂
      {
        path: '/exp/reagent/edit/:id',
        name: 'edit',
        component: './Reagents/Create',
      },
    ],
  },
];
