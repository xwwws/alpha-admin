export const trays = [
  {
    path: '/exp/tray',
    name: 'tray',
    icon: 'AreaChartOutlined',
    hideChildrenInMenu: true,
    // access: 'canAdmin',

    routes: [
      {
        path: '/exp/tray',
        redirect: '/exp/tray/list',
      },
      // 试剂列表
      {
        path: '/exp/tray/list',
        name: 'trayList',
        component: './Trays/List',
      },
    ],
  },
];
