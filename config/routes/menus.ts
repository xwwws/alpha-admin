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
      }
    ]
  }
];
