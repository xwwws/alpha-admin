import React from 'react';
import { Descriptions } from "antd";

interface IProps {
  data: Flows.FlowDataItem<Methods.Read>;

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
        <Descriptions.Item label={'实验指令'}>
          读值
        </Descriptions.Item>
        <Descriptions.Item label={'action'}>
          {data.action}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default DetailRead;
