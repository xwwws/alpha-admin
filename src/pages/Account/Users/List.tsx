import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { delUser, getUserList } from "@/api/users";
import { formatColumns } from "@/utils/componentSettingUtils";
import { DeleteOutlined, FormOutlined, PlusOutlined, ToolOutlined } from "@ant-design/icons";
import { useNavigate } from "umi";

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
  const deleteUser = async (id: string | number) => {
    await delUser(id);
    tableRef.current?.reload();
  };
  const columns: ProColumns<Users.List>[] = formatColumns([
    { title: 'ID', key: "id", dataIndex: 'id', width: 50 },
    { title: '用户名', key: "username", dataIndex: 'username' },
    { title: '名称', key: "name", dataIndex: 'name' },
    { title: '状态', key: "status", dataIndex: 'status' },
    { title: '邮箱', key: "email", dataIndex: 'email' },
    { title: '电话', key: "phone", dataIndex: 'phone' },
    {
      title: '性别',
      key: "gender",
      dataIndex: 'gender',
    },
    { title: '类型', key: "type", dataIndex: 'type' },
    {
      title: 'action',
      key: "action",
      fixed: "right",
      render: (text, record) => [
        <Tooltip placement="top" title="编辑" key={'edit'}>
          <Button
            type={'link'}
            icon={<FormOutlined/>}
            onClick={() => navigate(`/account/users/${record.id}/edit`)}
          ></Button>
        </Tooltip>
        ,
        <Tooltip placement="top" title="分配角色" key={'role'}>
          <Button
            type={'link'}
            icon={<ToolOutlined/>}
            onClick={() => navigate(`/account/users/${record.id}/allocation-roles`)}
          ></Button>
        </Tooltip>
        ,
        <Popconfirm
          key="del"
          title={`删除 ${record.username}`}
          description={`是否确认删除${record.username}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => deleteUser(record.id)}
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
    const res = await getUserList(query);
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
          onClick={() => navigate('/account/users/create')}
        >
          新建用户
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
