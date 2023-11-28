import React from 'react';
import FlowDetailItem from "@/pages/Flow/components/Detail/FlowDetailItem";

interface IProps {
  flowData: Flows.FlowDataItem<any>[];

  [key: string]: any;
}

const FlowDetailWrap: React.FC<IProps> = (props) => {
  const { flowData } = props;
  return (
    <>
      {
        flowData.map((item, key) => <>
          <br/>
          <FlowDetailItem key={key} flowItem={item}/>
          <br/>
        </>)
      }
    </>
  );
};

export default FlowDetailWrap;
