import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  onPreOrNext: (type: string) => void;

  [key: string]: any;
}

const PreAndNextWarpStyle = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const PreAndNext: React.FC<IProps> = (props) => {
  const { onPreOrNext } = props;
  return (
    <PreAndNextWarpStyle>
      <Button size={'small'} onClick={() => onPreOrNext('prev')}><DoubleLeftOutlined/>上一条</Button>
      <Button size={'small'} onClick={() => onPreOrNext('next')}>下一条 <DoubleRightOutlined/></Button>
    </PreAndNextWarpStyle>
  );
};

export default PreAndNext;
