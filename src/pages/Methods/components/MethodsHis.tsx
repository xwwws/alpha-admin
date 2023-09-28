import { Card, Tag } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { getMethodHisByMethods } from "@/api/methods";
import { formatColumns } from "@/utils/componentSettingUtils";

interface IProps {
  title?: ReactNode;
  methodMode: string; // API.Methods.MethodAction;
  [key: string]: any;
}

const MethodsHisStyle = styled.div`
  margin-top: 20px;
`;
const MethodsHis: React.FC<IProps> = (props) => {
  const { title, methodMode } = props;
  const columns: ProColumns<API.Methods.MethodHis>[] = formatColumns<API.Methods.MethodHis>([
    { title: 'ID', dataIndex: 'id' },
    { title: 'action', dataIndex: 'action' },
    { title: 'label', dataIndex: 'label' },
    { title: '开始时间', dataIndex: 'start_time' },
    { title: '结束时间', dataIndex: 'end_time' },
    {
      title: 'args',
      dataIndex: 'args',
      render: (text, record) => (
        <>
          {
            record.args.map((item, index) => (
              <>
                <Tag color={'processing'} key={index}>{item}</Tag>
              </>
            ))
          }
        </>
      )
    },
    {
      title: 'result',
      dataIndex: 'result',
      render: (text, record) => (
        <>
          {
            record.result.map((item, index) => (
              <>
                <Tag color={'processing'} key={index}>{item}</Tag>
              </>
            ))
          }
        </>
      )
    },
  ]);
  const requestMethod = async (params: { pageSize: number; current: number }) => {
    const res = await getMethodHisByMethods(methodMode, {
      method_action: methodMode,
      page: params.current,
      page_size: params.pageSize
    });
    return { data: res.data.data, success: true, total: res.data.total };
  };
  return (
    <MethodsHisStyle>
      <Card title={title || '指令调用历史'} size={'small'}>
        <ProTable
          key={'id'}
          columns={columns}
          search={false}
          options={false}
          request={requestMethod}
          scroll={{ x: 1500 }}
        />
      </Card>
    </MethodsHisStyle>
  );
};

export default MethodsHis;
