export const methods = [
  {
    path: '/methods',
    name: 'methods',
    icon: 'TagOutlined',
    // access: 'canAdmin',

    routes: [
      {
        path: '/methods',
        redirect: '/methods/read',
      },
      // 读值
      {
        path: 'read',
        name: 'read',
        component: './Methods/Read',
      },
      // 写值
      {
        path: 'write',
        name: 'write',
        component: './Methods/Write',
      },
      // 等待
      {
        path: 'sleep',
        name: 'sleep',
        component: './Methods/Sleep',
      },
      // 移动
      {
        path: 'move',
        name: 'move',
        component: './Methods/Move',
      },
      // 加液
      {
        path: 'add-sol',
        name: 'addSol',
        component: './Methods/AddSol',
      },
      // 开盖
      {
        path: 'open-cap',
        name: 'openCap',
        component: './Methods/OpenCap',
      },
      // 加盖
      {
        path: 'close-cap',
        name: 'closeCap',
        component: './Methods/CloseCap',
      },
      // 更换夹爪
      {
        path: 'claw-gripper',
        name: 'clawGripper',
        component: './Methods/ClawGripper',
      },
      // 抬起枪头
      {
        path: 'pick-tip',
        name: 'pickTip',
        component: './Methods/PickTip',
      },

      // 移液
      {
        path: 'liquid-movement',
        name: 'liquidMovement',
        component: './Methods/LiquidMovement',
      },

      // 移动固体料仓
      {
        path: 'solid-movement',
        name: 'solidMovement',
        component: './Methods/SolidMovement',
      },

      // 蠕动泵加液
      {
        path: 'doperistaltic',
        name: 'doperistaltic',
        component: './Methods/DoPeristaltic',
      },
      // 搅拌3
      {
        path: 'mix3',
        name: 'mix3',
        component: './Methods/Mix3',
      },
      // 废液蒸馏
      {
        path: 'dodistillc3',
        name: 'dodistillc3',
        component: './Methods/Dodistillc3',
      },
    ],
  },
];
