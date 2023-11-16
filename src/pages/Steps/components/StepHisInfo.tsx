import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from "antd";
import CollectedDataWarp from "@/pages/Experiments/components/CollectedDataWarp";
import { getStepHisInfo } from "@/api/steps";
import StepHisInfoContent from "@/pages/Steps/components/StepHisInfoContent";
import RecordStepMethods from '@/pages/Experiments/components/RecordStepMethods';
import styled from "styled-components";

interface IProps {
  [key: string]: any;
}

export interface IRef {
  show: (id: number) => void;
}
const MethodsStyle = styled.div`
  padding: 10px;
  margin: 0 auto;
  display: grid;
  gap: 10px;

  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
`
const StepHisChart: React.FC<IProps> = (props, ref: any) => {
  const [ StepId, setStepId ] = useState<number>(0);
  const [ stepHisInfo, setStepHisInfo ] = useState<Steps.StepHisInfo>();
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const show = async (id: number) => {
    setStepId(id)
    const res = await getStepHisInfo(id);
    setStepHisInfo(res.data);
    setIsShow(true);


  };


  /**
   * 暴露给父组件方法
   */
  useImperativeHandle(ref, () => ({ show }));
  return (
    <>

      <Modal
        open={isShow}
        title={`步骤调用记录`}
        onCancel={() => setIsShow(false)}
        footer={null}
        width={'80%'}
      >
        {stepHisInfo && <StepHisInfoContent content={stepHisInfo}/>}

        {/*指令信息*/}
        <MethodsStyle>
          <div className="title">指令信息</div>
          <RecordStepMethods stepId={StepId} />
        </MethodsStyle>
        <CollectedDataWarp
          collected_data={stepHisInfo?.data_acquisitions_results as API.DataAcquisitionsResults[]}
        />
      </Modal>
    </>
  );
};

// @ts-ignore
export default forwardRef(StepHisChart);
