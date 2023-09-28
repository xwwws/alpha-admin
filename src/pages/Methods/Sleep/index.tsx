import { sleepMethod } from '@/api/methods';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';
import MethodsHis from "@/pages/Methods/components/MethodsHis";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

interface IConditions {
  seconds: string | number;
}
const formRules = {
  seconds: [
    { required: true, message: '请输入等待时间' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 6, message: '等待时间过长' },
  ],
};
const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const { data } = await sleepMethod(val);
      setLoading(false);
      setReadResult(JSON.stringify(data.result));
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
      onFinish={onFinish}
    >
      <Form.Item name="seconds" label="等待" rules={formRules.seconds}>
        <Input addonAfter="秒" />
      </Form.Item>
      <Form.Item>
        <Button type={'primary'} htmlType="submit">
          确定
        </Button>
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
        <MethodsHis methodMode={'sleep'}/>
      </PageContainer>
    </>
  );
};

export default Index;
