import {
  AlignLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  StopOutlined
} from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, message, Popconfirm, Tooltip } from 'antd';
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { formatColumns, tableTimeRender } from "@/utils/componentSettingUtils";
import { useNavigate } from "umi";
import { cancelFlow, deleteFlow, getFlowList, runFlow, statusFlow } from "@/api/flows";
import { experimentStatesMap, expState2ValueEnum } from "@/utils/dataMaps";

interface IProps {
  [key: string]: any;
}

const timeRender = tableTimeRender();

const List: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const [ messageApi, contextHolder ] = message.useMessage();

  /**
   * 列表操作按钮
   */
  /**
   * 开始执行
   * @param item
   */
  const handleStart = async (item: Flows.List) => {
    await runFlow(item.id);
    messageApi.success('开始执行');
    tableRef.current?.reload();
  };
  /**
   * 删除
   * @param item
   */
  const handleDelete = async (item: Flows.List) => {
    await deleteFlow(item.id);
    messageApi.success('已经删除');
    tableRef.current?.reload();
  };
  /**
   * 取消
   * @param item
   */
  const handleCancel = async (item: Flows.List) => {
    await cancelFlow(item.id);
    messageApi.success('已取消');
    tableRef.current?.reload();
  };
  /**
   * 暂停/继续
   * @param item
   * @param status
   */
  const handlePauseOrRunning = async (item: Flows.List, status: 'running' | 'pause') => {
    await statusFlow(item.id, { status });
    messageApi.success(`已${status === 'pause' ? '暂停' : '继续执行'}`);
    tableRef.current?.reload();
  };


  const columns: ProColumns<Flows.List>[] = formatColumns<Flows.List>([
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    {
      hideInSearch: true,
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: expState2ValueEnum(experimentStatesMap),
    },
    { title: '创建账号', dataIndex: 'user_username' },
    { title: '所属项目', dataIndex: 'project_name' },
    // @ts-ignore
    { title: '创建时间', dataIndex: 'created_at', render: timeRender },
    { title: '项目描述', dataIndex: 'description' },
    {
      title: '操作', dataIndex: 'actions', render: (text, item: Flows.List) => {
        const runBtn = <Tooltip key={'detail'} title={'开始执行'}>
          <Button
            icon={<PlayCircleOutlined/>}
            type={'link'}
            onClick={() => handleStart(item)}
          />
        </Tooltip>;
        const cancelBtn = <Tooltip key={'cancel'} title="取消执行">
          <Button
            type={'link'}
            icon={<StopOutlined/>}
            onClick={() => handleCancel(item)}
          ></Button>
        </Tooltip>;
        const pauseBtn = <Tooltip key={'pause'} title="暂停">
          <Button
            type={'link'}
            icon={<PauseCircleOutlined/>}
            onClick={() => handlePauseOrRunning(item, "pause")}
          ></Button>
        </Tooltip>;
        const reRunBtn = <Tooltip key={'reRun'} title="继续">
          <Button
            type={'link'}
            icon={<PlayCircleOutlined/>}
            onClick={() => handlePauseOrRunning(item, "running")}
          ></Button>
        </Tooltip>;
        const detailBtn = <Tooltip key={'detail'} title={'作业流程详情'}>
          <Button
            icon={<AlignLeftOutlined/>}
            type={'link'}
            onClick={() => navigate(`/exp/flow/${item.id}/detail`)}
          />
        </Tooltip>;
        const recordBtn = <Tooltip key={'record'} title="作业流程记录">
          <Button
            type={'link'}
            icon={<OrderedListOutlined/>}
            onClick={() => navigate(`/exp/flow/${item.id}/record`)}
          ></Button>
        </Tooltip>;
        const editBtn = <Tooltip key={'edit'} title="编辑">
          <Button
            type={'link'}
            icon={<EditOutlined/>}
            onClick={() => navigate(`/project/edit/${item.id}`)}
          />
        </Tooltip>;
        const delBtn = <Popconfirm
          key="del"
          title={`删除 ${item.name}`}
          description={`是否确认删除${item.name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => handleDelete(item)}
        >
          <Tooltip title="删除">
            <Button
              type={'link'}
              danger
              icon={<DeleteOutlined/>}
            />
          </Tooltip>
        </Popconfirm>;
        return <>
          {/*只有“等待提交”的实验可以提交*/}
          {(item.status === 'waiting') && runBtn}
          {/*取消作业流程:*/}
          {/*“待提交”,“等待执行",“执行中”,"失败"的实验都可以取消*/}
          {/*“执行中”和失败的实验，取消未开始执行的作业流程节点*/}
          {
            (
              item.status === 'draft' ||
              item.status === 'waiting' ||
              item.status === 'doing' ||
              item.status === 'failed'
            ) && cancelBtn
          }
          {/*凡是doing中的展示*/}
          {item.status === 'doing' && pauseBtn}
          {item.status === 'doing' && reRunBtn}
          {/*详情*/}
          {detailBtn}
          {/*记录*/}
          {recordBtn}
          {/*编辑*/}
          {/*{editBtn}*/}
          {/*删除*/}
          {delBtn}
        </>;
      }
    },
  ]);
  const tableRef = useRef<ActionType>();

  const requestTableData = async (params: { pageSize: number, current: number }) => {
    const query: Flows.ListReq = {
      page_size: params.pageSize,
      page: params.current,
    };
    const res = await getFlowList(query);
    return {
      data: res.data.data,
      success: true,
      total: res.data.total
    };

  };
  return (
    <PageContainer
      extra={[
        <Button
          key={'create'}
          type="primary"
          icon={<PlusOutlined/>}
          onClick={() => navigate('/exp/flow/create')}
        >
          新建作业流程
        </Button>
      ]}
    >

      {contextHolder}
      <Card>
        <ProTable
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          actionRef={tableRef}
          columns={columns}
          search={false}
          options={false}
          request={requestTableData}
        >
        </ProTable>
      </Card>
    </PageContainer>
  );
};
export default List;
