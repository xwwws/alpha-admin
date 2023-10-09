import styled from 'styled-components';

/**
 * form 基础配置
 */
export const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  // label 允许换行
  labelWrap: true,
  // 不需要冒号
  colon: false,
};
export const CenterHolderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

/**
 * 判断是否是数字
 * @param variable
 */
export const isNumber = (variable: any): boolean => !isNaN(Number(variable));


/**
 * 计算时间间隔
 * @param start
 * @param end
 * @constructor
 * @return '**分**秒'
 */
export const CalculateDuration = (start: number | string, end: number | string): string => {
  // 参数归一化  将参数全部转换成时间戳
  const startTimestamp = isNumber(start) ? start as number : Date.parse(start as string);
  const endTimestamp = isNumber(end) ? end as number : Date.parse(end as string);
  const durationSecond = Math.abs(startTimestamp - endTimestamp) / 1000;
  const duration = `${Math.floor(durationSecond / 60)} 分 ${durationSecond % 60} 秒`;
  return duration + '';
};
