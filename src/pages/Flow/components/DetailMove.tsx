import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Methods.MethodMvThing;
  [key: string]: any;
}

const DetailMove: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children: data.src_area},
    { key: '1', label: 'x', children: data.src_x},
    { key: '2', label: 'y', children: data.src_y},
    { key: '3', label: 'z', children: data.src_z},
    { key: '4', label: '目标区域', children: data.dst_area},
    { key: '5', label: 'x', children: data.dst_x},
    { key: '6', label: 'y', children: data.dst_y},
    { key: '7', label: 'z', children: data.dst_z},

  ]
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
};

export default DetailMove;
