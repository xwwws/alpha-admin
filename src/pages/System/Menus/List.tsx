import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import { formatColumns } from "@/utils/componentSettingUtils";
import { useNavigate } from "@@/exports";
import { deleteMenu, getMenuList } from "@/api/menus";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined, ToolOutlined } from "@ant-design/icons";

interface IProps {
  [key: string]: any;
}

const format2Tree = (tree: Menus.List[]): Menus.List[] => {
  return tree.map((result) => {
    if (result.children && result.children.length > 0) {
      result.children = format2Tree(result.children);
      return result;
    } else {
      delete result.children;
      return result;
    }
  });
};
const List: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const tableRef = useRef<ActionType>();

  const delMenu = async (id: number) => {
    await deleteMenu(id)
    tableRef.current?.reload();
  };
  const columns: ProColumns<Menus.List>[] = formatColumns([
    { title: '名称', dataIndex: 'name', width: 150 },
    { title: 'ID', dataIndex: 'id', width: 100 },
    { title: 'code', dataIndex: 'code' },
    { title: '备注', dataIndex: 'description' },
    { title: '父级id', dataIndex: 'parent_id' },
    {
      fixed:'right',
      title: '操作',
      render: (text, record) => [

        <Tooltip placement="top" title="添加" key={'add'}>
          <Button
            type={'link'}
            icon={<PlusCircleOutlined />}
            onClick={() => navigate(`/system/menus/create/${record.id}`)}
          ></Button>
        </Tooltip>,
        <Tooltip placement="top" title="编辑" key={'edit'}>
          <Button
            type={'link'}
            icon={<EditOutlined />}
            onClick={() => navigate(`/system/menus/edit/${record.id}`)}
          ></Button>
        </Tooltip>,
        <Tooltip placement="top" title="分配权限" key={'assignPermissions'}>
          <Button
            type={'link'}
            icon={<ToolOutlined/>}
            onClick={() => navigate(`/system/menus/${record.id}/assign-permissions`)}
          ></Button>
        </Tooltip>,
        <Popconfirm
          key="del"
          title={`删除 ${record.name}`}
          description={`是否确认删除${record.name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => delMenu(record.id)}
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


  const requestMethod = async () => {
    const res = await getMenuList();
    return {
      data: format2Tree(res.data),
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      // total: res.data.length,
    };
  };
  return (
    <PageContainer
      extra={[
        <Button
          key="add"
          icon={<PlusOutlined/>}
          type={'primary'}
          onClick={() => navigate('/system/menus/create/0')}
        >
          添加顶级菜单
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
          pagination={false}
        />
      </Card>
    </PageContainer>
  );
};

export default List;
