// @ts-ignore
import { readMethod } from '@/api/methods';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Card, Form, Select } from 'antd';
import React, { useState } from 'react';

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

interface IConditions {
  node_index: string | number;
}

const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onFormChange = async (val: IConditions) => {
    try {
      setLoading(true);
      const res = await readMethod(val);
      setLoading(false);
      setReadResult(JSON.stringify(res.result));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  // 顶部查询模块
  const searchModel = (
    <Form
      {...formItemLayout}
      layout={'inline'}
      form={form}
      style={{ maxWidth: 'none' }}
      onValuesChange={onFormChange}
    >
      <Form.Item name="node_index" label="节点id">
        <Select
          allowClear={true}
          style={{ width: `150px` }}
          options={[{ label: '任务1', value: 1 }]}
        ></Select>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <PageContainer>
        <Card>
          <MethodsView isLoading={loading} readResult={readResult}>
            {searchModel}
          </MethodsView>
        </Card>
      </PageContainer>
    </>
  );
};

export default Index;
