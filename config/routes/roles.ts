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
      }
    ]
  }
];
