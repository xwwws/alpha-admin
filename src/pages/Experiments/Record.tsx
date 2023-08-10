import { getExperimentDetailsById } from '@/api/experiments';
import RecordItem from '@/pages/Experiments/components/RecordItem';
import type { IExpState } from '@/utils/dataMaps';
import { experimentStatesMap } from '@/utils/dataMaps';
import { PageContainer } from '@ant-design/pro-components';
import type { DescriptionsProps } from 'antd';
import { Badge, Card, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IProps {
  [key: string]: any;
}

const Record: React.FC<IProps> = (props) => {
  const [recordInfo, setRecordInfo] = useState<API.Experiments.ExperimentRecordRes>();
  const [currentState, setCurrentState] = useState<IExpState>();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const res = await getExperimentDetailsById(id as string | number);
      setRecordInfo(res);
      setCurrentState(experimentStatesMap.find((item) => item.value === res.status));
    })();
  }, [id]);
  const items: DescriptionsProps[`items`] = [
    {
      key: '2',
      label: '实验id',
      children: recordInfo?.id,
    },
    {
      key: '3',
      label: '状态:',
      children: (
        <Badge
          status={currentState?.status.toLocaleLowerCase() as 'success'}
          text={currentState?.label}
        />
      ),
    },
    {
      key: '4',
      label: '试剂瓶高度:',
      children: recordInfo?.bottle_height,
      span: 2,
    },
    {
      key: '5',
      label: '试剂瓶名称:',
      children: recordInfo?.bottle_area.name,
    },
    {
      key: '6',
      label: '试剂瓶位置:',
      children: (
        <div>
          <p>x: {recordInfo?.bottle_area.x}</p>
          <p>y: {recordInfo?.bottle_area.y}</p>
          <p>z: {recordInfo?.bottle_area.z}</p>
        </div>
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Descriptions
          title={`实验名称: ${recordInfo?.name}`}
          bordered
          column={2}
          labelStyle={{ width: '180px', textAlign: 'center' }}
          size={'small'}
          items={items}
        />
        {recordInfo?.steps_data.map((item, index) => (
          <RecordItem key={index} record={item} />
        ))}
      </Card>
    </PageContainer>
  );
};
export default Record;
