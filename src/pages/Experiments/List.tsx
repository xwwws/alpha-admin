import { getExperimentList } from '@/api/experiments';
import { experimentStatesMap } from '@/utils/dataMaps';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Badge, Button, Card } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
const List: React.FC = () => {
  const requestTableData = async () => {
    const res = await getExperimentList({ limit: 100 });
    return {
      data: res,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.length,
    };
  };
  const columns: ProColumns<API.Experiments.List>[] = [
    {
      // hideInSearch: true,
      title: '实验名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '创建时间',
      dataIndex: 'created_at',
      align: 'center',
      render: (text, item, index) => {
        return <span>{dayjs(text as string).format('YYYY-MM-DD hh:mm:ss')}</span>;
      },
    },
    {
      hideInSearch: true,
      title: '试剂瓶位置',
      dataIndex: 'bottle_area',
      align: 'center',
      render: (cur: any, item, index) => {
        return (
          <>
            <div>x: {cur.x}</div>
            <div>y: {cur.y}</div>
            <div>z: {cur.z}</div>
          </>
        );
      },
    },
    {
      hideInSearch: true,
      title: '试剂瓶高度',
      dataIndex: 'bottle_height',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => {
        const currentState = experimentStatesMap.find((item) => item.value === text);
        let badgeStatus: string = '';
        switch (currentState?.value) {
          case 'draft':
            badgeStatus = 'blue';
            break;
          case 'waiting':
            badgeStatus = 'gold';
            break;
          case 'doing':
            badgeStatus = 'geekblue';
            break;
          case 'succeed':
            badgeStatus = 'green';
            break;
          case 'canceled':
            badgeStatus = 'gray';
            break;
          case 'failed':
            badgeStatus = 'red';
            break;
        }
        return (
          <>
            <Badge color={badgeStatus} text={currentState?.label} />
          </>
        );
      },
    },

    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text) => {
        return (
          <>
            <Button type={'text'}>adf</Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <PageContainer>
        <Card>
          <ProTable columns={columns} options={false} rowKey="id" request={requestTableData} />
        </Card>
      </PageContainer>
    </>
  );
};

export default List;
