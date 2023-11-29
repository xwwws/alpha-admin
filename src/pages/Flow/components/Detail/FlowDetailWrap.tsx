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
        flowData.map((item, index) => <div key={index}>
          <br/>
          <FlowDetailItem flowItem={item} index={index + 1}/>
        </div>)
      }
    </>
  );
};

export default FlowDetailWrap;
