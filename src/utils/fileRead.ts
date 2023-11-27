import { getFile } from "@/api/readFile";

// 表头数据  nodeid,name,value,server_time,current_time
export interface Icsv {
  current_time: string[];
  name: string[];
  nodeid: string[];
  server_time: string[];
  value: string[];
  duration: string[];

  [key: string]: any[];
}

export const readCSV = async (csv_url: string): Promise<Icsv> => {
  const result: Icsv = {
    current_time: [],
    name: [],
    nodeid: [],
    server_time: [],
    value: [],
    duration: []
  };
  if (!csv_url) return result;
  const CSVString = await getFile(csv_url);
  const CSVData = CSVString.split('\n');

  // 表头
  const THeader = CSVData[0].split(',');
  // 将表头加入结果
  // 格式化数据  最后一个元素有可能是空字符串
  if (!CSVData[CSVData.length - 1]) {
    CSVData.pop();
  }
  CSVData.shift();
  CSVData.forEach((csvDataItem, csvDataIndex) => {
    const csvDataRecord = csvDataItem.split(',');
    THeader.forEach((headerItem, headerIndex) => {
      if (!result[headerItem]) result[headerItem] = [];
      result[headerItem].push(csvDataRecord[headerIndex]);
    });
  });
  return result;
};


export const readFHTLCSV = async (csv_url: string): Promise<any[]> => {
  if (!csv_url) return [];
  const CSVString = await getFile(csv_url);
  const CSVData = CSVString.split('\n');

  // 表头
  const THeader = CSVData[0].split(',');
  // 将表头加入结果
  // 格式化数据  最后一个元素有可能是空字符串
  if (!CSVData[CSVData.length - 1]) {
    CSVData.pop();
  }
  CSVData.shift();
  // @ts-ignore
  let result:any[] = CSVData.map((item, index) => {
    const data = {};
    THeader.forEach((headerItem, headerIndex) => {
      // @ts-ignore
      data[headerItem] = item.split(',')[headerIndex]
    });
    return data;
  });
  return result;
};
