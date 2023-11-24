import dayjs from 'dayjs';
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

/**
 * 数字四舍五入保留 {length} 个小数
 * @param num 数字
 * @param length  小数位数
 * @constructor
 */
export const MathRound = (num: number, length: number = 2) => {
  if (length <= 0) return num;
  let multiple = 1;
  let i = 0;
  while (i < 2) {
    multiple *= 10;
    i++;
  }
  return Math.round(num * multiple) / multiple;
};


/**
 * 所有环境
 */
enum BuildEnv {
  DEV = "dev",
  PROD = "prod",
  TEST = "test",
}

/**
 * 当前运行环境
 */
export const BUILD_ENV = REACT_APP_ENV as BuildEnv;


export const webSocketUrl = {
  [BuildEnv.DEV]: WS_URL,
  [BuildEnv.PROD]: WS_URL,
  [BuildEnv.TEST]: WS_URL,
}[BUILD_ENV];

