// @ts-ignore
import { addSolidMethod } from '@/api/methods';
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
const formRules = {
  src_area_name: [{ required: true, message: '请选择托盘区域' }],
  angel: [
    { required: true, message: '请输入速度' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
    { max: 10, message: '速度过快' },
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
  const onFinish = async (val: Methods.AddSolidReq) => {
    try {
      setLoading(true);
      const params: Methods.AddSolidReq = {
        area_name: val.area_name,
        tolerance: val.tolerance,
        speed: val.speed,
        angel: val.angel,
        weight: val.weight,
      };
      const { data } = await addSolidMethod(params);
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
        name="area_name"
        label="托盘区域"
        rules={formRules.src_area_name}
      >
        <Select options={areas} />
      </Form.Item>

      <Form.Item style={formItemStyle} name="speed" label="速度" rules={formRules.speed}>
        <Input addonAfter="g/s" />
      </Form.Item>
      <Form.Item style={formItemStyle} name="angel" label="角度" rules={formRules.angel}>
        <Input addonAfter="°" />
      </Form.Item>
      <Form.Item style={formItemStyle} name="weight" label="重量" rules={formRules.weight}>
        <Input addonAfter="g" />
      </Form.Item>
      <Form.Item style={formItemStyle} name="tolerance" label="精确度" rules={formRules.accuracy}>
        <Input/>
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
        <MethodsHis methodMode={'methdDoAddSolid'}/>
      </PageContainer>
    </>
  );
};

export default Index;
