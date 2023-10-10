import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { getProjects } from "@/api/project";
import { formatColumns, tableTimeRender } from "@/utils/componentSettingUtils";
import { useNavigate } from "umi";

interface IProps {
  [key: string]: any
}

const timeRender = tableTimeRender()

const List: React.FC<IProps> = (props) => {
  const navigate = useNavigate()
  const deleteProject = (id: string | number) => {

  }

  const columns: ProColumns<API.Projects.List>[] = formatColumns<API.Projects.List>([
    { title: 'ID', dataIndex: 'id' },
    { title: '项目名称', dataIndex: 'name' },
    { title: '项目描述', dataIndex: 'description' },
    // @ts-ignore
    { title: '创建时间', dataIndex: 'created_at', render: timeRender },
    // @ts-ignore
    { title: '上次修改时间', dataIndex: 'updated_at', render: timeRender },
    {
      title: '操作', dataIndex: 'actions', render: (text, item, index) => {
        return [
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
            onConfirm={ () => deleteProject(item.id) }
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
    const query: API.Projects.ListReq = {
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
          onClick={ () => navigate('/project/create') }
        >
          新建项目
        </Button>
      ] }

    >
      <Card>
        <ProTable
          pagination={ {
            pageSize: 10,
          } }
          actionRef={ tableRef }
          columns={ columns }
          search={ false }
          options={ false }
          rowKey="id"
          request={ requestTableData }
        >

        </ProTable>
      </Card>

    </PageContainer>
  )
}

export default List;
