import { ReactNode } from 'react';

export interface IExpState {
  label: string;
  value: string;
  status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
}

/**
 * 实验状态
 */
export const experimentStatesMap: IExpState[] = [
  { label: '待提交', value: 'draft', status: 'Processing' },
  { label: '等待执行', value: 'waiting', status: 'Processing' },
  { label: '执行中', value: 'doing', status: 'Processing' },
  { label: '成功', value: 'succeed', status: 'Success' },
  { label: '失败', value: 'failed', status: 'Error' },
  { label: '已取消', value: 'canceled', status: 'Default' },
];

interface IValueEnum {
  [key: string]:
    | ReactNode
    | {
    text: ReactNode;
    status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
  };
}

/**
 * 实验状态 => valueEnum
 * @param state {IExpState[]}
 * @returns valueEnum {IValueEnum}
 */
export const expState2ValueEnum = (state: IExpState[]): IValueEnum => {
  const valueEnum: IValueEnum = {};
  state.forEach((item) => {
    valueEnum[item.value] = {
      text: item.label,
      status: item.status,
    };
  });
  return valueEnum;
};


export enum StepStatusMap {
  'wait_pre' = 'processing',
  'waiting' = 'processing',
  'doing' = 'processing',
  'succeed' = 'success',
  'failed' = 'error',
  'canceled' = 'default',
  'canceling' = 'default',
}

interface IMethodsMap {
  name: string;
  label: string;
}
