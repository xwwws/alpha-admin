import { getFile } from "@/api/readFile";
// 表头数据  nodeid,name,value,server_time,current_time
export interface Icsv {
  [key:string]: string[]
}
export const readCSV = async (csv_url: string):Promise<Icsv> => {
  if(!csv_url) return {  }
  const result:Icsv = {}
  const CSVString = await getFile(csv_url)
  const CSVData = CSVString.split('\n')

  // 表头
  const THeader =CSVData[0].split(',')

  // 将表头加入结果
  // 格式化数据  最后一个元素有可能是空字符串
  if(!CSVData[CSVData.length -1]) {
    CSVData.pop()
  }
  CSVData.shift()
  CSVData.forEach((csvDataItem) => {
    const csvDataRecord = csvDataItem.split(',')
    THeader.forEach((headerItem,headerIndex) => {
      if(!result[headerItem]) {
        result[headerItem] = []
      }
      result[headerItem].push(csvDataRecord[headerIndex])
    })
  })
  console.log('result',result);
  return result
}
