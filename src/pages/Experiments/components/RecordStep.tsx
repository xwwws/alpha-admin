import { Badge, Collapse, Descriptions, Divider } from 'antd';
import type { CollapseProps, DescriptionsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StepStatusMap } from "@/utils/dataMaps";
import { getMethodsByStepId } from "@/api/steps";
import RecordStepMethod from "@/pages/Experiments/components/RecordStepMethod";

interface IProps {
  step: API.Experiments.ExperimentStepsRes;
  index: number;

  [key: string]: any;
}

const RecordStyle = styled.div`
  .descriptions {
    padding: 10px 80px;
  }

  .methods {
    width: 85%;
    margin: 0 auto;
    display: grid;
    gap: 10px;

    .title {
      font-size: 16px;
      font-weight: 500;

    }
  }
`;
const RecordStep: React.FC<IProps> = (props) => {
  const { step, index } = props;

  // const [ methods, setMethods ] = useState<API.Steps.getMethodsByStepId[]>([]);
  const [ methodsCollapse, setMethodsCollapse ] = useState<CollapseProps['items']>([]);


  // 步骤信息
  const descriptionInfo: DescriptionsProps[`items`] = [
    { key: '1', label: '步骤id', children: step.id },
    {
      key: '2', label: '状态', children: (
        // @ts-ignore
        <Badge status={StepStatusMap[step.status]} text={step.status}/>
      ),
    },
    { key: '3', label: '开始时间', children: step.start_time },
    { key: '4', label: '结束时间', children: step.end_time },
    { key: '5', label: '计划量', children: step.quantity_plan },
    { key: '6', label: '实际量', children: step.quantity_real },
  ];


  useEffect(() => {
    const getMethods = async () => {
      const res = await getMethodsByStepId(step.id, { page: 1, page_size: 99999 });
      const methods = res.data.data.map((item, index) => {
        return {
          key: `${index + 1}`,
          label:`${index + 1}. ${item.label} - ${item.id}`,
          children: <RecordStepMethod method={item} index={index}/>,
        };
      });
      setMethodsCollapse(methods);

    };
    getMethods();
  }, [ step ]);



  return (
    <RecordStyle>
      <Divider orientation={'left'}>
        {index + 1} : {step.label ? `${step.label} - ` : ''} {step.name}
      </Divider>
      <div className="descriptions">
        <Descriptions
          column={2}
          labelStyle={{ width: '120px', textAlign: 'center' }}
          size={'small'}
          items={descriptionInfo}
        />
      </div>
      <div className="methods">
        <div className="title">指令信息</div>
        <Collapse
          size={'small'}
          items={methodsCollapse}
          expandIconPosition={'start'}

        />
      </div>

    </RecordStyle>
  );
};

export default RecordStep;
