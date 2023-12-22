export const roles = [
  {
    path: '/account/roles',
    name: 'roles',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/account/roles',
        redirect: '/account/roles/list',
      },
      {
        name: 'list',
        path: '/account/roles/list',
        component: './Account/Roles/List',
      },
      {
        name: 'create',
        path: '/account/roles/create',
        component: './Account/Roles/Create',
      },
      {
        name: 'edit',
        path: '/account/roles/:userId/edit',
        component: './Account/Roles/Edit',
      },
    //   AssignPermissions

      {
        name: 'assignPermissions',
        path: '/account/roles/:userId/assign-permissions',
        component: './Account/Roles/AssignPermissions',
      },
    ]
  }
];
