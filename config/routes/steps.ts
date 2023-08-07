export const steps = [
  {
    path: '/steps',
    name: 'steps',
    icon: 'OrderedListOutlined',
    // access: 'canAdmin',

    routes: [
      {
        path: '/steps',
        redirect: '/steps/add-solvent',
      },
      // 加液
      {
        path: 'add-solvent',
        name: 'addSolvent',
        component: './Steps/AddSolvent',
      },
      // 移液
      {
        path: 'pipette',
        name: 'pipette',
        component: './Steps/Pipette',
      },
      // 加固
      {
        path: 'add-solid',
        name: 'addSolid',
        component: './Steps/AddSolid',
      },
    ],
  },
];
