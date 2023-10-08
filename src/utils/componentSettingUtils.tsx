import type { ProColumns } from "@ant-design/pro-components"
import dayjs from "dayjs"
import type {ReactNode} from 'react'
const tableColumnsSetting: ProColumns = {
  // hideInSearch: true,
  align: 'center',
  search: false
}

export function formatColumns<T>(columns: ProColumns<T>[]): ProColumns<T>[] {
  const result = columns.map(item => {
    return {
      ...tableColumnsSetting,
      ...item
    }
  })
  // TODO log table columns
  // console.log(result);
  return result
}

interface TRenderTime {
  (text:string): ReactNode
}
/**
 * 闭包
 * @param fmtString
 * @return TRenderTime
 */
export const tableTimeRender = (fmtString:string = 'YYYY-MM-DD hh:mm:ss'):TRenderTime => {
  return (text:string):ReactNode => {
    return <span>{dayjs(text).format(fmtString)}</span>;
  }

}

export enum WebSocketStatus {
  OFF = 0, // 连接尚未建立
  OPEN = 1, // 连接已建立，可以进行通信
  CLOSING = 2, // 连接已建立，可以进行通信
  CLOSED = 3, // 连接已经关闭或者连接不能打开
}
