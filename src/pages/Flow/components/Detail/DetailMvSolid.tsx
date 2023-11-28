import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.MvSolid>;

  [key: string]: any;
}

const DetailMvSolid: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children:`${data.kwargs.src_area_name}` },
    { key: '0', label: 'x', children:`${data.kwargs.src_x}` },
    { key: '0', label: 'y', children:`${data.kwargs.src_y}` },
    { key: '0', label: 'z', children:`${data.kwargs.src_z}` },
    { key: '0', label: '托盘区域', children:`${data.kwargs.dst_area_name}` },
    { key: '0', label: 'x', children:`${data.kwargs.dst_x}` },
    { key: '0', label: 'y', children:`${data.kwargs.dst_y}` },
    { key: '0', label: 'z', children:`${data.kwargs.dst_z}` },
    { key: '0', label: '高度', children:`${data.kwargs.height}cm` },
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

  export default DetailMvSolid;
