// @ts-ignore
import { SmileOutlined } from '@ant-design/icons';
import { Result, Spin } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';
import styled from 'styled-components';
type IProps = {
  isLoading?: boolean;
  children?: ReactNode;
  readResult?: string;
};
const ResultStyle = styled.div`
  padding: 20px 10px;
  border-top: 1px solid #ccc;
  margin-top: 30px;
  width: 100%;
  min-height: 100px;
`;
const MethodsView: React.FC<IProps> = (props) => {
  const { isLoading, readResult } = props;
  const noData = <Result icon={<SmileOutlined />} title="请选择或输入操作条件" />;

  const result = (
    <Spin spinning={isLoading}>
      <ResultStyle>{!isLoading && readResult ? <div>{readResult}</div> : noData}</ResultStyle>
    </Spin>
  );

  return (
    <div>
      {props.children}
      {result}
    </div>
  );
};

export default MethodsView;
