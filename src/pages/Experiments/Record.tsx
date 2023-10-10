import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "umi";
import { getStepsByExperimentId } from "@/api/experiments";
import RecordStep from "@/pages/Experiments/components/RecordStep";
import PreAndNext from "@/pages/Experiments/components/PreAndNext";

interface IProps {
  [key: string]: any;
}

const Record: React.FC<IProps> = (props) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [ steps, setSteps ] = useState<API.Experiments.ExperimentStepsResItem[]>([]);

  // 根据实验id查询所有步骤
  useEffect(() => {
    const getSteps = async () => {
      const res = await getStepsByExperimentId(id as string);
      setSteps(res.data.step_data);
    };
    getSteps();
  }, [ id ]);

  const handlePrevOrNext = async (type: string) => {
    const res = await getStepsByExperimentId(id as string, {
      sibling: type
    });
    if (`${res.data.id}` === id) {
      message.warning(`已经是${type === 'prev' ? '第' : '最后'}一条了`);
    } else {
      navigate(`/exp/experiment/${res.data.id}/record`, { replace: true });
    }
  };
  return (
    <PageContainer
      extra={[
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/experiment/${id}/detail`, { replace: true })}
        >
          查看实验详情
        </Button>,
      ]}
    >
      <Card>
        <PreAndNext
          onPreOrNext={handlePrevOrNext}
        />
        {steps.map((item, index) => (
          <RecordStep key={index} index={index} step={item}/>
        ))}

      </Card>
    </PageContainer>
  );
};

export default Record;
