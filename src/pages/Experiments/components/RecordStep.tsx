import { Badge, Button, Collapse, Descriptions, Divider, Tooltip, message } from 'antd';
import type { CollapseProps, DescriptionsProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StepStatusMap } from "@/utils/dataMaps";
import { getMethodsByStepId } from "@/api/steps";
import RecordStepMethodInfo from "@/pages/Experiments/components/RecordStepMethodInfo";
import CollectedDataWarp from "@/pages/Experiments/components/CollectedDataWarp";
import { CalculateDuration } from "@/utils";
import { FastForwardOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { reRunExpStep, skipRunExpStep } from "@/api/experiments";
import RecordStepMethods, { IRecordStepMethodsRef } from "@/pages/Experiments/components/RecordStepMethods";
import UploadStepFileForm from "@/pages/Experiments/components/UploadStepFileForm";
import { IRef } from "@/pages/Experiments/components/UploadStepFileForm";

interface IProps {
  step: Experiments.ExperimentStepsResItem;
  index: number;

  [key: string]: any;
}

const RecordStyle = styled.div`
  display: grid;
  gap: 10px;

  .descriptions {
    padding: 10px 80px;
  }

  .collectedDataWarp {
    width: 85%;
    margin: 0 auto;
  }

  .methods {
    width: 85%;
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
  }
`;
const StatusStyle = styled.div`
  display: flex;
  gap: 10px;
`;
const UploadExpStepAnnexStBtnStyle = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const RecordStep: React.FC<IProps> = (props) => {
  const { step, index } = props;
  const RecordStepMethodsRef = useRef<IRecordStepMethodsRef>();
  const UploadStepFileFormRef = useRef<IRef>(null);

  const handleReExpStep = async (id: string | number) => {
    await reRunExpStep(id);
    await RecordStepMethodsRef.current?.getMethods();
    message.success('已重新执行');
  };
  const handleSkipRunExpStep = async (id: string | number) => {
    await skipRunExpStep(id);
    await RecordStepMethodsRef.current?.getMethods();
    message.success('已跳过该步骤执行');
  };
  // 步骤信息
  const descriptionInfo: DescriptionsProps[`items`] = [
    { key: '1', label: '步骤id', children: step.id },
    {
      key: '2', label: '状态', children: (
        <StatusStyle>
          {/*@ts-ignore*/}
          <Badge status={StepStatusMap[step.status]} text={step.status}/>
          {step.status === 'failed' && <>
            <Tooltip placement="top" title="重新执行">
              <Button
                size={'small'}
                icon={<ReloadOutlined/>}
                onClick={() => handleReExpStep(step.id)}
              ></Button>
            </Tooltip>
            <Tooltip placement="top" title="跳过">
              <Button
                size={'small'}
                icon={<FastForwardOutlined/>}
                onClick={() => handleSkipRunExpStep(step.id)}
              ></Button>
            </Tooltip>
          </>
          }
        </StatusStyle>
      ),
    },
    { key: '2-1', label: '试剂名称', children: step.reagent_name, span: 2 },
    { key: '3', label: '开始时间', children: step.start_time },
    { key: '4', label: '结束时间', children: step.end_time },
    { key: '4-1', label: '运行时长', children: step.duration, span: 2 },
    { key: '5', label: '计划量', children: `${step.quantity_plan} g` },
    { key: '6', label: '实际量', children: `${step.quantity_real} g` },
  ];

  return (
    <RecordStyle>
      <Divider orientation={'left'}>
        {index + 1} : {step.label ? `${step.label} - ` : ''} {step.name}
      </Divider>
      <UploadExpStepAnnexStBtnStyle>
        <Button
          type={"link"}
          icon={<UploadOutlined/>}
          onClick={() => UploadStepFileFormRef.current?.show()}
        >
          上传附件
        </Button>
        <UploadStepFileForm
          id={step.id}
          ref={UploadStepFileFormRef}
        />
      </UploadExpStepAnnexStBtnStyle>
      <div className="descriptions">
        <Descriptions
          column={2}
          labelStyle={{ width: '120px', textAlign: 'center' }}
          size={'small'}
          items={descriptionInfo}
        />
      </div>
      <div className="collectedDataWarp">
        <CollectedDataWarp collected_data={step.data_acquisitions_results}/>
      </div>
      <div className="methods">
        <div className="title">指令信息</div>
        <RecordStepMethods ref={RecordStepMethodsRef} stepId={step.id}/>
      </div>

    </RecordStyle>
  );
};

export default RecordStep;
