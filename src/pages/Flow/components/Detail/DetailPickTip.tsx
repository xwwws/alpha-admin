import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.PickTip>;

  [key: string]: any;
}

const DetailPickTip: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '枪头区域', children: data.kwargs.tip_area_name },
    { key: '1', label: 'x', children: data.kwargs.x },
    { key: '2', label: 'y', children: data.kwargs.y },
    { key: '3', label: 'z', children: data.kwargs.z },
    { key: '4', label: '枪头长度', children: data.kwargs.tip_length },
    { key: '5', label: '是否卸下', children:`${data.kwargs.drop_pre}` },
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

  export default DetailPickTip;
