import React from 'react';
import { Card } from "antd";
import DetailPrerequisite from "@/pages/Flow/components/DetailPrerequisite";
import DetailItem from "@/pages/Flow/components/DetailItem";
import { useModel } from "umi";

interface IProps {
  index: number;
  flowItem: Flows.FlowDataItem<any>;

  [key: string]: any;
}

const FlowDetailItem: React.FC<IProps> = (props) => {
const {methods} = useModel('useExperimentModel')
  const getFlowName = (action: string): string => {
    return methods.find(item => item.value === action)?.label || '';
  };
  const { flowItem, index } = props;
  return (
    <Card
      size={"small"}
      title={`${index}. ${getFlowName(flowItem.action)} - ${flowItem.action}`}
      hoverable
    >
      {/*先决条件*/}
      <DetailPrerequisite prerequisite={flowItem.prerequisite}/>
      <br/>
      <DetailItem action={flowItem.action} data={flowItem.kwargs}/>
    </Card>
  );
};

export default FlowDetailItem;
