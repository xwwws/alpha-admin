import { CrownOutlined } from "@ant-design/icons";

export const project = [
  {
    path: '/project',
    name: 'project',
    icon: <CrownOutlined />,
    hideChildrenInMenu: true,
    // access: 'canAdmin',
    routes: [
      {
        path: '/project',
        redirect: '/project/list',
      },
      {
        path: 'list',
        name: 'list',
        component: './Project/List',
      },
      {
        path: 'create',
        name: 'create',
        component: './Project/Create',
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: './Project/Edit',
      },
      {
        path: 'pro-add-data/:proId',
        name: 'proAddData',
        component: './Project/ProAddData',
      },
      {
        path: 'pro-data-List/:proId',
        name: 'proListData',
        component: './Project/ProDataList',
      },
      {
        path: 'pro-data-info/:proDataId',
        name: 'proListInfo',
        component: './Project/ProDataInfo',
      },
      {
        path: 'pro-data-edit/:proDataId',
        name: 'proListEdit',
        component: './Project/ProDataEdit',
      }
    ],
  },
]
