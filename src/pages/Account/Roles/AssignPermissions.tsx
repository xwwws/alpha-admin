import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

interface IProps {
  [key: string]: any;
}

const AssignPermissions: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        AssignPermissions
      </Card>
    </PageContainer>
  );
};

export default AssignPermissions;
