export const project = [
  {
    path: '/project',
    name: 'project',
    icon: 'crown',
    hideChildrenInMenu: true,
    // access: 'canAdmin',
    routes: [
      {
        path: '/project',
        redirect: '/project/list',
      },
      {
        path: 'list',
        name: 'list',
        component: './Project/List',
      },
      {
        path: 'create',
        name: 'create',
        component: './Project/Create',
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: './Project/Edit',
      }
    ],
  },
]
