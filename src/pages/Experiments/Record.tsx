import { PageContainer } from '@ant-design/pro-components';
import { Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "umi";
import { getStepsByExperimentId } from "@/api/experiments";
import RecordStep from "@/pages/Experiments/components/RecordStep";

interface IProps {
  [key: string]: any;
}

const Record: React.FC<IProps> = (props) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [ steps, setSteps ] = useState<API.Experiments.ExperimentStepsRes[]>([]);

  // 根据实验id查询所有步骤
  useEffect(() => {
    const getSteps = async () => {
      const stepsRes = await getStepsByExperimentId(id as string)
      console.log(stepsRes);
      setSteps(stepsRes.data)
    }
    getSteps()
  }, [id]);




  return (
    <PageContainer
      extra={[
        <Button
          key={'add'}
          onClick={() => navigate(`/exp/experiment/${id}/detail` , {replace: true})}
        >
          查看实验详情
        </Button>,
      ]}
    >
      <Card>
        {steps.map((item,index) => (
          <RecordStep index={index} step={item}/>
        ))}

      </Card>
    </PageContainer>
  );
};

export default Record;
