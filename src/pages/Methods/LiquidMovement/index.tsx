// @ts-ignore
import { liquidMovementMethod } from '@/api/experiment';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const contentItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface IConditions {
  src_area_name: string;
  src_area_x: string | number;
  src_area_y: string | number;
  src_area_z: string | number;
  dst_area_name: string;
  dst_area_x: string | number;
  dst_area_y: string | number;
  dst_area_z: string | number;
  tip_length: string | number;
  total: string | number;
  take_once: string | number;
  spit_once: string | number;
  interval: string | number;
  speed: string | number;
}

const formRules = {
  src_area_name: [{ required: true, message: '请选择托盘区域' }],
  dst_area_name: [{ required: true, message: '请选择托盘区域' }],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  height: [
    { required: true, message: '请输入高度' },
    { pattern: /^\d+$/, message: '高度应为数字' },
    { max: 10, message: '高度过高' },
  ],
};
const formItemStyle = {};
const formStyle = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '10px',
};
const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [readResult, setReadResult] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const params: API.LiquidMovementReq = {
        src_area: {
          name: val.src_area_name,
          x: val.src_area_x,
          y: val.src_area_y,
          z: val.src_area_z,
        },
        dst_area: {
          name: val.dst_area_name,
          x: val.dst_area_x,
          y: val.dst_area_y,
          z: val.dst_area_z,
        },
        tip_length: val.tip_length,
        total: val.total,
        take_once: val.take_once,
        spit_once: val.spit_once,
        speed: val.speed,
        interval: val.interval,
      };
      const res = await liquidMovementMethod(params);
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
        {...contentItemLayout}
        name="src_area_name"
        label="托盘区域"
        rules={formRules.src_area_name}
      >
        <Select options={[{ label: 'OP11', value: 'OP11' }]} />
      </Form.Item>
      <Form.Item style={formItemStyle} name="src_area_x" label="x" rules={formRules.coordinates}>
        <Input />
      </Form.Item>
      <Form.Item style={formItemStyle} name="src_area_y" label="y" rules={formRules.coordinates}>
        <Input />
      </Form.Item>
      <Form.Item style={formItemStyle} name="src_area_z" label="z" rules={formRules.coordinates}>
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="dst_area_name"
        label="目标托盘区域"
        rules={formRules.dst_area_name}
      >
        <Select options={[{ label: 'OP11', value: 'OP11' }]} />
      </Form.Item>
      <Form.Item style={formItemStyle} name="dst_area_x" label="x" rules={formRules.coordinates}>
        <Input />
      </Form.Item>
      <Form.Item style={formItemStyle} name="dst_area_y" label="y" rules={formRules.coordinates}>
        <Input />
      </Form.Item>
      <Form.Item style={formItemStyle} name="dst_area_z" label="z" rules={formRules.coordinates}>
        <Input />
      </Form.Item>

      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="tip_length"
        label="枪头长度"
        rules={formRules.height}
      >
        <Input addonAfter="cm" />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="total"
        label="移液总量"
        rules={formRules.height}
      >
        <Input addonAfter="ml" />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="take_once"
        label="单次吸液量"
        rules={formRules.height}
      >
        <Input addonAfter="ml" />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="spit_once"
        label="单次吐液量"
        rules={formRules.height}
      >
        <Input addonAfter="ml" />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="interval"
        label="吐液间隔时长"
        rules={formRules.height}
      >
        <Input addonAfter="s" />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="speed"
        label="吸液吐液速度"
        rules={formRules.height}
      >
        <Input addonAfter="s" />
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
