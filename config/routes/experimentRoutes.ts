export const experimentRoutes = [
  {
    path: '/experiment',
    name: 'experiment',
    icon: 'crown',
    // access: 'canAdmin',
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
      // 开盖
      {
        path: 'open-cap',
        name: 'openCap',
        component: './Experiment/OpenCap',
      },
      // 加盖
      {
        path: 'close-cap',
        name: 'closeCap',
        component: './Experiment/CloseCap',
      },
      // 更换夹爪
      {
        path: 'claw-gripper',
        name: 'clawGripper',
        component: './Experiment/ClawGripper',
      },
      // 抬起枪头
      {
        path: 'pick-tip',
        name: 'pickTip',
        component: './Experiment/PickTip',
      },

      // 移液
      {
        path: 'liquid-movement',
        name: 'liquidMovement',
        component: './Experiment/LiquidMovement',
      },

      // 移动固体料仓
      {
        path: 'solid-movement',
        name: 'solidMovement',
        component: './Experiment/SolidMovement',
      },
    ],
  },
];
