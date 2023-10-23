import { AlignLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tag, Tooltip, message } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from "@@/exports";
import { formatColumns } from "@/utils/componentSettingUtils";
import { deleteReactionVessel, getReactionVesselList } from "@/api/reactionVessel";

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const tableRef = useRef<ActionType>();
  const requestTableData = async (params: { pageSize: number; current: number }) => {
    const query: API.PagesReq = {
      page_size: params.pageSize,
      page: params.current,
    };
    const res = await getReactionVesselList(query);
    return {
      data: res.data.data,
      success: true,
      total: res.data.total,
    };
  };
  const deleteVessel = async (item: API.ReactionVessel.List) => {
    await deleteReactionVessel(item.id)
    message.success(`${item.vessel_name}已删除`)
    tableRef.current?.reload()
  }
  const showDetail = () => {

  }
  const columns: ProColumns<API.ReactionVessel.List>[] = formatColumns<API.ReactionVessel.List>([
    { title: 'ID', dataIndex: 'id' },
    { title: '容器名称', dataIndex: 'vessel_name' },
    { title: '序列号', dataIndex: 'serial_number' },
    { title: '位置id', dataIndex: 'area_position_id' },
    { title: 'label', dataIndex: 'label' },
    {
      title: '是否可循环使用',
      width: '200px',
      dataIndex: 'recyclable',
      render: recyclable => (
        recyclable ? <Tag color="default">不可循环使用</Tag> : <Tag color="success">可循环使用</Tag>
      )
    },
    {
      title: '是否空闲',
      dataIndex: 'in_use',
      render: isUse => (
        isUse ? <Tag color="orange">繁忙</Tag> : <Tag color="success">空闲</Tag>
      )
    },
    { title: '使用时长(s)', dataIndex: 'used_times' },
    { title: '废弃时间', dataIndex: 'discarded_at', width: '200px' },
    { title: '创建时间', dataIndex: 'created_at', width: '200px' },
    { title: '更新时间', dataIndex: 'updated_at', width: '200px' },
    {
      title: '操作',
      fixed: 'right',
      render: (text,record,index) => [

        <Tooltip placement="top" title="详情" key={'detail'}>
          <Button
            type={'link'}
            icon={<AlignLeftOutlined/>}
            onClick={() => navigate(`/exp/reaction-vessel/detail/${record.id}`)}
          ></Button>
        </Tooltip>,
        <Popconfirm
          key="del"
          title={`删除`}
          description={`是否确认删除${record.vessel_name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => deleteVessel(record)}
        >
          <Tooltip placement="top" title="删除">
            <Button
              type={'link'}
              danger
              icon={<DeleteOutlined/>}
            />
          </Tooltip>
        </Popconfirm>
      ]
    },
  ]);

  return (
    <PageContainer
      extra={[
        <Button
          key={'add'}
          icon={<PlusOutlined/>}
          type={'primary'}
          onClick={() => navigate('/exp/reaction-vessel/create')}
        >
          创建反应容器
        </Button>,
      ]}
    >
      <Card>
        <Card>
          <ProTable
            pagination={{
              pageSize: 10,
            }}
            actionRef={tableRef}
            columns={columns}
            search={false}
            options={false}
            rowKey="id"
            request={requestTableData}
            scroll={{ x: 1700 }}
          />
        </Card>
      </Card>
    </PageContainer>
  );
};

export default List;
