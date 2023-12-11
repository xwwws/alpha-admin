import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "@@/exports";
import { getProDataInfo } from "@/api/project";
import { formatColumns } from "@/utils/componentSettingUtils";
import { Icsv, readCSV, readFHTLCSV } from "@/utils/fileRead";
import ProDataInfoChartModal from "@/pages/Project/components/ProDataInfoChartModal";
import type { IChartData } from "@/pages/Project/components/ProDataInfoChartModal";

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

const ProDataInfo: React.FC<IProps> = (props) => {
  const { proDataId } = useParams();
  const [ columns, setColumns ] = useState<ProColumns<any>[]>([]);
  const [ dataSource, setDataSource ] = useState<(any)[][]>([]);
  const [ activeRows, setActiveRows ] = useState<any[]>([]);
  const [ unit, setUnit ] = useState<string>('');
  const [ nameIndex, setNameIndex ] = useState<number>(0);
  const [ IDIndex, setIDIndex ] = useState<number>(0);
  // model相关数据
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const [ isModalLoading, setIsModalLoading ] = useState<boolean>(false);
  const [ chartData, setChartData ] = useState<IChartData>({ xData: [], yData: [] });
  const pageInit = async (proDataId: string) => {
    const res = await getProDataInfo(proDataId);
    const tableTitle: string[] = res.data.data[0] as string[];
    setUnit(tableTitle[tableTitle.length - 1].split('$')[1]);
    setNameIndex(tableTitle.indexOf('实验名称'));
    setIDIndex(tableTitle.indexOf('实验ID'));
    // 实验名称索引


    setColumns(formatColumns<ProColumns<any>>(tableTitle.map((title, index) => (
      {
        title: index + 1 === tableTitle.length ? `${title.replaceAll('$', '')}` : title,
        dataIndex: index,
        key: title
      }
    ))));

    setDataSource(res.data.data.filter((item, index) => index !== 0));
  };
  useEffect(() => {
    proDataId && pageInit(proDataId);
  }, [ proDataId ]);


  /**
   * 获取csv数据
   */
  const getCSVsData = async (): Promise<IAllData[]> => {
    // 读取所有文件
    return await Promise.all(activeRows.map((item) => new Promise(async (resolve) => resolve({
      name: item[nameIndex],
      data: await readCSV(item[item.length - 1])
    })))) as IAllData[];
  };


  /**
   * 获取防火涂料csv数据
   */
  const getFHTLCSVData = async (): Promise<IFHTLAllData[]> => {
    // 读取所有文件
    return await Promise.all(activeRows.map((item) => new Promise(async (resolve) => resolve({
      name: item[nameIndex],
      data: await readFHTLCSV(item[item.length - 1])
    })))) as IAllData[];
  };

  /**
   * 将csv数据转换成图表数据
   * @param allData
   */
  const formatCSVsData2ChartData = (allData: IAllData[]): IChartData => {
    // 合并所有x轴  x轴以 duration 为准
    const xData = allData
      .map((item) => item.data.duration)
      .flat()
      .sort((a, b) => (Number(a) - Number(b)))
      .filter((value, index, self) => self.indexOf(value) === index);
    // 处理y数据
    const yData = allData.map(({ name, data }) => {
      return {
        name,
        y: xData.map((x) => {
          const durationIndex = data.duration.indexOf(x);
          if (durationIndex === -1) {
            return '-';
          } else {
            return data.value[durationIndex];
          }
        }).reduce((accumulator: string[], item) => {
          if (item === '-') {
            return [ ...accumulator, accumulator[accumulator.length - 1] ];
          } else {
            return [ ...accumulator, item ];
          }
        }, [])
      };
    });
    return { xData, yData };
  };
  /**
   * 普通视图查看
   */
  const showNormalData = async () => {
    setIsModalLoading(false);
    setChartData(formatCSVsData2ChartData(await getCSVsData()));
    setIsShow(true);
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
  /**
   * 防火涂料视图查看
   */
  const showFHTLData = async () => {
    setIsModalLoading(false);
    setChartData(formatCSVsData2ChartFHTLData(await getFHTLCSVData()));
    setIsShow(true);
  };
  const viewComparisonChart = () => {
    // 判断是不是防火涂料
    if (dataSource[0][1].includes('FH')) { // 是防火涂料
      showFHTLData();
    } else { // 不是防火涂料
      // 普通视图查看
      showNormalData();
    }
  };

  return (
    <PageContainer>
      <Card>
        <ProTable
          rowSelection={{
            // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
            // 注释该行则默认不显示下拉选项
            selections: [ Table.SELECTION_ALL, Table.SELECTION_INVERT ],
            onChange: (selectedRowKeys: any[], selectedRows: any[],) => setActiveRows(selectedRows)
          }}
          tableAlertRender={() => false}
          tableAlertOptionRender={() => false}
          rowKey={record => record[0]}
          columns={columns}
          options={false}
          search={false}
          dataSource={dataSource}
          scroll={{ x: columns.length * 120 }}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSizeOptions: [ 50, 100, 200, 1000, 10000 ],
            pageSize: 50,
          }}
          toolBarRender={() => [
            <Button
              key="show"
              type={'primary'}
              onClick={viewComparisonChart}
              disabled={!activeRows.length}
            >
              查看数据
            </Button>,
          ]}
        />
      </Card>
      <ProDataInfoChartModal
        isShow={isShow}
        unit={unit}
        isLoading={isModalLoading}
        chartData={chartData}
        onCancel={() => setIsShow(false)}
      />
    </PageContainer>
  );
};

export default ProDataInfo;
