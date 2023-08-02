export const experimentRoutes = [
  {
    path: '/experiment',
    name: 'experiment',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/experiment',
        redirect: '/experiment/read',
      },
      // 读值
      {
        path: 'read',
        name: 'read',
        component: './Experiment/Read',
      },
      // 移动
      {
        path: 'move',
        name: 'move',
        component: './Experiment/Move',
      },
    ],
  },
];
