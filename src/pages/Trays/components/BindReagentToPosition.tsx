import { getReagentList } from '@/api/reagents';
import { setReagentToPosition } from '@/api/trays';
import { IForm } from '@/pages/typings';
import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  isOpen: boolean;
  close: () => void;
  trayPositionInfo: {
    id: number | string;
    reagent_name: string | number | undefined;
    quantity?: string | number | undefined;
    reagent_id?: string | number | undefined;
  };

  [key: string]: any;
}
const formRules: IForm.IFormRules = {
  reagent_id: [{ required: true, message: '请选择试剂' }],
  quantity: [{ required: true, message: '请输入试剂量' }],
  unit: [{ required: true, message: '请填写单位' }],
};
const BindReagentToPosition: React.FC<IProps> = (props) => {
  const { isOpen, trayPositionInfo, close, success } = props;
  const [form] = Form.useForm();
  const [reagents, setReagents] = useState<API.Reagents.List[]>([]);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const confirm = async () => {
    const value = await form.validateFields();
    setConfirmLoading(true);
    await setReagentToPosition(trayPositionInfo.id, value);
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
    form.setFieldsValue({
      reagent_id: trayPositionInfo.reagent_id || '',
      quantity: trayPositionInfo.quantity || '',
    })
  }, [trayPositionInfo]);
  return (
    <>
      <Modal
        title={'添加试剂'}
        open={isOpen}
        confirmLoading={confirmLoading}
        onOk={confirm}
        onCancel={close}
      >
        <Form form={form} initialValues={{ unit: 'g' }}>
          <Form.Item label={'试剂'} name={'reagent_id'} rules={formRules.reagent_id}>
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

export default BindReagentToPosition;
