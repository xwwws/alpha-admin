import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.ReCap>;

  [key: string]: any;
}

const DetailUnCap: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '瓶盖位置', children: data.kwargs.area_name },
    { key: '1', label: 'y', children: `${data.kwargs.y}` },
    { key: '2', label: '高度', children: `${data.kwargs.height}cm`},
  ];
  return (
    <>
      <Descriptions
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        column={4}
        bordered
        items={items}
      >
      </Descriptions>
    </>
  );
}
  ;

  export default DetailUnCap;
