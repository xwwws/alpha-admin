import { Button, Card, DatePicker, Descriptions, Form, Tag } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { getMethodHisByMethods, getMethodStatisticsByMethods } from "@/api/methods";
import { formatColumns } from "@/utils/componentSettingUtils";
import dayjs from 'dayjs';

interface IProps {
  methodMode: string; // API.Methods.MethodAction;
  [key: string]: any;
}

const MethodsHisStyle = styled.div`
  margin-top: 20px;
`;
const StatisticsWarpStyle = styled.div`
  margin: 0 auto 20px;

  .form {
    margin-bottom: 20px;
  }
`;
const MethodsHis: React.FC<IProps> = (props) => {
  const { methodMode } = props;

  // 指令数据统计数据信息
  const [ statistics, setStatistics ] = useState<API.Methods.MethodStatistics>({
    times: 0,
    duration: ''
  });

  // 指令数据统计搜索框
  const [ statisticsForm, setStatisticsForm ] = useState<any[]>([ '', '' ]);
  const [ form ] = Form.useForm();

  // 指令数据统计表单提交
  const formFinish = (values: any) => {
    if (values.time) {
      setStatisticsForm([ dayjs(values.time[0]).format('YYYY-MM-DDTHH:mm:ss'), dayjs(values.time[1]).format('YYYY-MM-DDTHH:mm:ss') ]);
    } else {
      setStatisticsForm([ '', '' ]);
    }
  };

  // 获取指令数据统计
  useEffect(() => {
    const getStatistics = async () => {
      const params: API.Methods.GetMethodStatisticsByMethods = {};

      if (statisticsForm[0] && statisticsForm[1]) {
        params.start_time_before = statisticsForm[0];
        params.start_time_after = statisticsForm[1];
      }
      const res = await getMethodStatisticsByMethods(methodMode, params);
      setStatistics(res.data);
    };
    getStatistics();
  }, [ statisticsForm ]);

  // table columns
  const columns: ProColumns<API.Methods.MethodHis>[] = formatColumns<API.Methods.MethodHis>([
    { title: 'ID', dataIndex: 'id' },
    { title: 'action', dataIndex: 'action' },
    { title: 'label', dataIndex: 'label' },
    {
      title: '开始时间',
      valueType: 'dateTimeRange',
      dataIndex: 'start_time',
      search: {
        transform: (value: any) => {
          return {
            start_time_before: value[0],
            start_time_after: value[1],
          };
        }
      },
      render: (text, record) => {
        return record.start_time;
      }
    },
    { title: '结束时间', dataIndex: 'end_time' },
    {
      title: 'args',
      dataIndex: 'args',
      render: (text, record) => (
        <>
          {
            record.args.map((item, index) => (
              <>
                <Tag color={'orange'} key={index}>{item}</Tag>
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
  // 获取table数据
  const requestMethod = async (params: any) => {

    const paramsData:API.Methods.GetMethodHisByMethodReq = {
      page: params.current,
      page_size: params.pageSize,
    }
    if(params.start_time_before && params.start_time_after) {
      paramsData.start_time_before = dayjs(params.start_time_before).format('YYYY-MM-DDTHH:mm:ss')
      paramsData.start_time_after = dayjs(params.start_time_after).format('YYYY-MM-DDTHH:mm:ss')
    }
    const res = await getMethodHisByMethods(methodMode, paramsData);
    return { data: res.data.data, success: true, total: res.data.total };
  };
  return (
    <MethodsHisStyle>
      <StatisticsWarpStyle>
        <Card title={'指令执行数据统计'} size={'small'}>
          <div className="form">
            <Form layout="inline" form={form} onFinish={formFinish}>
              <Form.Item label={'指令执行时间'} name={'time'}>
                <DatePicker.RangePicker
                  showTime
                  placeholder={[ '开始时间', '结束时间' ]}
                />
              </Form.Item>
              <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>查询</Button>
              </Form.Item>
            </Form>
          </div>
          <Descriptions colon={false} column={24}>
            <Descriptions.Item span={12} label={'执行次数'}>
              {statistics.times}
            </Descriptions.Item>
            <Descriptions.Item span={12} label={'运行时长'}>
              {statistics.duration}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </StatisticsWarpStyle>
      <Card title={'指令调用历史'} size={'small'}>
        <ProTable
          key={'id'}
          columns={columns}
          options={false}
          request={requestMethod}
          scroll={{ x: columns.length * 200 }}
          pagination={{
            showSizeChanger: false,
            // pageSizeOptions: [ 10, 50, 100, 200 ],
            showQuickJumper: true,
            pageSize: 10,
          }}
        />
      </Card>
    </MethodsHisStyle>
  );
};

export default MethodsHis;
