import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "@@/exports";
import { getProDataInfo } from "@/api/project";
import { formatColumns } from "@/utils/componentSettingUtils";
import record from "@/pages/Experiments/Record";

interface IProps {
  [key: string]: any;
}

const ProDataInfo: React.FC<IProps> = (props) => {
  const { proDataId } = useParams();
  const [ columns, setColumns ] = useState<ProColumns<any>[]>([]);
  const [ dataSource, setDataSource ] = useState<(string | number)[][]>([]);

  const pageInit = async (proDataId: string) => {
    const res = await getProDataInfo(proDataId);
    setColumns(formatColumns<ProColumns<any>>(res.data.data[0].map((title, index) => (
      { title, dataIndex: index,key:title }
    ))));

    setDataSource(res.data.data.filter((item, index) => index !== 0));
  };
  useEffect(() => {
    proDataId && pageInit(proDataId);
  }, [ proDataId ]);
  return (
    <PageContainer>
      <Card>
        <ProTable
          rowKey={record => record[0]}
          columns={columns}
          options={false}
          search={false}
          dataSource={dataSource}
          scroll={{ x: columns.length * 200 }}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: 30,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default ProDataInfo;
