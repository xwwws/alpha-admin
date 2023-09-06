import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';
import CreateOrEditProjectsForm from "@/pages/Project/components/CreateOrEditProjectsForm";

interface IProps {
  [key: string]: any;
}

const Create: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <Card>
        <CreateOrEditProjectsForm/>
      </Card>
    </PageContainer>
  );
};

export default Create;
