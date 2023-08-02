// @ts-ignore
import { PageContainer } from '@ant-design/pro-components';
// @ts-ignore
import {} from 'antd';
// @ts-ignore
import { moveMethod } from '@/api/experiment';
import React, { useEffect } from 'react';

const Welcome: React.FC = () => {
  useEffect(() => {
    const a = async () => {
      const res = await moveMethod({ node_index: 1 });
      console.log(res);
    };
    a();
  }, []);
  return <PageContainer></PageContainer>;
};

export default Welcome;
