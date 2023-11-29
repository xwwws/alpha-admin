import React from 'react';
import { Card } from "antd";
import DetailPrerequisite from "@/pages/Flow/components/DetailPrerequisite";
import { MethodsMap } from "@/utils/dataMaps";
import DetailItem from "@/pages/Flow/components/DetailItem";

interface IProps {
  index: number;
  flowItem: Flows.FlowDataItem<any>;

  [key: string]: any;
}

const getFlowName = (action: string): string => {
  return MethodsMap.find(item => item.name === action)?.label || '';
};
const FlowDetailItem: React.FC<IProps> = (props) => {
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
