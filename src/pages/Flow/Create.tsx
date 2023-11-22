import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

interface IProps {
  [key: string]: any;
}

const Create: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        Create
      </Card>
    </PageContainer>
  );
};

export default Create;
