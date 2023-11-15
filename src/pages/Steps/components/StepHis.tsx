import { Button, Card, Divider, Tag, Tooltip } from 'antd';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { getStepHis } from "@/api/steps";
import { formatColumns } from "@/utils/componentSettingUtils";
import { experimentStatesMap, expState2ValueEnum } from "@/utils/dataMaps";
import StepHisContent from './StepHisContent';
import dayjs from 'dayjs';
import { FundOutlined } from "@ant-design/icons";
import StepHisChart from "@/pages/Steps/components/StepHisChart";

interface IProps {
  stepMode: string; //  API.Steps.StepName
  [key: string]: any;
}

const StepHisStyle = styled.div`
  margin-top: 20px;
`;
const TagStyle = styled.span`
  font-size: 12px;
  word-break: break-all;
`;
const StepHis: React.FC<IProps> = (props) => {
  const { title, stepMode } = props;
  const [ collected_data, set_collected_data ] = useState<API.DataAcquisitionsResults[]>([]);
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const showChart = (results: API.DataAcquisitionsResults[]) => {
    set_collected_data(results);
    setIsShow(true);
  };
  const columns: ProColumns<API.Steps.StepHis>[] = formatColumns<API.Steps.StepHis>([
    { title: 'ID', dataIndex: 'id', width: '80px' },
    { title: 'name', dataIndex: 'name', width: '120px' },
    { title: 'label', dataIndex: 'label', width: '80px' },
    { title: '实验id', dataIndex: 'expt_id', width: '80px' },
    { title: '试剂', dataIndex: 'reagent_name', width: '80px' },
    { title: '试剂id', dataIndex: 'reagent_id', width: '80px' },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80px',
      valueEnum: expState2ValueEnum(experimentStatesMap),
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      width: '150px',
      valueType: 'dateTimeRange',
      render: (text, record) => {
        return record.start_time;
      },
      search: {
        transform: (value: any) => {
          return {
            start_time_before: value[0],
            start_time_after: value[1],
          };
        }
      }
    },
    { title: '结束时间', dataIndex: 'end_time', width: '150px' },
    { title: '计划量', dataIndex: 'quantity_plan', width: '80px' },
    { title: '实际量', dataIndex: 'quantity_real', width: '80px' },
    // {
    //   title: 'content',
    //   dataIndex: 'content',
    //   width: "200px",
    //   render: (text, { content }) => <StepHisContent content={content}/>
    // },
    {
      title: 'result',
      dataIndex: 'result',
      width: '230px',
      render: (text, record) => (
        <>
          {
            record.result.map((item, index) => (
              <>
                {index !== 0 && <Divider/>}
                <TagStyle color={'orange'} key={index}>{item}</TagStyle>
              </>
            ))
          }
        </>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '120px',
      fixed: 'right',
      render: (text, record) => [
        <Tooltip key={'01'} title={'查看数据采集信息'}>
          <Button
            icon={<FundOutlined/>}
            type={'link'}
            onClick={() => showChart(record.data_acquisitions_results)}
          />
        </Tooltip>
      ]
    },
  ]);
  const requestMethod = async (params: any) => {

    const paramsData: API.Steps.GetStepHisReq = {
      page: params.current,
      page_size: params.pageSize,
    };
    if (params.start_time_before && params.start_time_after) {
      paramsData.start_time_before = dayjs(params.start_time_before).format('YYYY-MM-DDTHH:mm:ss');
      paramsData.start_time_after = dayjs(params.start_time_after).format('YYYY-MM-DDTHH:mm:ss');
    }

    const res = await getStepHis(stepMode, paramsData);
    return {
      data: res.data.data,
      success: true,
      total: res.data.total
    };
  };
  return (
    <StepHisStyle>
      <Card title={'步骤调用历史'} size={'small'}>
        <ProTable
          key={'id'}
          columns={columns}
          options={false}
          request={requestMethod}
          scroll={{ x: 2000 }}
          pagination={{
            showSizeChanger: false,
            pageSizeOptions: [ 10, 50, 100, 200 ],
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
      </Card>
      <StepHisChart
        isShow={isShow}
        onCancel={() => setIsShow(false)}
        collected_data={collected_data}
      />
    </StepHisStyle>
  );
};

export default StepHis;
