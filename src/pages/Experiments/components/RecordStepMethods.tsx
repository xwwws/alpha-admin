import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Collapse, CollapseProps } from "antd";
import { getMethodsByStepId } from "@/api/steps";
import RecordStepMethodInfo from "@/pages/Experiments/components/RecordStepMethodInfo";

interface IProps {
  stepId: number | string;

  [key: string]: any;
}
export interface IRecordStepMethodsRef {
  getMethods: () => Promise<void>
}
const RecordStepMethods: React.FC<IProps> = (props,ref:any) => {
  const { stepId } = props;
  const [ methodsCollapse, setMethodsCollapse ] = useState<CollapseProps['items']>([]);

  const getMethods = async () => {
    const res = await getMethodsByStepId(stepId, { page: 1, page_size: 99999 });
    const methods = res.data.data.map((item, index) => {
      return {
        key: `${index + 1}`,
        label: `${index + 1}. ${item.label} - ${item.id}`,
        children: <RecordStepMethodInfo method={item} index={index}/>,
      };
    });
    setMethodsCollapse(methods);
  };
  useImperativeHandle(ref,() => ({
    getMethods
  }))
  useEffect(() => {
    getMethods()
  },[stepId])
  return (
    <>
      <Collapse
        size={'small'}
        items={methodsCollapse}
        expandIconPosition={'start'}
      />
    </>
  );
};

// @ts-ignore
export default forwardRef(RecordStepMethods);
