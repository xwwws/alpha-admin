export const methods = [
  {
    path: '/methods',
    name: 'methods',
    icon: 'crown',
    // access: 'canAdmin',

    routes: [
      {
        path: '/methods',
        redirect: '/Methods/read',
      },
      // 读值
      {
        path: 'read',
        name: 'read',
        component: './Methods/Read',
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
    ],
  },
];
