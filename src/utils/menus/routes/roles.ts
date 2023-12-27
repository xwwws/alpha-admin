export const roles = [
  {
    path: '/system/roles',
    name: 'roles',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/system/roles',
        redirect: '/system/roles/list',
      },
      {
        name: 'list',
        path: '/system/roles/list',
        component: './System/Roles/List',
      },
      {
        name: 'create',
        path: '/system/roles/create',
        component: './System/Roles/Create',
      },
      {
        name: 'edit',
        path: '/system/roles/:userId/edit',
        component: './System/Roles/Edit',
      },
    //   AssignMenus

      {
        name: 'assignMenu',
        path: '/system/roles/:roleId/assign-menu',
        component: './System/Roles/AssignMenus',
      },
    ]
  }
];
