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
  'failed' = 'Error',
  'canceled' = 'Default',
  'canceling' = 'Default',
}

interface IMethodsMap {
  name: string;
  label: string;
}

export const MethodsMap: IMethodsMap[] = [
  { name: 'read', label: '读值' },
  { name: 'write', label: '写值' },
  { name: 'sleep', label: '等待' },
  { name: 'methdMvThing', label: '移动' },
  { name: 'methdDoAddSolid', label: '加固启动' },
  { name: 'methdAddSol', label: '加液' },
  { name: 'methdUncap', label: '开盖' },
  { name: 'methdRecap', label: '加盖' },
  { name: 'methdChngTool', label: '更换夹爪' },
  { name: 'methdPickTip', label: '抬起枪头' },
  { name: 'methdTrnsLiquid', label: '移液' },
  { name: 'methdMvSolid', label: '移动固体料仓' },
  { name: 'methdDoPeristaltic', label: '蠕动泵加液' },
  { name: 'methdDoMix3', label: '搅拌3' },
  { name: 'methdDoDistillC3', label: '废液蒸馏' },
];
