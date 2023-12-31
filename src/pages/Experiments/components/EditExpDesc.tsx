import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { updateDescription } from "@/api/experiments";

interface IProps {
  isShow: boolean;
  expInfo: { id: string | number, description: string };
  onCancel: () => void;
  onSuccess: () => void;

  [key: string]: any;
}

const EditExpDesc: React.FC<IProps> = (props) => {
  const { isShow, expInfo, onCancel, onSuccess } = props;
  const [ form ] = Form.useForm();
  const onOk = async () => {
    const formData = await form.validateFields();
    await updateDescription(expInfo.id, formData);
    onSuccess();
  };

  useEffect(() => {
    form.setFieldsValue({ description: expInfo.description });
  }, [ isShow, expInfo.description ]);
  return (
    <>
      <Modal
        title="编辑备注"
        open={isShow}
        onOk={onOk}
        onCancel={onCancel}
        destroyOnClose
      >
        <br/>
        <Form
          form={form}
          preserve={false}
        >
          <Form.Item name={'description'} label={'备注'}>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditExpDesc;
