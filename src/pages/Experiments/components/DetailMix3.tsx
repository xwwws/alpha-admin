import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';
import React from 'react';
import { useModel } from 'umi';

interface IProps {
  record: Experiments.CreateExperimentStep;

  [key: string]: any;
}

const DetailAddSolvent: React.FC<IProps> = (props) => {
  const { record } = props;
  const { steps } = useModel('useExperimentModel');
  const descriptionInfo: DescriptionsProps[`items`] = [
    {
      key: '1',
      label: '步骤名称',
      children: steps.find((item) => item.value === record.name)?.label,
      span: 4,
    },
    {
      key: '1-1',
      label: '试剂名称',
      children: record.reagent_name,
      span: 4,
    },
    { key: '6', label: '目标区域', children: record.kwargs.dst_area?.name },
    { key: '7', label: 'x', children: record.kwargs.dst_area?.x },
    { key: '8', label: 'y', children: record.kwargs.dst_area?.y },
    { key: '9', label: 'z', children: record.kwargs.dst_area?.z },
    { key: '12', label: '时间', children: `${record.kwargs.time} s` },
  ];
  return (
    <>
      <Descriptions
        bordered
        column={4}
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        items={descriptionInfo}
      />
    </>
  );
};
export default DetailAddSolvent;
