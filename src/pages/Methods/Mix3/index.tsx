// @ts-ignore
import { mix3 } from '@/api/methods';
import MethodsView from '@/pages/Methods/components/MethodsView';
import { PageContainer } from '@ant-design/pro-layout/es/components/PageContainer';
import { Button, Card, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import MethodsHis from "@/pages/Methods/components/MethodsHis";

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
  time: string | number;
}

const formRules = {
  area_name: [{ required: true, message: '请选择目标区域' }],
  time: [
    { required: true, message: '搅拌时间' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '输入错误' },
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
      const params: API.Mix3 = {
        area_name: val.area_name,
        time: val.time,
      };
      const { data } = await mix3(params);
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
        name="area_name"
        label="目标区域"
        rules={formRules.area_name}
      >
        <Select options={areas} />
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
        <MethodsHis methodMode={'methdDoMix3'}/>
      </PageContainer>
    </>
  );
};

export default Index;
