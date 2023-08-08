// @ts-ignore
import { clawGripperMethod } from '@/api/methods';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Select } from 'antd';
import React, { useState } from 'react';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const contentItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface IConditions {
  dst_tool: string;
  src_tool: string;
}

const formRules = {
  src_tool: [{ required: true, message: '请选择当前夹爪' }],
  dst_tool: [{ required: true, message: '请选择目标夹爪' }],
};
const formItemStyle = {};
const formStyle = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '280px 280px 1fr 1fr',
  gap: '10px',
};
const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const params: API.ClawGripper = {
        dst_tool: val.dst_tool,
        src_tool: val.src_tool,
      };
      const res = await clawGripperMethod(params);
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
      labelWrap={true}
      form={form}
      style={formStyle}
      colon={false}
      onFinish={onFinish}
    >
      <Form.Item style={formItemStyle} name="src_tool" label="当前夹爪" rules={formRules.src_tool}>
        <Select options={[{ label: 'OP11', value: 'OP11' }]} />
      </Form.Item>
      <Form.Item style={formItemStyle} name="dst_tool" label="目标夹爪" rules={formRules.dst_tool}>
        <Select options={[{ label: 'OP11', value: 'OP11' }]} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
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
      </PageContainer>
    </>
  );
};

export default Index;
