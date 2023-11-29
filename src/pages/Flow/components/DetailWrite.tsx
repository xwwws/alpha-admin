import React from 'react';
import { Descriptions } from "antd";

interface IProps {
  data: Methods.Write;
  [key: string]: any;
}

const DetailWrite: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <>
      <Descriptions
        labelStyle={{ width: '180px', textAlign: 'center' }}
        size={'small'}
        column={2}
        bordered
      >
        <Descriptions.Item label={'节点id'}>
          {data.nodeid}
        </Descriptions.Item>
        <Descriptions.Item label={'值'}>
          {data.node_value}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default DetailWrite;
