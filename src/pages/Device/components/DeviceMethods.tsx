import { Card, Descriptions } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface IProps {
  methods: Devices.methodList[] | undefined;
  deviceName: string | undefined;

  [key: string]: any;
}


const MethodStyle = styled.div`
  .methodsTitle {
    font-weight: bold;
    font-size: 18px;
  }

  .methods {
    width: 400px;
    margin: 0 auto;
  }
`;

const DeviceMethods: React.FC<IProps> = (props) => {
  const { deviceName, methods } = props;
  const MethodsModel = <>
    <Card title={'指令'} size={"small"} hoverable>
      <Descriptions
        className={'methods'}
        size={'small'}
        labelStyle={{ width: '180px', textAlign: 'center' }}
        bordered
        column={1}
      >
        {methods?.map((item, index) => (
          <Descriptions.Item label={index + 1} key={item.action}>
            {item.label}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>

  </>;
  return (
    <>
      <MethodStyle>

        {
          methods && methods.length > 0 ? MethodsModel : null
        }
      </MethodStyle>

    </>
  );
};

export default DeviceMethods;
