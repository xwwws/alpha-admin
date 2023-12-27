export const menus = [
  {
    path: '/system/menus',
    name: 'menus',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/system/menus',
        redirect: '/system/menus/list',
      },
      {
        name: 'list',
        path: '/system/menus/list',
        component: './System/Menus/List',
      },
      {
        name: 'create',
        path: '/system/menus/create/:pid',
        component: './System/Menus/Create',
      },
      {
        name: 'edit',
        path: '/system/menus/edit/:id',
        component: './System/Menus/Edit',
      },
      {
        name: 'assignPermissions',
        path: '/system/menus/:id/assign-permissions',
        component: './System/Menus/AssignPermissions',
      },
    ]
  }
];
