import { getExperimentLogsById } from '@/api/experiments';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface IProps {
  [key: string]: any;
}

const Record: React.FC<IProps> = (props) => {
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const res = await getExperimentLogsById(id as string);
    })();
  }, [id]);
  return (
    <PageContainer>
      <Card></Card>
    </PageContainer>
  );
};
export default Record;
