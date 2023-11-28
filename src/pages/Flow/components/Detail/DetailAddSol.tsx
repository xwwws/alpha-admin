import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.AddSol>;

  [key: string]: any;
}

const DetailAddSolid: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children: data.kwargs.src_area },
    { key: '1', label: 'x', children: `${data.kwargs.src_x}` },
    { key: '2', label: 'y', children: `${data.kwargs.src_y}`},
    { key: '3', label: 'z', children: `${data.kwargs.src_z}`},
    { key: '4', label: '托盘区域', children: data.kwargs.dst_area },
    { key: '5', label: 'x', children: `${data.kwargs.dst_x}` },
    { key: '6', label: 'y', children: `${data.kwargs.dst_y}`},
    { key: '7', label: 'z', children: `${data.kwargs.dst_z}`},
    { key: '8', label: '速度', children: `${data.kwargs.speed}ul/s` },
    { key: '9', label: '比重', children: `${data.kwargs.weight}mm`},
    { key: '10', label: '精确度', children: `${data.kwargs.accuracy}`},
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

  export default DetailAddSolid;
