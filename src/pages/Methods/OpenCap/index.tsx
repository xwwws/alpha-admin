// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
// @ts-ignore
import { openCapMethod } from '@/api/experiment';
import MethodsView from '@/pages/Methods/components/MethodsView';
// @ts-ignore
import { Button, Card, Form, Input, Select } from 'antd';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const contentItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface IConditions {
  area_name: string;
  y: string | number;
  height: string | number;
}

const formRules = {
  area_name: [{ required: true, message: '请选择试剂' }],
  coordinates: [
    { required: true, message: '请输入y坐标' },
    { pattern: /^\d+$/, message: 'y坐标输入错误' },
    { max: 10, message: 'y坐标长度过长' },
  ],
  height: [
    { required: true, message: '请输入高度' },
    { pattern: /^\d+$/, message: '速度应为数字' },
    { max: 10, message: '高度过高' },
  ],
};
const formItemStyle = {};
const formStyle = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '280px 1fr 1fr 1fr',
  gap: '10px',
};
const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const params: API.OpenCap = {
        area_name: val.area_name,
        y: val.y,
        height: val.height,
      };
      const res = await openCapMethod(params);
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
      <Form.Item
        style={formItemStyle}
        name="area_name"
        label="瓶盖位置"
        rules={formRules.area_name}
      >
        <Select options={[{ label: 'OP11', value: 'OP11' }]} />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="y"
        label="y"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item style={formItemStyle} name="height" label="高度" rules={formRules.height}>
        <Input addonAfter="cm" />
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
