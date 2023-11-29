import { PageContainer } from '@ant-design/pro-components';
import { Button, Card } from 'antd';
import React from 'react';
import { useNavigate, useParams } from "umi";

interface IProps {
  [key: string]: any;
}

const Record: React.FC<IProps> = (props) => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <PageContainer

      extra={[
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/flow/${id}/detail`, { replace: true })}
        >
          查看详情
        </Button>,
      ]}>
      <Card>
        Record
      </Card>
    </PageContainer>
  );
};

export default Record;
