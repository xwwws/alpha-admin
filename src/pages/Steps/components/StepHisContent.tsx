import { Descriptions } from 'antd';
import React, { ReactNode } from 'react';

interface IProps {
  content: API.AddSolid | API.Pipette | API.AddSolvent | API.Mix3Step | API.DoPeristalticStep;

  [key: string]: any;
}

const Coordinates = (coordinates: API.Coordinates | undefined): ReactNode => {
  if (!coordinates) return '';
  return <div>
    <div>x: {coordinates?.x}</div>
    <div>y: {coordinates?.y}</div>
    <div>z: {coordinates?.z}</div>
    <div>name: {coordinates?.name}</div>
  </div>;
};
const StepHisContent: React.FC<IProps> = (props) => {
  const { content } = props;
  return (
    <Descriptions size={'small'} column={1} colon={true} bordered>
      {
        Object.keys(content).map(item => {


          switch (item) {
            case 'dst_area':
              return <Descriptions.Item label={item}>
                {Coordinates(content[item])}
              </Descriptions.Item>;
            case 'src_area':
              return <Descriptions.Item label={item}>
                {Coordinates(content[item])}
              </Descriptions.Item>;
            default:
              // @ts-ignore
              return <Descriptions.Item label={item}>{content[item]}</Descriptions.Item>;
          }
        })
      }
    </Descriptions>
  );
};

export default StepHisContent;
