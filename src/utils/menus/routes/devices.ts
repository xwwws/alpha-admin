export const devices = [
  {
    path: '/device',
    redirect: '/device/devices',
  },
  {
    path: 'devices',
    name: 'devices',
    routes: [
      {
        path: '/device/devices',
        redirect: '/device/devices/list',
      },
      {
        path: 'list',
        name: 'list',
        component: './Device/Devices',
      }
    ]
  },
];
