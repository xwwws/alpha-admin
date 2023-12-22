import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

interface IProps {
  [key: string]: any;
}

const AllocationRoles: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        AllocationRoles
      </Card>
    </PageContainer>
  );
};

export default AllocationRoles;
