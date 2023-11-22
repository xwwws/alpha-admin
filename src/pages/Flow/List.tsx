import { DeleteOutlined, EditOutlined, OrderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip } from 'antd';
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { deleteProject, getProjects } from "@/api/project";
import { formatColumns, tableTimeRender } from "@/utils/componentSettingUtils";
import { useNavigate } from "umi";

interface IProps {
  [key: string]: any
}

const timeRender = tableTimeRender()

const List: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const handleDeleteProject = async (id: string | number) => {
    await deleteProject(id)
    tableRef.current?.reload();

  }

  const columns: ProColumns<Projects.List>[] = formatColumns<Projects.List>([
    { title: 'ID', dataIndex: 'id' },
    { title: '项目名称', dataIndex: 'name' },
    { title: '项目描述', dataIndex: 'description' },
    // @ts-ignore
    { title: '创建时间', dataIndex: 'created_at', render: timeRender },
    // @ts-ignore
    { title: '上次修改时间', dataIndex: 'updated_at', render: timeRender },
    {
      title: '操作', dataIndex: 'actions', render: (text, item) => {
        return [

          <Tooltip key={'addData'} placement="top" title="项目数据">
            <Button
              type={ 'link' }
              icon={ <OrderedListOutlined/> }
              onClick={ () => navigate(`/project/pro-data-List/${ item.id }`) }
            />
          </Tooltip>,

          <Tooltip key={'edit'} placement="top" title="编辑">
            <Button
              type={ 'link' }
              icon={ <EditOutlined/> }
              onClick={ () => navigate(`/project/edit/${ item.id }`) }
            />
          </Tooltip>,
          <Popconfirm
            key="del"
            title={ `删除 ${ item.name }` }
            description={ `是否确认删除${ item.name }?` }
            okText="是"
            cancelText="否"
            onConfirm={ () => handleDeleteProject(item.id) }
          >
            <Tooltip placement="top" title="删除">
              <Button
                type={ 'link' }
                danger
                icon={ <DeleteOutlined/> }
              />
            </Tooltip>
          </Popconfirm>,
        ]
      }
    },
  ])
  const tableRef = useRef<ActionType>();

  const requestTableData = async (params: { pageSize: number, current: number }) => {
    const query: Projects.ListReq = {
      page_size: params.pageSize,
      page: params.current,
    }
    const res = await getProjects(query)
    return {
      data: res.data.data,
      success: true,
      total: res.data.total
    }

  }
  return (
    <PageContainer
      extra={ [
        <Button
          key={'create'}
          type="primary"
          icon={ <PlusOutlined/> }
          onClick={ () => navigate('/flow/create') }
        >
          新建工作流
        </Button>
      ] }

    >
      <Card>
        <ProTable
          rowKey="id"
          pagination={ {
            pageSize: 10,
          } }
          actionRef={ tableRef }
          columns={ columns }
          search={ false }
          options={ false }
          request={ requestTableData }
        >

        </ProTable>
      </Card>

    </PageContainer>
  )
}

export default List;
