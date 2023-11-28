import React from 'react';
import { Descriptions } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.Write>;
  [key: string]: any;
}

const DetailRead: React.FC<IProps> = (props) => {
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
          {data.kwargs.nodeid}
        </Descriptions.Item>
        <Descriptions.Item label={'值'}>
          {data.kwargs.node_value}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default DetailRead;
