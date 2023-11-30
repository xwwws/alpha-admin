import React, { useState } from 'react';
import { formItemLayout } from "@/utils";
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import { IForm } from "@/pages/typings";
import { createReactionVessel } from "@/api/reactionVessel";
import { useModel, useNavigate } from "@@/exports";

interface IProps {
  [key: string]: any;
}

const CreateForm: React.FC<IProps> = (props) => {
  const { areas } = useModel('useExperimentModel');
  const [ messageApi, contextHolder ] = message.useMessage();
  const navigate = useNavigate();
  const [ form ] = Form.useForm();
  const [ loading, setLoading ] = useState<boolean>(false);
  const formRules: IForm.IFormRules = {
    label: [
      { required: true, message: '请填写' },
    ],
    name: [
      { required: true, message: '请填写' },
    ],
    coordinates: [
      { required: true, message: '请输入坐标' },
      { pattern: /^\d+$/, message: '坐标输入错误' },
      { max: 10, message: '坐标长度过长' },
    ],
  };
  const submit = async (val: any) => {
    const { label, name, x, y, z } = val;
    const data: API.ReactionVessel.Create = {
      label,
      bottle_area: {
        name,
        x,
        y,
        z
      }
    };
    setLoading(true);
    try {
      await createReactionVessel(data);
      messageApi.success('创建反应容器成功');
      navigate(-1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        onFinish={submit}
        style={{ width: '700px', margin: '0 auto' }}
      >
        <Form.Item
          label={'label'}
          name={'label'}
          rules={formRules.label}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={'名称'}
          name={'name'}
          rules={formRules.name}
        >
          <Select options={areas}/>
        </Form.Item>
        <Form.Item
          label={'x'}
          name={'x'}
          rules={formRules.coordinates}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={'y'}
          name={'y'}
          rules={formRules.coordinates}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={'z'}
          name={'z'}
          rules={formRules.coordinates}
        >
          <Input/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType={'submit'} loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateForm;
