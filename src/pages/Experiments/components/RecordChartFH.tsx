import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAnnexList } from "@/api/attachments";
import { readFHTLCSV } from "@/utils/fileRead";
import type { Icsv } from "@/utils/fileRead";
import { IChartData } from "@/pages/Project/components/ProDataInfoChartModal";
import * as echarts from "echarts";
import { ECOption } from "@/types/echart";


interface IProps {
  [key: string]: any;
}

interface IAllData {
  data: Icsv,
  name: string
}

interface IFHTLAllData {
  data: any,
  name: string
}

const RecordChartFH: React.FC<IProps> = (props) => {
  const { id } = useParams();
  const [ isShowChart, setIsShowChart ] = useState<boolean>(false);
  const chartRef = useRef(null);
  const [ chartData, setChartData ] = useState<IChartData>({ xData: [], yData: [] });


  const getAnnex = async () => {
    const res = await getAnnexList({ expt_id: id });
    if (res.data.length > 0 && res.data[0].expt_name.includes('FH')) {
      setChartData(formatCSVsData2ChartFHTLData(await getFHTLCSVData(res.data)));
      setIsShowChart(true);
    } else {
      setIsShowChart(false);
    }
  };
  useEffect(() => {
    getAnnex();
  }, [ id ]);
  const getSelectAll = (data: string[], isSelect: boolean) => {
    const result: { [key: string]: boolean } = {};
    data.forEach(item => {
      result[item] = isSelect;
    });
    return result;
  };

  const drawChart = () => {
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
        top: '20%',
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
      },
      yAxis: {
        type: 'value',
        name: '℃'
      },
      series: yData.map(item => ({
        name: item.name,
        type: 'line',
        data: item.y,
        lineStyle: {
          width: 1
        },
        smooth: true
      }))
    };
    myChart.setOption(option);

  };
  useEffect(() => {
    isShowChart && drawChart();
  }, [ isShowChart ]);
  /**
   * 获取防火涂料csv数据
   */
  const getFHTLCSVData = async (data: Attachments.GetAnnexRes[]): Promise<IFHTLAllData[]> => {
    // 读取所有文件
    return await Promise.all(data.map((item) => new Promise(async (resolve) => resolve({
      name: item.expt_name,
      data: await readFHTLCSV(item.file_url)
    })))) as IAllData[];
  };
  /**
   * 将csv数据转换成图表数据   防火涂料
   * @param allData
   */
  const formatCSVsData2ChartFHTLData = (allData: IFHTLAllData[]): IChartData => {
    const baseX = 'duration';
    const baseY1 = '升温曲线(℃)';
    const baseY2 = '背温曲线(℃)';
    /* // 合并所有x轴  x轴以 duration 为准 */
    const xData = allData
      .map((item) => item.data.map((dataItem: any) => dataItem[baseX]))
      .flat()
      .sort((a, b) => (Number(a) - Number(b)))
      .filter((value, index, self) => self.indexOf(value) === index);
    // 处理y数据
    const yData = allData.map(({ name, data }) => {
      return [
        {
          name: `${name}-${baseY1}`,
          y: xData.map((x) => {
            // @ts-ignore key 是csv文件表头   给的就是汉字
            const iResult = data.find(({ duration }) => duration === x);
            if (iResult) {
              return `${Math.round(Number(iResult[baseY1]) * 100) / 100}`;
            } else {
              return '-';
            }
          }).reduce((accumulator: string[], item) => {
            if (item === '-') {
              return [ ...accumulator, accumulator[accumulator.length - 1] ];
            } else {
              return [ ...accumulator, item ];
            }
          }, [])
        },
        {
          name: `${name}-${baseY2}`,
          y: xData.map((x) => {
            // @ts-ignore key 是csv文件表头   给的就是汉字
            const iResult = data.find(({ duration }) => duration === x);
            if (iResult) {
              return `${Math.round(Number(iResult[baseY2]) * 100) / 100}`;
            } else {
              return '-';
            }
          }).reduce((accumulator: string[], item) => {
            if (item === '-') {
              return [ ...accumulator, accumulator[accumulator.length - 1] ];
            } else {
              return [ ...accumulator, item ];
            }
          }, [])
        }
      ];
    });
    return { xData, yData: yData.flat() };
  };


  return (
    <>
      {
        isShowChart && <>
          <div ref={chartRef} style={{ width: '100%', height: 700 }}/>
        </>
      }
    </>
  );
};

export default RecordChartFH;
