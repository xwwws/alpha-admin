import { cancelExperimentById, getExperimentList, runExperimentById } from '@/api/experiments';
import { expState2ValueEnum, experimentStatesMap } from '@/utils/dataMaps';
import {
  BellFilled,
  PlayCircleFilled,
  PlusOutlined,
  ReadFilled,
  StopFilled,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Card, Tooltip, message } from 'antd';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'umi';
const ButtonWarpStyle = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const List: React.FC = () => {
  const tableRef = useRef<ActionType>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  /**
   * 执行实验
   * @param id
   */
  async function handleRun(id: string | number) {
    messageApi.open({
      key: 'run',
      type: 'loading',
      content: '正在加载...',
    });
    try {
      const { data } = await runExperimentById(id);
      tableRef.current?.reload();
      if (data) {
        messageApi.open({
          key: 'run',
          type: 'success',
          content: '实验开始执行',
          duration: 1.5,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  /**
   * 取消实验
   * @param id
   */
  async function handleCancel(id: string | number) {
    try {
      const { data } = await cancelExperimentById(id);
      tableRef.current?.reload();
      if (data) {
        messageApi.success('已取消');
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  const requestTableData = async (params: { pageSize: number; current: number }) => {
    const query = {
      page_size: params.pageSize,
      page: params.current,
    };
    const res = await getExperimentList(query);
    return {
      data: res.data.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.data.total,
    };
  };
  const columns: ProColumns<API.Experiments.List>[] = [
    {
      hideInSearch: true,
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
      hideInSearch: true,
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: expState2ValueEnum(experimentStatesMap),
    },
    {
      hideInSearch: true,
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      width: '150px',
      render: (text, record, index, action) => {
        return (
          <>
            {
              //  待提交  展示执行按钮
              record.status === 'draft' && (
                <Tooltip placement="top" title="运行">
                  <Button
                    type={'link'}
                    icon={<PlayCircleFilled />}
                    onClick={() => handleRun(record.id)}
                  ></Button>
                </Tooltip>
              )
            }
            {
              //  等待执行 执行中   展示执行按钮
              (record.status === 'waiting' || record.status === 'doing') && (
                <Tooltip placement="top" title="取消">
                  <Button
                    type={'link'}
                    icon={<StopFilled />}
                    onClick={() => handleCancel(record.id)}
                  ></Button>
                </Tooltip>
              )
            }
            {/*实验详情一直展示*/}
            <Tooltip placement="top" title="实验详情">
              <Button
                type={'link'}
                icon={<BellFilled />}
                onClick={() => navigate(`/experiment/${record.id}/detail`)}
              ></Button>
            </Tooltip>
            {
              //  成功  失败  取消  展示实验记录
              (record.status === 'succeed' ||
                record.status === 'failed' ||
                record.status === 'canceled') && (
                <Tooltip placement="top" title="实验记录">
                  <Button
                    type={'link'}
                    icon={<ReadFilled />}
                    onClick={() => navigate(`/experiment/${record.id}/record`)}
                  ></Button>
                </Tooltip>
              )
            }
          </>
        );
      },
    },
  ];
  return (
    <>
      {contextHolder}
      <PageContainer>
        <Card>
          <ButtonWarpStyle>
            <Button
              icon={<PlusOutlined />}
              type={'primary'}
              onClick={() => navigate('/exp/experiment/create')}
            >
              创建实验
            </Button>
          </ButtonWarpStyle>
          <ProTable
            pagination={{
              pageSize: 10,
            }}
            actionRef={tableRef}
            columns={columns}
            options={false}
            rowKey="id"
            request={requestTableData}
          />
        </Card>
      </PageContainer>
    </>
  );
};

export default List;
