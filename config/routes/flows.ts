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
        path: '/flow/list',
        name: 'list',
        component: './Flow/List',
      },
      {
        path: '/flow/create',
        name: 'create',
        component: './Flow/Create',
      },
      {
        path: '/flow/:id/detail',
        name: 'detail',
        component: './Flow/Detail',
      },
    ]
  }
]
