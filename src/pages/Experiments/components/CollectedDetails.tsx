import { Descriptions } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  data: API.DataAcquisitionsResults;

  [key: string]: any;
}
const CollectedDetailsStyle = styled.div`
  padding: 10px;
`
const CollectedDetails: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <CollectedDetailsStyle>
      <Descriptions
        size={'small'}
        labelStyle={{ width: '180px', textAlign: 'center' }}
        bordered
        column={3}
      >
        <Descriptions.Item label={"平均值"}>
          {data.avg}
        </Descriptions.Item>
        <Descriptions.Item label={"最大值"}>
          {data.max}
        </Descriptions.Item>
        <Descriptions.Item label={"最小值"}>
          {data.min}
        </Descriptions.Item>
        <Descriptions.Item label={"开始时间"}>
          {data.record_start_time}
        </Descriptions.Item>
        <Descriptions.Item label={"结束时间"}>
          {data.record_end_time}
        </Descriptions.Item>
      </Descriptions>
    </CollectedDetailsStyle>
  );
};

export default CollectedDetails;
