import React from 'react';
import { Descriptions, DescriptionsProps } from "antd";

interface IProps {
  data: Methods.Mix3

  [key: string]: any;
}

const DetailPeristaltic: React.FC<IProps> = (props) => {
  const { data } = props;
  const items: DescriptionsProps[`items`] = [
    { key: '0', label: '托盘区域', children:`${data.area_name}` },
    { key: '1', label: '时间', children:`${data.time}s` },
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

  export default DetailPeristaltic;
