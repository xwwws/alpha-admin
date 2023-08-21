import { getAreasMap } from '@/api/public';
import { getReagentList } from '@/api/reagents';
import { createPosition } from '@/api/trays';
import { IForm } from '@/pages/typings';
import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  isOpen: boolean;
  close: () => void;
  success: () => void;
  areaTypes: {
    label: string;
    value: string;
    [key: string]: any;
  }[];

  [key: string]: any;
}

const formRules: IForm.IFormRules = {
  area_name: [{ required: true, message: '请选择区域名称' }],
  area_type: [{ required: true, message: '请选择区域类型' }],
  reagent_id: [{ required: true, message: '请选择试剂' }],
  quantity: [
    { required: true, message: '请输入试剂量' },
    { pattern: /^\d+(.\d+)?$/, message: '输入错误' },
  ],
  unit: [{ required: true, message: '请填写单位' }],
  areaType: [{ required: true, message: '请选择区域类型' }],
  coordinates: [
    { required: true, message: '请输入坐标' },
    { pattern: /^\d+$/, message: '坐标输入错误' },
    { max: 10, message: '坐标长度过长' },
  ],
};
const AddPosition: React.FC<IProps> = (props) => {
  const { isOpen, close, areaTypes, success } = props;
  const [form] = Form.useForm();
  const [reagents, setReagents] = useState<API.Reagents.List[]>([]);
  const [areas, setAreas] = useState<API.Area_Enum[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleAreaChange = async (val: string) => {
    const res = await getAreasMap(val);
    setAreas(res.data);
  };
  const confirm = async () => {
    const value = await form.validateFields();
    setConfirmLoading(true);
    await createPosition(value as API.Trays.CreateReq);
    setConfirmLoading(false);
    success();
  };

  useEffect(() => {
    (async () => {
      const res = await getReagentList({ page_size: 99999 });
      setReagents(res.data.data);
    })();
  }, []);
  useEffect(() => {
    form.resetFields();
  }, [isOpen]);
  return (
    <>
      <Modal
        title={'添加工位'}
        open={isOpen}
        onOk={confirm}
        confirmLoading={confirmLoading}
        onCancel={close}
      >
        <Form form={form} initialValues={{ unit: 'g' }}>
          <Form.Item label={'区域类型'} name={'area_type'} rules={formRules.area_type}>
            <Select options={areaTypes} onChange={(val) => handleAreaChange(val)}></Select>
          </Form.Item>
          <Form.Item label={'区域名称'} name={'area_name'} rules={formRules.area_name}>
            <Select
              options={areas.map((item) => ({ label: item.label, value: item.name }))}
            ></Select>
          </Form.Item>
          <Form.Item label={'x'} name={'x'} rules={formRules.coordinates}>
            <Input></Input>
          </Form.Item>
          <Form.Item label={'y'} name={'y'} rules={formRules.coordinates}>
            <Input></Input>
          </Form.Item>
          <Form.Item label={'z'} name={'z'} rules={formRules.coordinates}>
            <Input></Input>
          </Form.Item>
          <Form.Item label={'试剂id'} name={'reagent_id'} rules={formRules.reagent_id}>
            <Select
              options={reagents.map((item) => ({ label: item.name, value: item.id }))}
            ></Select>
          </Form.Item>
          <Form.Item label={'数量'} name={'quantity'} rules={formRules.quantity}>
            <Input></Input>
          </Form.Item>
          <Form.Item label={'单位'} name={'unit'} rules={formRules.unit}>
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPosition;
