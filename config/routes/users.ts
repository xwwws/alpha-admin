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
      }
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
