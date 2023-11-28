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
        flowData.map((item, key) => <div key={key}>
          <br/>
          <FlowDetailItem flowItem={item}/>
        </div>)
      }
    </>
  );
};

export default FlowDetailWrap;
