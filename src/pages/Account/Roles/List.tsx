import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { formatColumns } from "@/utils/componentSettingUtils";
import { DeleteOutlined, FormOutlined, PlusOutlined, ToolOutlined } from "@ant-design/icons";
import { useNavigate } from "umi";
import { deleteRole, getRoleList } from "@/api/roles";

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const tableRef = useRef<ActionType>();

  /**
   * 删除用户
   * @param id
   */
  const delRole = async (id: string | number) => {
    await deleteRole(id);
    tableRef.current?.reload();
  };
  const columns: ProColumns<Roles.List>[] = formatColumns([
    { title: 'ID', dataIndex: 'id', width: 50 },
    { title: '角色名称', dataIndex: 'name', width: 200 },
    { title: '备注', dataIndex: 'description' },
    {
      title: '操作',
      fixed: "right",
      render: (text, record) => [
        <Tooltip placement="top" title="编辑" key={'edit'}>
          <Button
            type={'link'}
            icon={<FormOutlined/>}
            onClick={() => navigate(`/account/roles/${record.id}/edit`)}
          ></Button>
        </Tooltip>
        ,
        <Tooltip placement="top" title="分配权限" key={'role'}>
          <Button
            type={'link'}
            icon={<ToolOutlined/>}
            onClick={() => navigate(`/account/roles/${record.id}/assign-menu`)}
          ></Button>
        </Tooltip>
        ,
        <Popconfirm
          key="del"
          title={`删除 ${record.name}`}
          description={`是否确认删除${record.name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => delRole(record.id)}
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

  const requestMethod = async (params: { pageSize: number; current: number }) => {
    const query = {
      page_size: params.pageSize,
      page: params.current,
    };
    const res = await getRoleList(query);
    return {
      data: res.data.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: res.data.total,
    };
  };
  return (
    <PageContainer
      extra={[
        <Button
          key="add"
          icon={<PlusOutlined/>}
          type={'primary'}
          onClick={() => navigate('/account/roles/create')}
        >
          创建角色
        </Button>,
      ]}
    >
      <Card>
        <ProTable
          rowKey={({ id }) => `${id}`}
          columns={columns}
          options={false}
          actionRef={tableRef}
          request={requestMethod}
          scroll={{ x: columns.length * 120 }}
          search={false}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: 10,

          }}
        />
      </Card>
    </PageContainer>
  );
};

export default List;
