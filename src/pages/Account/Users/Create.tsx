import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Select } from 'antd';
import React from 'react';
import styled from "styled-components";
import { changePass } from "@/api/login";
import { IForm } from "@/pages/typings";
import { createUser } from "@/api/users";

interface IProps {
  [key: string]: any;
}

const FormWrap = styled.div`
  width: 500px;
  margin: 0 auto;
  .submitWrap{
    display: flex;
    justify-content: center;
  }
`;

const formRules: IForm.IFormRules = {
  email: [ { required: true, message: '请输入邮箱' } ],
  name: [ { required: true, message: '请输入姓名' } ],
  username: [ { required: true, message: '请输入用户名' } ],
  phone: [ { required: true, message: '请输入手机号' } ],
  gender: [ { required: true, message: '请选择性别' } ],
  passwd: [ { required: true, message: '请输入密码' } ],
  re_passwd: [
    { required: true, message: '请输入密码' },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('passwd') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('两次密码输入不一致'));
      },
    })
  ],
};
const Create: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    await createUser(formData);
    message.success('用户创建成功');
    form.resetFields();
  };
  return (
    <PageContainer>
      <Card>
        <FormWrap>
          <Form form={form}>
            <Form.Item
              label={"用户名"}
              name={'username'}
              rules={formRules.username}
            >
              <Input></Input>
            </Form.Item>

            <Form.Item
              label={"姓名"}
              name={'name'}
              rules={formRules.name}
            >
              <Input></Input>
            </Form.Item>


            <Form.Item
              label={"性别"}
              name={'gender'}
              rules={formRules.email}
            >
              <Select
                options={[
                  { value: 'male', label: '男' },
                  { value: 'female', label: '女' },
                  { value: 'unknown', label: '未知' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={"手机号"}
              name={'phone'}
              rules={formRules.phone}
            >
              <Input></Input>
            </Form.Item>

            <Form.Item
              label={"邮箱"}
              name={'email'}
              rules={formRules.email}
            >
              <Input></Input>
            </Form.Item>

            <Form.Item
              label={"密码"}
              name={'passwd'}
              rules={formRules.passwd}
            >
              <Input.Password></Input.Password>
            </Form.Item>

            <Form.Item
              label={"确认密码"}
              name={'re_passwd'}
              rules={formRules.re_passwd}
            >
              <Input.Password></Input.Password>
            </Form.Item>

          </Form>
          <div className="submitWrap">
            <Button type="primary" onClick={handleConfirm}>确定</Button>
          </div>

        </FormWrap>
      </Card>
    </PageContainer>
  );
};

export default Create;
