import React from 'react';
import { Badge, Descriptions, DescriptionsProps } from "antd";
import DetailPrerequisite from "@/pages/Flow/components/DetailPrerequisite";
import { StepStatusMap } from "@/utils/dataMaps";

interface IProps {
  recordItem: Flows.RecordItem;

  [key: string]: any;
}

const FlowRecordItem: React.FC<IProps> = (props) => {
  const { recordItem } = props;
  console.log( recordItem);
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: 'id', children: `${recordItem.id}` },
    {
      key: '0',
      label: '状态',
      // @ts-ignore
      children: <Badge status={StepStatusMap[recordItem.status]} text={recordItem.status}/>,
      span: 2
    },
    { key: '0', label: '开始时间', children: `${recordItem.id}` },
    { key: '0', label: '结束时间', children: `${recordItem.id}` },
    { key: '0', label: '总时长', children: `${recordItem.id}` },
    { key: '0', label: '结果', children: `${recordItem.result.toString()}` },
  ];
  return (
    <>
      <DetailPrerequisite prerequisite={recordItem.prerequisite}/>
      <br/>
      <Descriptions
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        column={3}
        bordered
        items={items}
      >
      </Descriptions>
    </>
  );
};

export default FlowRecordItem;
