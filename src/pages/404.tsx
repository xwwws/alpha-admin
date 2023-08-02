import { history } from 'umi';
// @ts-ignore
import { Button, Result } from 'antd';
// @ts-ignore
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        主页
      </Button>
    }
  />
);

export default NoFoundPage;
