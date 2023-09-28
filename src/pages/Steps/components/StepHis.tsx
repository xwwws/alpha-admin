import { Card, Tag } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { getStepHis } from "@/api/steps";
import { formatColumns } from "@/utils/componentSettingUtils";
import { experimentStatesMap, expState2ValueEnum } from "@/utils/dataMaps";
import StepHisContent from './StepHisContent';

interface IProps {
  title?: ReactNode;
  stepMode: string; //  API.Steps.StepName
  [key: string]: any;
}

const StepHisStyle = styled.div`
  margin-top: 20px;
`;
const StepHis: React.FC<IProps> = (props) => {
  const { title, stepMode } = props;
  const columns: ProColumns<API.Steps.StepHis>[] = formatColumns<API.Steps.StepHis>([
    { title: 'ID', dataIndex: 'id' },
    { title: 'name', dataIndex: 'name' },
    { title: 'label', dataIndex: 'label' },
    { title: '实验id', dataIndex: 'expt_id' },
    { title: '试剂', dataIndex: 'reagent_name' },
    { title: '试剂id', dataIndex: 'reagent_id' },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: expState2ValueEnum(experimentStatesMap),

    },
    { title: '开始时间', dataIndex: 'start_time' },
    { title: '结束时间', dataIndex: 'end_time' },
    { title: '计划量', dataIndex: 'quantity_plan' },
    { title: '实际量', dataIndex: 'quantity_real' },
    {
      title: 'content',
      dataIndex: 'content',
      width: "200px",
      render: (text, { content }) => <StepHisContent content={content}/>
    },

    {
      title: 'result',
      dataIndex: 'result',
      width: '250px',
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
    const res = await getStepHis(stepMode, {
      page: params.current,
      page_size: params.pageSize
    });
    return { data: res.data.data, success: true, total: res.data.total };
  };
  return (
    <StepHisStyle>
      <Card title={title || '指令调用历史'} size={'small'}>
        <ProTable
          key={'id'}
          columns={columns}
          search={false}
          options={false}
          request={requestMethod}
          scroll={{ x: 2100 }}
          pagination={{
            showSizeChanger: true,
            pageSize: 10,
            pageSizeOptions: [ 10, 50, 100, 200 ]
          }}
        />
      </Card>
    </StepHisStyle>
  );
};

export default StepHis;
