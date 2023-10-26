import { PageContainer } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateOrEditProDataForm from "@/pages/Project/components/CreateOrEditProDataForm";
import type { IDataItemInfo } from "@/pages/Project/components/CreateOrEditProDataForm";
import { useNavigate, useParams } from "@@/exports";
import { editProData, getProDataItemInfo } from "@/api/project";

interface IProps {
  [key: string]: any;
}

const ProDataEdit: React.FC<IProps> = (props) => {
  const { proDataId } = useParams();
  const navigate = useNavigate();
  const [ dataItemInfo, setDataItemInfo ] = useState<IDataItemInfo>({});
  useEffect(() => {
    (async () => {
      if (proDataId) {
        const res = await getProDataItemInfo((proDataId));
        setDataItemInfo({
          name: res.data.name,
          titles: res.data.query_config?.title.join(','),
          sql: res.data.query_config.sql_expr.replace(/\s+/g,' '),
          description: res.data.description
        })
        console.log(res);
      }
    })();
  }, [ proDataId ]);
  const submit = async (values: any) => {
    await editProData(proDataId as string, {
      name: values.name,
      query_config: {
        title: values.titles.split(','),
        sql_expr: values.sql,
      },
      description: values.description || ''
    });
    message.success('已修改');
    navigate(-1);
  };
  return (
    <PageContainer>
      <Card>
        <CreateOrEditProDataForm
          data={dataItemInfo}
          submit={submit}
        />
      </Card>
    </PageContainer>
  );
};

export default ProDataEdit;
