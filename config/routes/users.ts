export const users = [
  {
    path: '/account/users',
    name: 'users',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/account/users',
        redirect: '/account/users/list',
      },
      {
        name: 'list',
        path: '/account/users/list',
        component: './Account/Users/List',
      },
      {
        name: 'create',
        path: '/account/users/create',
        component: './Account/Users/Create',
      },
      {
        name: 'edit',
        path: '/account/users/edit',
        component: './Account/Users/Edit',
      },
      {
        name: 'allocationRoles',
        path: '/account/users/allocation-roles',
        component: './Account/Users/AllocationRoles',
      },
    ]
  },
  // {
  //   name: 'roles',
  //   path: '/account/roles',
  //   component: './Account/Roles/List',
  // },
  // {
  //   name: 'menus',
  //   path: '/account/menus',
  //   component: './Account/Menus/List',
  // },

];
