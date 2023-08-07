export const steps = [
  {
    path: '/steps',
    name: 'steps',
    icon: 'OrderedListOutlined',
    // access: 'canAdmin',

    routes: [
      {
        path: '/steps',
        redirect: '/steps/read',
      },
      // 读值
      {
        path: 'add-solvent',
        name: 'addSolvent',
        component: './Steps/AddSolvent',
      },
    ],
  },
];
