import { Button, Card, Col, DatePicker, Form, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import dayjs from "dayjs";
import * as echarts from "echarts";
import { ECOption } from "@/types/echart";
import { getDeviceStatistics } from "@/api/devices";

interface IProps {
  deviceName: string;

  [key: string]: any;
}

const DeviceRunTime: React.FC<IProps> = (props) => {
  const { deviceName } = props;
  const chartRef = useRef(null);
  const [ params, setParams ] = useState<Devices.DeviceRunTimeReq>({});
  const [ form ] = Form.useForm();
  const clearForm = () => {
    form.resetFields();
  };
  const formFinish = ({ time }: any) => {
    const params: Devices.DeviceRunTimeReq = {};
    if (time) {
      params.start_time_before = dayjs(time[0]).format('YYYY-MM-DDT00:00:00');
      params.start_time_after = dayjs(time[1]).format('YYYY-MM-DDT23:59:59');
    }
    setParams(params);
  };

  const getData = async () => {
    const res = await getDeviceStatistics(deviceName, params);
    drawChart(res.data);
  };
  const initChart = () => {
    const color = '#2fc49a';
    const myChart = echarts.init(chartRef.current);
    myChart.clear();
    const echartsOption: ECOption = {
      title: {
        text: "",
        left: 'center',
        textStyle: {
          fontSize: "15",
          fontWeight: 900
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: "日期",
        data: []
      },
      yAxis: {
        type: 'value',
        name: '小时'
      },
      series: [
        {
          data: [],
          type: 'bar',
        }
      ]
    };
    myChart.setOption(echartsOption);
  };
  const drawChart = (data: Devices.DeviceRunTimeRes[]) => {
    // @ts-ignore
    const chartInstance = echarts.getInstanceByDom(chartRef.current);
    const newOptions = {
      xAxis: { type: 'category', data: data.map(({ day }) => day) },
      series: { type: 'bar', data: data.map(({ hours }) => hours) },
    };
    chartInstance && chartInstance.setOption(newOptions);

  };
  useEffect(() => {
    getData();
  }, [ params ]);
  useEffect(() => {
    clearForm();
    initChart();
    setParams({});
    getData();
  }, [ deviceName ]);
  return (
    <>
      <Card size={'small'} title={'设备按日运行时长统计'} hoverable>
        <Form onFinish={formFinish} form={form}>
          <Row gutter={30}>
            <Col>
              <Form.Item label={'查询时间'} name={'time'}>
                <DatePicker.RangePicker></DatePicker.RangePicker>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>确定</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div ref={chartRef} style={{ width: '100%', height: 400 }}/>

      </Card>
    </>
  );
};

export default DeviceRunTime;
