import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ECOption } from "@/types/echart";
import * as echarts from "echarts";
import dayjs from 'dayjs';


interface IProps {
  data: any;

  [key: string]: any;
}
const CollectedDataStyle = styled.div`


`
const ChartBox = styled.div`
  width: 100%;
  height: 400px;
`

const CollectedData: React.FC<IProps> = (props) => {

  const { data } = props;
  const chartRef = useRef(null);

  const drawChart = () => {
    const color = '#2fc49a';
    const myChart = echarts.init(chartRef.current);

    const echartsOption: ECOption = {
      title: {
        text: `${data.name[0]} 信息`,
        left: 'center',
        textStyle: {
          fontSize: "15",
          fontWeight: 400
        },
        // @ts-ignore
        rich: {
          a: {
            // 上右下左
            padding: [ 0, 0, 0, 50 ]
          }
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: " {b}，{c}"
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.server_time.map((item: string) => dayjs(item as string).format('MM/DD hh:mm:ss'))
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data.value.map((item:string) => Number(item as string)),
          type: 'line',
          itemStyle: {
            // @ts-ignore
            normal: {
              color,
              borderColor: color,
              borderWidth: 2
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: function (params) { // params 是当前数据项的参数
              // @ts-ignore
              return params.value[1]; // 显示 y 值
            }
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
  useEffect(() => {
    drawChart()
  }, [data]);
  return (
    <CollectedDataStyle>
      <ChartBox ref={chartRef}/>
    </CollectedDataStyle>
  );
};

export default CollectedData;
