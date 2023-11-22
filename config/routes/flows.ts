export const flows = [
  {
    path: '/flow',
    name: 'flow',
    icon: 'ContainerOutlined',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/flow',
        redirect: '/flow/list',
      },
      {
        path: 'list',
        name: 'list',
        component: './Flow/List',
      },
      {
        path: 'create',
        name: 'create',
        component: './Flow/Create',
      },
    ]
  }
]
