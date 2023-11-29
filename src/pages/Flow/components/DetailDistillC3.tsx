import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Methods.Distillc3;

  [key: string]: any;
}

const DetailPeristaltic: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '工位号', children:`${data.src_area}` },
    { key: '0', label: '冷凝温度', children:`${data.coolerSy}℃` },
    { key: '0', label: '加热带温度', children:`${data.heatBandsy}℃` },
    { key: '1', label: '初馏点', children:`${data.ibpTemp}℃` },
    { key: '1', label: '终馏点', children:`${data.fbpTemp}℃` },
    { key: '1', label: '加热模式', children:`${data.stirMode}` },
    { key: '1', label: '搅拌速度', children:`${data.stirRPM}` },
    { key: '1', label: '冲洗时长', children:`${data.washTime}s` },
    { key: '1', label: '排空时长', children:`${data.cleanTime}s` },
    { key: '1', label: '补给时长', children:`${data.suplyTime}s` },
    { key: '1', label: '总时长', children:`${data.totalTime}s` },
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

  export default DetailPeristaltic;
