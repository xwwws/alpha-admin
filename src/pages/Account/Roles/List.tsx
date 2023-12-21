import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        List
      </Card>
    </PageContainer>
  );
};

export default List;
