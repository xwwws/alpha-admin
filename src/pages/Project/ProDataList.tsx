import { DeleteOutlined, EditOutlined, FileSearchOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip, message } from 'antd';
import React, { useRef } from 'react';
import { useNavigate, useParams } from "@@/exports";
import { formatColumns } from "@/utils/componentSettingUtils";
import { deleteProData, deleteProject, getProDataList } from "@/api/project";

interface IProps {
  [key: string]: any;
}

const ProDataList: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const tableRef = useRef<ActionType>();

  const handleDeleteProjectData = async (proId: number) => {
    await deleteProData(proId);
    message.success('已删除');
    tableRef.current?.reload();


  };
  const columns: ProColumns<Projects.ProDataList>[] = formatColumns<Projects.ProDataList>([
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title: '项目id', dataIndex: 'project_id' },
    { title: '创建时间', dataIndex: 'created_at' },
    { title: '上次更新时间', dataIndex: 'updated_at' },
    { title: '描述', dataIndex: 'description' },
    {
      title: '操作',
      fixed: 'right',
      render: (text, record, action) => [
        <Tooltip key={"info"} placement="top" title="数据项数据获取">
          <Button
            type={'link'}
            icon={<FileSearchOutlined/>}
            onClick={() => navigate(`/project/pro-data-info/${record.id}`)}
          />
        </Tooltip>,
        <Tooltip key={'edit'} placement="top" title="编辑">
          <Button
            type={ 'link' }
            icon={ <EditOutlined/> }
            onClick={ () => navigate(`/project/pro-data-edit/${ record.id }`) }
          />
        </Tooltip>,
        <Popconfirm
          key="del"
          title={`删除`}
          description={`是否确认删除${record.name}?`}
          okText="是"
          cancelText="否"
          onConfirm={() => handleDeleteProjectData(record.id)}
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
    }
  ]);
  const { proId } = useParams();
  const requestMethod = async (params: { pageSize: number, current: number }) => {
    const res = await getProDataList(proId as string, {
      page: params.current,
      page_size: params.pageSize
    });
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
          icon={<PlusOutlined/>}
          type={'primary'}
          onClick={() => navigate(`/project/pro-add-data/${proId}`)}
        >创建数据项</Button>
      ]}
    >
      <Card>
        <ProTable
          rowKey="id"
          actionRef={tableRef}
          columns={columns}
          options={false}
          search={false}
          request={requestMethod}
          scroll={{ x: columns.length * 200 }}
          pagination={{
            showSizeChanger: false,
            // pageSizeOptions: [ 10, 50, 100, 200 ],
            showQuickJumper: true,
            pageSize: 10,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default ProDataList;
