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
      // 蠕动泵加液
      {
        path: 'doperistaltic',
        name: 'doperistaltic',
        component: './Steps/DoPeristaltic',
      },
      // 搅拌3
      {
        path: 'mix3',
        name: 'mix3',
        component: './Steps/Mix3',
      },
      // 行星搅拌3
      {
        path: 'mix3planet',
        name: 'mix3planet',
        component: './Steps/Mix3Planet',
      },
      // 废液蒸馏
      {
        path: 'dodistillc3',
        name: 'dodistillc3',
        component: './Steps/Dodistillc3',
      },
    ],
  },
];
