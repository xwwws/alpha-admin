import type { ProColumns } from "@ant-design/pro-components"
import dayjs from "dayjs"
import type {ReactNode} from 'react'
export const tableColumnsSetting: ProColumns = {
  hideInSearch: true,
  align: 'center'
}

export function formatColumns<T>(columns: ProColumns<T>[]): ProColumns<T>[] {
  return columns.map(item => {
    return {
      ...tableColumnsSetting,
      ...item
    }
  })
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
