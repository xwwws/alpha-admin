import { addSolMethod } from '@/api/methods';
import MethodsView from '@/pages/Methods/components/MethodsView';
import type { IForm } from '@/pages/typings';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const contentItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
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
  speed: string | number;
  weight: string | number;
  accuracy: string | number;
}

const formRules: IForm.IFormRules = {
  src_area_name: [{ required: true, message: '请选择托盘区域' }],
  dst_area_name: [{ required: true, message: '请选择托盘区域' }],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
  speed: [
    { required: true, message: '请输入速度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '速度过快' },
  ],
  weight: [
    { required: true, message: '请输入比重' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '比重过高' },
  ],
  accuracy: [
    { required: true, message: '请输入精准度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '精准度有误' },
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
  const { areas } = useModel('useExperimentModel');
  const onFinish = async (val: IConditions) => {
    try {
      setLoading(true);
      const params: API.AddSolReq = {
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
        accuracy: val.accuracy,
        speed: val.speed,
        weight: val.weight,
      };
      const { data } = await addSolMethod(params);
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
      labelWrap={true}
      form={form}
      style={formStyle}
      colon={false}
      onFinish={onFinish}
    >
      <Form.Item
        style={formItemStyle}
        name="src_area_name"
        label="托盘区域"
        rules={formRules.src_area_name}
      >
        <Select options={areas} />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="src_area_x"
        label="x"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="src_area_y"
        label="y"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="src_area_z"
        label="z"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        name="dst_area_name"
        label="目标区域"
        rules={formRules.dst_area_name}
      >
        <Select options={areas} />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="dst_area_x"
        label="x"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="dst_area_y"
        label="y"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={formItemStyle}
        {...contentItemLayout}
        name="dst_area_z"
        label="z"
        rules={formRules.coordinates}
      >
        <Input />
      </Form.Item>

      <Form.Item style={formItemStyle} name="speed" label="速度" rules={formRules.speed}>
        <Input addonAfter="cm" />
      </Form.Item>
      <Form.Item style={formItemStyle} name="weight" label="比重" rules={formRules.weight}>
        <Input addonAfter="cm" />
      </Form.Item>
      <Form.Item style={formItemStyle} name="accuracy" label="精确度" rules={formRules.accuracy}>
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
