import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { changePass } from "@/api/login";

interface IProps {
  [key: string]: any;
}

const FormWrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;
const ChangePwd: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    await changePass(formData);
    message.success('密码修改成功');
    form.resetFields()
  };
  return (
    <PageContainer>
      <Card>
        <FormWrap>

          <Form form={form}>
            <Form.Item label={"新密码"} name={'passwd'} rules={[ { required: true, message: '请输入新密码' } ]}>
              <Input.Password></Input.Password>
            </Form.Item>
          </Form>
          <Button style={{ margin: '0 auto;' }} type="primary" onClick={handleConfirm}>确定</Button>
        </FormWrap>
      </Card>
    </PageContainer>
  );
};

export default ChangePwd;
