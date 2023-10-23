import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';
import CreateForm from "@/pages/ReactionVessel/components/CreateForm";

interface IProps {
  [key: string]: any;
}

const Create: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        <CreateForm/>
      </Card>
    </PageContainer>
  );
};

export default Create;
