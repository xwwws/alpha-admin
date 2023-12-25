export const menus = [
  {
    path: '/account/menus',
    name: 'menus',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/account/menus',
        redirect: '/account/menus/list',
      },
      {
        name: 'list',
        path: '/account/menus/list',
        component: './Account/Menus/List',
      },
      {
        name: 'create',
        path: '/account/menus/create/:pid',
        component: './Account/Menus/Create',
      },
      {
        name: 'edit',
        path: '/account/menus/edit/:id',
        component: './Account/Menus/Edit',
      },
      {
        name: 'assignPermissions',
        path: '/account/menus/:id/assign-permissions',
        component: './Account/Menus/AssignPermissions',
      },
    ]
  }
];
