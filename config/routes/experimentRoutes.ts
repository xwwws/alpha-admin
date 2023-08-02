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
      // 等待
      {
        path: 'sleep',
        name: 'sleep',
        component: './Experiment/Sleep',
      },
      // 移动
      {
        path: 'move',
        name: 'move',
        component: './Experiment/Move',
      },
      // 加液
      {
        path: 'add-sol',
        name: 'addSol',
        component: './Experiment/AddSol',
      },
    ],
  },
];
