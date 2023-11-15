import { getReadNodeList, readMethod } from '@/api/methods';
import { ITypes } from '@/pages/typings';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import useWebsocket, { IMsgGet, SocketEventEnum } from "@/hooks/useWebsocket";
import DispatchEvent from "@/utils/DispatchEvent";
import { ECOption } from "@/types/echart";
import * as echarts from "echarts";
import dayjs from 'dayjs';
import MethodsHis from "@/pages/Methods/components/MethodsHis";
import { webSocketUrl } from "@/utils";
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IConditions {
  node_index: string | number;
}

const Index: React.FC = () => {

  const [ form ] = Form.useForm();
  const [ nodes, setNodes ] = useState<ITypes.EnumType[]>([]);
  const chartRef = useRef(null);
  let XAxis: number[] = [];
  let Series: string[] = [];


  let url = `ws://${location.host}/ws/sub`;
  // 本地环境连接从 config 环境变量配置
  if (REACT_APP_ENV === 'dev') {
    url = `${webSocketUrl}/ws/sub`;
  }
  const { sendMessage, connect } = useWebsocket();
  const initChart = () => {
    const color = '#2fc49a';
    const myChart = echarts.init(chartRef.current);
    myChart.clear()
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
        formatter: " {b} - {c}"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line',
          label: {
            show: true,
            position: 'top',
            // @ts-ignore
            // formatter: function (params) { // params 是当前数据项的参数
            //   return params.value; // 显示 y 值
            // }
          },
          // 折线图 线条颜色
          lineStyle: {
            color
          },
          // 折线图 区域颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color
                },
                {
                  offset: 1,
                  color: 'rgba(47,196,154,0.01)'
                }
              ]
            }
          },
          smooth: true, // 折现图为曲线

        }
      ]
    };
    myChart.setOption(echartsOption);
  };

  const drawChart = (msg: IMsgGet) => {
    XAxis.push(msg.value);
    Series.push(dayjs(msg.server_time).format("hh:mm:ss"));
    // @ts-ignore
    const chartInstance = echarts.getInstanceByDom(chartRef.current);
    const newOptions = {

      title: {text: msg.custom_name},
      xAxis: { type: 'category', data: Series },
      yAxis: { type: 'value' ,name: msg.custom_name.split('(')[1].replaceAll(')','')},
      series: [ { type: 'line', data: XAxis.map(item => (item.toFixed(2))) } ]
    };
    console.log(newOptions);
    chartInstance && chartInstance.setOption(newOptions);
  };
  /**
   * chart resize
    */
  const chartResize = () => {
    // @ts-ignore
    const chartInstance = echarts.getInstanceByDom(chartRef.current);
    chartInstance?.resize()
  }
  /**
   * 开始读值
   * @param val
   */
  const onFinish = async (val: IConditions) => {
    initChart()
    const curNode = nodes.find(item => item.value === val.node_index);
    const reg = /(Int)|(Float)/;
    // 判断当前选择的节点的返回值是否是数字  可以展示到图表中
    if (reg.test(curNode?.value_type)) {
      await connect(url);
      sendMessage([ { nodeid: val.node_index, interval: 1 } ]);
    }
  };

  useEffect(() => {
    // 获取下拉数据
    (async () => {
      const res = await getReadNodeList();
      setNodes(res.data.map((item): ITypes.EnumType => ({
        label: item.custom_name,
        value: item.nodeid,
        value_type: item.value_type,
      })));
    })();
    // 初始化图表
    initChart();
    // 订阅socket
    DispatchEvent.on(SocketEventEnum.MSG, drawChart);
    // 注册chart resize事件
    window.addEventListener('resize', chartResize)
    return () => {
      window.removeEventListener('resize', chartResize)
      DispatchEvent.off(SocketEventEnum.MSG, drawChart);
    };
  }, []);


  // 顶部查询模块
  const searchModel = (
    <Form
      {...formItemLayout}
      layout={'inline'}
      form={form}
      style={{ maxWidth: 'none' }}
      onFinish={onFinish}
    >
      <Form.Item name="node_index" label="节点id" rules={[ { required: true, message: '请选择节点' } ]}>
        <Select
          allowClear={true}
          style={{ width: `150px` }}
          options={nodes}
          placeholder={'请选择节点'}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type={'primary'} htmlType="submit">
          确定
        </Button>

        {/*<Button type={'primary'} onClick={disConnect}>*/}
        {/*  断开*/}
        {/*</Button>*/}
      </Form.Item>
    </Form>
  );

  return (
    <>
      <PageContainer>
        <Card>
          {searchModel}
          <br/>
          <div ref={chartRef} style={{ width: '100%', height: 400 }}/>
        </Card>
        <MethodsHis methodMode={'read'}/>
      </PageContainer>
    </>
  );
};

export default Index;
