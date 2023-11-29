import React from 'react';
import { Descriptions } from "antd";

interface IProps {
  data: Methods.Sleep;
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
        <Descriptions.Item label={'等待'}>
          {data.seconds} s
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default DetailRead;
