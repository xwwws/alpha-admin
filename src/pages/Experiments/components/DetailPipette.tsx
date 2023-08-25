import { useModel } from '@@/exports';
import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';

interface IProps {
  record: API.Experiments.CreateExperimentStep;

  [key: string]: any;
}

const DetailPipette: React.FC<IProps> = (props) => {
  const { record } = props;
  const { steps } = useModel('useExperimentModel');
  const descriptionInfo: DescriptionsProps[`items`] = [
    {
      key: '1',
      label: '步骤名称',
      children: steps.find((item) => item.value === record.name)?.label,
      span: 4,
    },
    { key: '2', label: '托盘区域', children: record.kwargs.src_area?.name },
    { key: '3', label: 'x', children: record.kwargs.src_area?.x },
    { key: '4', label: 'y', children: record.kwargs.src_area?.y },
    { key: '5', label: 'z', children: record.kwargs.src_area?.z },
    { key: '6', label: '目标区域', children: record.kwargs.dst_area?.name },
    { key: '7', label: 'x', children: record.kwargs.dst_area?.x },
    { key: '8', label: 'y', children: record.kwargs.dst_area?.y },
    { key: '9', label: 'z', children: record.kwargs.dst_area?.z },
    { key: '13', label: '吸液吐液速度', children: record.kwargs.speed },
    { key: '10', label: '枪头长度', children: record.kwargs.tip_length },
    { key: '11', label: '高度', children: record.kwargs.height },
    { key: '12', label: '移液总量', children: record.kwargs.total },
    { key: '13', label: '单次吸液量', children: record.kwargs.take_once },
    { key: '13', label: '单次吐液量', children: record.kwargs.spit_once },
    { key: '13', label: '吐液间隔时长', children: record.kwargs.spit_once },
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
export default DetailPipette;
