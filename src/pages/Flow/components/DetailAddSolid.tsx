import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Methods.AddSolid;

  [key: string]: any;
}

const DetailAddSolid: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children: data.area_name },
    { key: '1', label: '速度', children: `${data.speed}°/s` },
    { key: '2', label: '角度', children: `${data.angel}°`},
    { key: '3', label: '质量', children: `${data.weight}mm`},
    { key: '4', label: '精确度', children: `${data.tolerance}`},
  ];
  return (
    <>
      <Descriptions
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        column={2}
        bordered
        items={items}
      >
      </Descriptions>
    </>
  );
}
  ;

  export default DetailAddSolid;
