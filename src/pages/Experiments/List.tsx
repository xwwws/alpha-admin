import {
  cancelExperimentById,
  deleteExperiment,
  getExperimentList, reRunExp,
  runExperimentById,
  updateExecStatus
} from '@/api/experiments';
import { expState2ValueEnum, experimentStatesMap } from '@/utils/dataMaps';
import {
  AlignLeftOutlined,
  CopyOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  OrderedListOutlined,
  StopOutlined,
  DeleteOutlined,
  EditOutlined,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  MoreOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Card, Dropdown, Form, Popconfirm, Tooltip, message } from 'antd';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'umi';
import { getProjects } from "@/api/project";
import EditExpDesc from "@/pages/Experiments/components/EditExpDesc";

interface IProjectIdsMap {
  [key: string]: {
    text: string
  };
}

const List: React.FC = () => {
  const tableRef = useRef<ActionType>();
  const [ messageApi, contextHolder ] = message.useMessage();
  const navigate = useNavigate();
  const [ projectIdsMap, setProjectIdsMap ] = useState<IProjectIdsMap>({});
  const [ activeExpEditRemark, setActiveExpEditRemark ] = useState<{
    id: string | number,
    description: string
  }>({ id: '', description: '' });
  const [ execStatusLoading, setExecStatusLoading ] = useState<boolean>(false);
  const [ isShowEditDescModal, setIsShowEditDescModal ] = useState<boolean>(false);

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

  async function handleReRun(id: string | number) {
    messageApi.open({
      key: 'run',
      type: 'loading',
      content: '正在加载...',
    });
    try {
      const { data } = await reRunExp(id);
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

  /**
   * 删除实验
   * @param id
   */
  const deleteProject = async (id: string | number) => {
    try {
      const { data } = await deleteExperiment(id);
      tableRef.current?.reload();
      if (data) {
        messageApi.success('删除');
      }
    } catch (err) {
      console.log(err);
    } finally {
    }

  };

  const requestTableData = async (params: { pageSize: number; current: number, project_id: number | string }) => {
    const query = {
      page_size: params.pageSize,
      page: params.current,
      project_id: params.project_id
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
  useEffect(() => {
    const getProjectIds = async () => {
      const res = await getProjects({ page_size: 9999 });
      const projects: IProjectIdsMap = {};
      res.data.data.forEach(item => {
        if (!projects[item.id]) {
          projects[item.id] = { text: item.name };
        }
      });
      setProjectIdsMap(projects);
    };
    getProjectIds();
  }, []);

  const editExpDesc = (record: Experiments.List) => {
    const { id, description } = record;
    setActiveExpEditRemark({
      id, description
    });
    setIsShowEditDescModal(true);


  };
  const dropDownItems: MenuProps['items'] = [
    {
      label: '暂停所有实验',
      key: 'pause',
      icon: <PauseCircleTwoTone/>,
    },
    {
      label: '启动所有实验',
      key: 'running',
      icon: <PlayCircleTwoTone/>,
    },
  ];
  const dropDownClick: MenuProps['onClick'] = async ({ key }) => {
    try {
      setExecStatusLoading(true);
      await updateExecStatus({ status: key });
      message.success(`${key === 'pause' ? '暂停' : '启动'}所有实验`);
    } catch (e) {
      console.log(e);
    } finally {
      setExecStatusLoading(false);
    }
  };

  const columns: ProColumns<Experiments.List>[] = [
    {
      hideInSearch: true,
      title: '实验名称',
      dataIndex: 'name',
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
      title: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '创建人',
      dataIndex: 'user_username',
      align: 'center',
    },
    {
      hideInSearch: false,
      title: '项目',
      dataIndex: 'project_name',
      valueType: 'select',
      valueEnum: projectIdsMap,
      search: {
        transform: (value: any) => {
          return {
            project_id: value
          };
        }
      },
      align: 'center',
    },
    {
      hideInSearch: true,
      title: '创建时间',
      dataIndex: 'created_at',
      align: 'center',
      render: (text, item, index) => {
        return <span>{dayjs(text as string).format('YYYY-MM-DDTHH:mm:ss')}</span>;
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
      title: '备注',
      width: '300',
      dataIndex: 'description',
      align: 'center',
      render: (text, record) => {
        return <>
          <div>
            {text || ''}
            <Tooltip placement="top" title="编辑备注">
              <Button
                type={'link'}
                size={'small'}
                icon={<EditOutlined/>}
                onClick={() => editExpDesc(record)}
              />
            </Tooltip>
          </div>

        </>;
      }
    },
    {
      hideInSearch: true,
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      fixed: 'right',
      width: '180px',
      render: (text, record, index, action) => {
        return (
          <>
            {
              //  只有“出错”的实验可以重新运行
              record.status === 'failed' && (
                <Tooltip placement="top" title="运行">
                  <Button
                    type={'link'}
                    icon={<RedoOutlined/>}
                    onClick={() => handleReRun(record.id)}
                  ></Button>
                </Tooltip>
              )
            }
            {
              //  只有“运行中”的实验不可删除
              record.status === 'draft' && (
                <Popconfirm
                  key="run"
                  title={`运行 ${record.name}`}
                  description={`是否运行实验?`}
                  okText="是"
                  cancelText="否"
                  onConfirm={() => handleRun(record.id)}
                >
                  <Tooltip placement="top" title="运行">
                    <Button
                      type={'link'}
                      icon={<PlayCircleOutlined/>}
                    ></Button>
                  </Tooltip>
                </Popconfirm>
              )
            }
            {
              //  只有“待提交”和“等待执行”的实验可以取消
              (record.status === 'waiting' || record.status === 'doing') && (
                <Tooltip placement="top" title="取消">
                  <Button
                    type={'link'}
                    icon={<StopOutlined/>}
                    onClick={() => handleCancel(record.id)}
                  ></Button>
                </Tooltip>
              )
            }
            {/*实验详情一直展示*/}
            <Tooltip placement="top" title="实验详情">
              <Button
                type={'link'}
                icon={<AlignLeftOutlined/>}
                onClick={() => navigate(`/exp/experiment/${record.id}/detail`)}
              ></Button>
            </Tooltip>
            <Tooltip placement="top" title="实验记录">
              <Button
                type={'link'}
                icon={<OrderedListOutlined/>}
                onClick={() => navigate(`/exp/experiment/${record.id}/record`)}
              ></Button>
            </Tooltip>

            {/*复制实验 一直展示*/}
            <Tooltip placement="top" title="复制实验">
              <Button
                type={'link'}
                icon={<CopyOutlined/>}
                onClick={() => navigate({
                  pathname: `/exp/experiment/create`,
                  search: `?id=${record.id}`
                })}
              ></Button>
            </Tooltip>
            {
              //  只有“运行中”的实验不可删除
              (record.status !== 'doing') &&
              <Popconfirm
                key="del"
                title={`删除 ${record.name}`}
                description={`是否确认删除${record.name}?`}
                okText="是"
                cancelText="否"
                onConfirm={() => deleteProject(record.id)}
              >
                <Tooltip placement="top" title="删除">
                  <Button
                    type={'link'}
                    danger
                    icon={<DeleteOutlined/>}
                  />
                </Tooltip>
              </Popconfirm>
            }


          </>
        );
      },
    },
  ];
  return (
    <>
      {contextHolder}
      <PageContainer
        extra={[
          <Button
            key="add"
            icon={<PlusOutlined/>}
            type={'primary'}
            onClick={() => navigate('/exp/experiment/create')}
          >
            创建实验
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={[ 'click' ]}
            menu={{
              items: dropDownItems,
              onClick: dropDownClick
            }}
          >
            <Button
              key="btn"
              onClick={(e) => e.preventDefault()}
              loading={execStatusLoading}
            >
              更多<MoreOutlined/>
            </Button>
          </Dropdown>

        ]}
      >
        <Card>
          <ProTable
            pagination={{
              pageSize: 10,
            }}
            actionRef={tableRef}
            columns={columns}
            options={false}
            rowKey="id"
            request={requestTableData}
            scroll={{ x: columns.length * 120 }}
          />
        </Card>
      </PageContainer>
      <EditExpDesc
        onCancel={() => setIsShowEditDescModal(false)}
        onSuccess={() => {
          setIsShowEditDescModal(false);
          tableRef.current?.reload();
        }}
        expInfo={activeExpEditRemark}
        isShow={isShowEditDescModal}
      />
    </>
  );
};

export default List;
