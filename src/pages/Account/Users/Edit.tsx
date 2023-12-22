import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { IForm } from "@/pages/typings";
import { editUserInfo, getUserInfo } from "@/api/users";
import { useNavigate, useParams } from "umi";
import { userGender, userStatus } from "@/utils/userMaps";

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
  status: [ { required: true, message: '请选择状态' } ],
};
const Edit: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const {userId} = useParams();
  const navigate = useNavigate()
  const getUser = async (userId: string | number) => {
    const res = await getUserInfo(userId)
    form.setFieldsValue(res.data)
  }
  useEffect(() => {
    userId &&  getUser(userId)
  }, [userId])
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    userId && await editUserInfo(userId,formData);
    message.success('用户修改成功');
    navigate('/account/users/list')
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
              <Input disabled={true}></Input>
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
                options={userGender}
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
              label={"状态"}
              name={'status'}
              rules={formRules.status}
            >
              <Select
                options={userStatus}
              />
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

export default Edit;
