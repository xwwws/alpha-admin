import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useRef } from 'react';

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  const tableRef = useRef<ActionType>();
  const requestTableData = async () => {
    // const res = await
    const res = await Promise.resolve([]);
    return {
      data: [],
      success: true,
      total: res.length,
    };
  };
  const columns: ProColumns<any>[] = [{}];
  return (
    <>
      <PageContainer>
        <Card>
          <ProTable
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
