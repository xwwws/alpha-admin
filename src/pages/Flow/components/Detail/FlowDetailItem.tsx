import React from 'react';
import DetailRead from "@/pages/Flow/components/Detail/DetailRead";
import { Card } from "antd";
import DetailPrerequisite from "@/pages/Flow/components/Detail/DetailPrerequisite";
import DetailWrite from "@/pages/Flow/components/Detail/DetailWrite";
import { MethodsMap } from "@/utils/dataMaps";

interface IProps {
  flowItem: Flows.FlowDataItem<any>;

  [key: string]: any;
}
const getFlowName = (action:string): string => {
  return  MethodsMap.find(item => item.name === action)?.label || ''
}
const FlowDetailItem: React.FC<IProps> = (props) => {
  const { flowItem } = props;
  console.log(flowItem);
  return (
    <Card size={"small"} title={  `${getFlowName(flowItem.action)} - ${flowItem.action}`}>
      {/*先决条件*/}
      <DetailPrerequisite prerequisite={flowItem.prerequisite}/>


      {/*读值*/}
      {
        flowItem.action === 'read' &&
        <DetailRead
          data={flowItem as Flows.FlowDataItem<Methods.Read>}
        />
      }

      {/*写值*/}
      {
        flowItem.action === 'write' &&
        <DetailWrite
          data={flowItem as Flows.FlowDataItem<Methods.Write>}
        />
      }
    </Card>
  );
};

export default FlowDetailItem;
