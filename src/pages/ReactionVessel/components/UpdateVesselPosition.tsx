import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { formItemLayout } from '@/utils';
import { useModel } from "@@/exports";
import { IForm } from "@/pages/typings";

interface IProps {
  isOpen: boolean;
  isLoading: boolean;
  data: {
    area_name: string;
    x: string | number;
    y: string | number;
    z: string | number;
  } | undefined | null;
  close: () => void;
  submit: (data: API.Coordinates) => void;

  [key: string]: any;
}

const UpdateVesselPosition: React.FC<IProps> = (props) => {
  const {
    isOpen,
    close,
    isLoading,
    submit,
    data
  } = props;
  const [ form ] = Form.useForm();
  const { areas } = useModel('useExperimentModel');
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
  const handleOk = async () => {
    const values = await form.validateFields();
    submit(values)
  };
  useEffect(() => {
    isLoading && form.resetFields()
  }, [isLoading]);
  return (
    <>
      <Modal
        title={'反应器位置'}
        open={isOpen}
        confirmLoading={isLoading}
        onOk={handleOk}
        onCancel={close}
      >
        <Form
          {...formItemLayout}
          onFinish={handleOk}
          form={form}
        >
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateVesselPosition;
