import { getAreasTypes } from '@/api/trays';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect } from 'react';

interface IProps {
  [key: string]: any;
}

const List: React.FC<IProps> = (props) => {
  useEffect(() => {
    (async () => {
      const res = await getAreasTypes();
      console.log(res);
    })();
  }, []);
  return (
    <PageContainer>
      <Card>List</Card>
    </PageContainer>
  );
};

export default List;
