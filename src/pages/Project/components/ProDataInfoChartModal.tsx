import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ECOption } from "@/types/echart";

export interface IChartYData {
  name: string;
  y: string[];
}

export interface IChartData {
  xData: string[];
  yData: IChartYData[];
}

interface IProps {
  unit: string;
  isShow: boolean;
  isLoading: boolean;
  onCancel: () => void;
  chartData: IChartData;

  [key: string]: any;
}

const ProDataInfoChartModal: React.FC<IProps> = (props) => {
  const { isShow, unit, onCancel, isLoading, chartData } = props;
  const chartRef = useRef(null);
  const getSelectAll = (data: string[], isSelect: boolean) => {
      const result: { [key: string]: boolean } = {};
      data.forEach(item => {
        result[item] = isSelect;
      });
      return result;
    },
    drawChart = () => {
      const myChart = echarts.init(chartRef.current);
      const { xData, yData } = chartData;
      const allLine = yData.map(({ name }) => name);
      const selected = getSelectAll(allLine, true);
      myChart.clear();
      const option: ECOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: allLine,
          selected
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData,
          name: 's',
          axisLabel: {
            interval: 0,
          }
        },
        yAxis: {
          type: 'value',
          name: unit
        },
        series: yData.map(item => ({
          name: item.name,
          type: 'line',
          data: item.y,
          smooth: true
        }))
      };
      myChart.setOption(option);

    };
  useEffect(() => {
    isShow && drawChart();
  }, [ isShow ]);
  return (
    <>
      <Modal
        title={'数据项对比图'}
        open={isShow}
        confirmLoading={isLoading}
        onCancel={onCancel}
        footer={null}
        width={'80%'}
      >
        <div ref={chartRef} style={{ width: '100%', height: 700 }}/>
      </Modal>
    </>
  );
};

export default ProDataInfoChartModal;
