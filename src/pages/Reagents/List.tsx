import { deleteReagent, getReagentDetail, getReagentList } from '@/api/reagents';
import Detail from '@/pages/Reagents/components/Detail';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'umi';

interface IProps {
  [key: string]: any;
}

const ButtonWarpStyle = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const List: React.FC<IProps> = (props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<API.Reagents.List>();
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
    const res = await deleteReagent(id);
    tableRef.current?.reload();
  };
  const columns: ProColumns<API.Reagents.List>[] = [
    { hideInSearch: true, title: 'ID', dataIndex: 'id', align: 'center' },
    { hideInSearch: true, title: '药品名', dataIndex: 'name', align: 'center' },
    { hideInSearch: true, title: '序号', dataIndex: 'number', align: 'center' },
    { hideInSearch: true, title: '副序列', dataIndex: 'deputy_number', align: 'center' },
    { hideInSearch: true, title: 'CAS号', dataIndex: 'cas', align: 'center' },
    { hideInSearch: true, title: '浓度(mol/L)', dataIndex: 'concentration', align: 'center' },
    { hideInSearch: true, title: '密度(g/ml)', dataIndex: 'solution_density', align: 'center' },
    {
      hideInSearch: true,
      title: '分子量(g/mol)',
      dataIndex: 'solute_molecular_weight',
      align: 'center',
    },
    { hideInSearch: true, title: '溶剂', dataIndex: 'solvent', align: 'center' },
    { hideInSearch: true, title: '沸点(℃)', dataIndex: 'boiling_point', align: 'center' },
    { hideInSearch: true, title: '熔点(℃)', dataIndex: 'melting_point', align: 'center' },
    { hideInSearch: true, title: '制备时间', dataIndex: 'preparation_time', align: 'center' },
    {
      hideInSearch: true,
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (text, item, index) => [
        <Button key="detail" type="link" onClick={() => showDetail(item)}>
          详情
        </Button>,
        <Button key="edit" type="link" onClick={() => navigate(`/exp/reagent/edit/${item.id}`)}>
          修改
        </Button>,
        <Popconfirm
          key="del"
          title={`删除`}
          description={`是否确认删除${item.name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => deleteReagents(item.id)}
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <>
      <PageContainer>
        <Card>
          <ButtonWarpStyle>
            <Button
              icon={<PlusOutlined />}
              type={'primary'}
              onClick={() => navigate('/exp/reagent/create')}
            >
              创建试剂
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
            scroll={{ x: 2000 }}
          />
        </Card>
        <Detail isOpen={isShowModal} data={currentItem} close={() => setIsShowModal(false)} />
      </PageContainer>
    </>
  );
};

export default List;
