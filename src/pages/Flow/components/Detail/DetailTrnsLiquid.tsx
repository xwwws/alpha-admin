import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.TrnsLiquid>;

  [key: string]: any;
}

const DetailTrnsLiquid: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children:`${data.kwargs.src_area_name}` },
    { key: '1', label: '目标区域', children:`${data.kwargs.dst_area_name}` },
    { key: '1-1', label: 'src_x', children:`${data.kwargs.src_x}` },
    { key: '2', label: '枪头长度', children:`${data.kwargs.tip_length}cm` },
    { key: '3', label: '移液总量', children:`${data.kwargs.total}ml` },
    { key: '4', label: '单次吸液量', children:`${data.kwargs.take_once}ml` },
    { key: '5', label: '单次吐液量', children:`${data.kwargs.spit_once}ml` },
    { key: '6', label: '吐液间隔时长', children:`${data.kwargs.interval}s` },
    { key: '7', label: '吸液吐液速度', children:`${data.kwargs.speed}ml/s` },
  ];
  return (
    <>
      <Descriptions
        labelStyle={{ width: '120px', textAlign: 'center' }}
        size={'small'}
        column={3}
        bordered
        items={items}
      >
      </Descriptions>
    </>
  );
}
  ;

  export default DetailTrnsLiquid;
