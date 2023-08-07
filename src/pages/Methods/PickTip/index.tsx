// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
// @ts-ignore
import { pickTipMethod } from '@/api/experiment';
import MethodsView from '@/pages/Methods/components/MethodsView';
// @ts-ignore
import { Button, Card, Form, Input, Select, Switch } from 'antd';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const contentItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface IConditions {
  tip_area_name: string;
  tip_area_x: string | number;
  tip_area_y: string | number;
  tip_area_z: string | number;
  tip_length: number;
  drop_pre: boolean;
}

const formRules = {
  tip_area_name: [{ required: true, message: '请选择枪头区域' }],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  tip_length: [
    { required: true, message: '请输入枪头长度' },
    { pattern: /^\d+$/, message: '长度应为数字' },
    { max: 10, message: '数字过长' },
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
    console.log(val);
    try {
      setLoading(true);
      const params: API.PickTipReq = {
        tip_area: {
          name: val.tip_area_name,
          x: val.tip_area_x,
          y: val.tip_area_y,
          z: val.tip_area_z,
        },
        tip_length: val.tip_length,
        drop_pre: val.drop_pre,
      };
      const res = await pickTipMethod(params);
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
      initialValues={{ drop_pre: true }}
      style={formStyle}
      colon={false}
      onFinish={onFinish}
    >
      <Form.Item
        style={formItemStyle}
        name="tip_area_name"
        label="枪头区域"
        rules={formRules.tip_area_name}
      >
        <Select options={[{ label: 'OP11', value: 'OP11' }]} />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="tip_area_x"
        label="x"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="tip_area_y"
        label="y"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="tip_area_z"
        label="z"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        name="tip_length"
        label="枪头长度"
        rules={formRules.tip_length}
      >
        <Input addonAfter="cm" />
      </Form.Item>
      <Form.Item style={formItemStyle} valuePropName="checked" name="drop_pre" label="是否卸下">
        <Switch />
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
