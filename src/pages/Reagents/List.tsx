import { deleteReagent, getReagentDetail, getReagentList } from '@/api/reagents';
import Detail from '@/pages/Reagents/components/Detail';
import { AlignLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'umi';
import { formatColumns } from "@/utils/componentSettingUtils";

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  const [ isShowModal, setIsShowModal ] = useState<boolean>(false);
  const [ currentItem, setCurrentItem ] = useState<API.Reagents.List>();
  const navigate = useNavigate();
  const tableRef = useRef<ActionType>();
  const requestTableData = async (params: { pageSize: number; current: number }) => {
    const query: API.PagesReq = {
      page_size: params.pageSize,
      page: params.current,
    };
    const res = await getReagentList(query);
    return {
      data: res.data.data,
      success: true,
      total: res.data.total,
    };
  };
  const showDetail = async (item: API.Reagents.List) => {
    const res = await getReagentDetail(item.id);
    setCurrentItem(res.data);
    setIsShowModal(true);
  };
  const deleteReagents = async (id: string | number) => {
    await deleteReagent(id);
    tableRef.current?.reload();
  };
  const columns: ProColumns<API.Reagents.List>[] = formatColumns<API.Reagents.List>([
    { title: 'ID', dataIndex: 'id' },
    { title: '药品名', dataIndex: 'name' },
    { title: '序号', dataIndex: 'number' },
    { title: '副序列', dataIndex: 'deputy_number' },
    { title: 'CAS号', dataIndex: 'cas' },
    { title: '浓度(mol/L)', dataIndex: 'concentration' },
    { title: '密度(g/ml)', dataIndex: 'solution_density' },
    { title: '分子量(g/mol)', dataIndex: 'solute_molecular_weight', },
    { title: '溶剂', dataIndex: 'solvent' },
    { title: '沸点(℃)', dataIndex: 'boiling_point' },
    { title: '熔点(℃)', dataIndex: 'melting_point' },
    { title: '制备时间', dataIndex: 'preparation_time' },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (text, item, index) => [
        <Tooltip placement="top" title="详情" key={'detail'}>
          <Button
            type={'link'}
            icon={<AlignLeftOutlined/>}
            onClick={() => showDetail(item)}
          ></Button>
        </Tooltip>
        ,
        <Tooltip placement="top" title="编辑" key={'edit'}>
          <Button
            type={'link'}
            icon={<EditOutlined/>}
            onClick={() => navigate(`/exp/reagent/edit/${item.id}`)}
          ></Button>
        </Tooltip>
        ,
        <Popconfirm
          key="del"
          title={`删除`}
          description={`是否确认删除${item.name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => deleteReagents(item.id)}
        >
          <Tooltip placement="top" title="删除">
            <Button
              type={'link'}
              danger
              icon={<DeleteOutlined/>}
            />
          </Tooltip>
        </Popconfirm>,
      ],
    },
  ]);
  return (
    <>
      <PageContainer
        extra={[
          <Button
            key={'add'}
            icon={<PlusOutlined/>}
            type={'primary'}
            onClick={() => navigate('/exp/reagent/create')}
          >
            创建实验
          </Button>,
        ]}
      >
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
            scroll={{ x: columns.length * 120 }}
          />
        </Card>
        <Detail isOpen={isShowModal} data={currentItem} close={() => setIsShowModal(false)}/>
      </PageContainer>
    </>
  );
};

export default List;
