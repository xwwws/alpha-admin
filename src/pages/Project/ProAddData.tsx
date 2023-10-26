import { PageContainer } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React from 'react';
import CreateOrEditProDataForm from "@/pages/Project/components/CreateOrEditProDataForm";
import { useNavigate, useParams } from "@@/exports";
import { createProData } from "@/api/project";

interface IProps {
  [key: string]: any;
}

const ProAddData: React.FC<IProps> = (props) => {
  const { proId } = useParams();
  const navigate = useNavigate();

  const submit = async (values: any) => {
    await createProData(proId as string, {
      name: values.name,
      query_config: {
        title: values.titles.split(','),
        sql_expr: values.sql,
      },
      description: values.description || ''
    });
    message.success('创建成功');
    navigate(`/project/pro-data-List/${proId}`);
  };
  return (
    <PageContainer>
      <Card>
        <CreateOrEditProDataForm
          submit={submit}
        />
      </Card>
    </PageContainer>
  );
};

export default ProAddData;
