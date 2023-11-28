export const flows = [
  {
    path: '/exp/flow',
    name: 'flow',
    icon: 'ContainerOutlined',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/exp/flow',
        redirect: '/exp/flow/list',
      },
      {
        path: '/exp/flow/list',
        name: 'list',
        component: './Flow/List',
      },
      {
        path: '/exp/flow/create',
        name: 'create',
        component: './Flow/Create',
      },
      {
        path: '/exp/flow/:id/detail',
        name: 'detail',
        component: './Flow/Detail',
      },
    ]
  }
]
