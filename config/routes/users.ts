export const users = [
  {
    path: '/system/users',
    name: 'users',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/system/users',
        redirect: '/system/users/list',
      },
      {
        name: 'list',
        path: '/system/users/list',
        component: './System/Users/List',
      },
      {
        name: 'create',
        path: '/system/users/create',
        component: './System/Users/Create',
      },
      {
        name: 'edit',
        path: '/system/users/:userId/edit',
        component: './System/Users/Edit',
      },
      {
        name: 'allocationRoles',
        path: '/system/users/:userId/allocation-roles',
        component: './System/Users/AllocationRoles',
      },
    ]
  },
  // {
  //   name: 'roles',
  //   path: '/system/roles',
  //   component: './System/Roles/List',
  // },
  // {
  //   name: 'menus',
  //   path: '/system/menus',
  //   component: './System/Menus/List',
  // },

];
