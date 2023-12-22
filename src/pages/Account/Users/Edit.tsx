import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

interface IProps {
  [key: string]: any;
}

const Edit: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        Edit
      </Card>
    </PageContainer>
  );
};

export default Edit;
