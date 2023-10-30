import { useModel } from '@@/exports';
import { Descriptions, DescriptionsProps } from 'antd';
import React from 'react';

interface IProps {
  record: API.Experiments.CreateExperimentStep;
  [key: string]: any;
}

const DetailAddSolid: React.FC<IProps> = (props) => {
  const { record } = props;
  const { steps } = useModel('useExperimentModel');
  // @ts-ignore
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
    { key: '2', label: '托盘区域', children: record.kwargs.src_area?.name },
    { key: '3', label: 'x', children: record.kwargs.src_area?.x },
    { key: '4', label: 'y', children: record.kwargs.src_area?.y },
    { key: '5', label: 'z', children: record.kwargs.src_area?.z },
    { key: '6', label: '目标区域', children: record.kwargs.dst_area?.name },
    { key: '7', label: 'x', children: record.kwargs.dst_area?.x },
    { key: '8', label: 'y', children: record.kwargs.dst_area?.y },
    { key: '9', label: 'z', children: record.kwargs.dst_area?.z },
    { key: '10', label: '角度', children: `${ record.kwargs.speed } °/s` },
    { key: '11', label: '质量', children: `${ record.kwargs.weight } g` },
    { key: '12', label: '精确度', children: `${ record.kwargs.tolerance } %` },
    { key: '13', label: '高度', children: `${ record.kwargs.height } mm` },
    { key: '14', label: '步长', children: `${ record.kwargs.angel } rad` }
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
export default DetailAddSolid;
