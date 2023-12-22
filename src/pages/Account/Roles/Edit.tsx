import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { IForm } from "@/pages/typings";
import { useNavigate, useParams } from "umi";
import { editRoleInfo, roleInfo } from "@/api/roles";

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
  name: [ { required: true, message: '请输入角色名称' } ],
  description: [ { required: true, message: '请输入备注' } ],
};
const Edit: React.FC<IProps> = (props) => {
  const [ form ] = Form.useForm();
  const {userId} = useParams();
  const navigate = useNavigate()
  const getRole = async (userId: string | number) => {
    const res = await roleInfo(userId)
    form.setFieldsValue(res.data)
  }
  useEffect(() => {
    userId &&  getRole(userId)
  }, [userId])
  const handleConfirm = async () => {
    const formData = await form.validateFields();
    userId && await editRoleInfo(userId,formData);
    message.success('角色修改成功');
    navigate('/account/roles/list')
  };
  return (
    <PageContainer>
      <Card>
        <FormWrap>
          <Form form={form}>
            <Form.Item
              label={"角色名称"}
              name={'name'}
              rules={formRules.name}
            >
              <Input/>
            </Form.Item>


            <Form.Item
              label={"角色备注"}
              name={'description'}
              rules={formRules.description}
            >
              <Input.TextArea
                autoSize
                showCount
                maxLength={500}
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
