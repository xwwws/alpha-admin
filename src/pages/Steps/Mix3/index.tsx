import { mix3Step } from '@/api/steps';
import MethodsView from '@/pages/Methods/components/MethodsView';
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
  dst_area_name: string;
  dst_area_x: string | number;
  dst_area_y: string | number;
  dst_area_z: string | number;
  time: string | number;
}

const formRules = {
  area_name: [{ required: true, message: '请选择目标区域' }],
  time: [
    { required: true, message: '搅拌时间' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '输入错误' },
  ],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
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
      console.log(val);
      setLoading(true);
      const params: API.Mix3Step = {
        dst_area: {
          name: val.dst_area_name,
          x: val.dst_area_x,
          y: val.dst_area_y,
          z: val.dst_area_z,
        },
        time: val.time,
      };
      const { data } = await mix3Step(params);
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
      initialValues={{ drop_pre: true }}
      style={formStyle}
      colon={false}
      onFinish={onFinish}
    >
      <Form.Item
        style={formItemStyle}
        name="dst_area_name"
        label="目标区域"
        rules={formRules.area_name}
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
      <Form.Item style={formItemStyle} name="time" label="时间" rules={formRules.time}>
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
