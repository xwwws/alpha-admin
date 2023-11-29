import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.Peristaltic>;

  [key: string]: any;
}

const DetailPeristaltic: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children:`${data.kwargs.src_area_name}` },
    { key: '1', label: 'x', children:`${data.kwargs.src_x}` },
    { key: '2', label: 'y', children:`${data.kwargs.src_y}` },
    { key: '3', label: 'z', children:`${data.kwargs.src_z}` },
    { key: '4', label: '速度', children:`${data.kwargs.speed}` },
    { key: '5', label: '重量', children:`${data.kwargs.weight}` },
    { key: '6', label: '精度', children:`${data.kwargs.accuracy}` },
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

  export default DetailPeristaltic;
